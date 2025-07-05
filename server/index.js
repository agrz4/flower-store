const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv').config();

const app = express();
const PORT = process.env.PORT

app.use(cors());
app.use(express.json());

// Konfigurasi transporter email (contoh Gmail, ganti sesuai kebutuhan)
// Pastikan untuk menggunakan variabel lingkungan atau nilai aman untuk kredensial
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true untuk port 465, false untuk 587
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
    },
});

// Konfigurasi koneksi MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// Koneksi ke database
db.connect(err => {
    if (err) {
        console.error('Gagal koneksi ke database:', err);
    } else {
        console.log('Terkoneksi ke database MySQL');
    }
});

// Data harga dasar untuk perhitungan
const JENIS_BUNGA = {
    meja: { kecil: 100000, sedang: 200000, besar: 300000 },
    papan: { kecil: 300000, sedang: 500000, besar: 700000 },
    buket: { kecil: 80000, sedang: 150000, besar: 250000 },
    lain: { kecil: 50000, sedang: 100000, besar: 200000 },
};

/**
 * Menghitung harga total pesanan berdasarkan jenis bunga, ukuran, jumlah, dan status pelanggan.
 * @param {object} params - Parameter untuk perhitungan harga.
 * @param {string} params.jenis - Jenis bunga (e.g., 'meja', 'papan', 'buket', 'lain').
 * @param {string} params.ukuran - Ukuran bunga (e.g., 'kecil', 'sedang', 'besar').
 * @param {number} params.jumlah - Jumlah item bunga.
 * @param {string} params.status - Status konsumen (e.g., 'tetap', 'tidak tetap').
 * @returns {object} Objek yang berisi hargaSatuan, subtotal, diskon, dan total.
 */
function hitungHarga({ jenis, ukuran, jumlah, status }) {
    const hargaSatuan = JENIS_BUNGA[jenis]?.[ukuran] || 0;
    const subtotal = hargaSatuan * jumlah;
    let diskon = 0;
    if (status === 'tetap') { // Asumsi 'tetap' untuk pelanggan loyal
        diskon = subtotal * 0.1; // Diskon 10%
    } else if (status === 'tidak tetap' && subtotal >= 500000) {
        diskon = subtotal * 0.05; // Diskon 5% untuk non-loyal dengan subtotal >= 500,000
    }
    const total = subtotal - diskon;
    return { hargaSatuan, subtotal, diskon, total };
}

/**
 * Membuat PDF kwitansi pembayaran.
 * @param {object} data - Data pesanan untuk kwitansi.
 * @param {function(Buffer): void} cb - Callback yang dipanggil dengan buffer PDF.
 */
function buatKwitansiPDF(data, cb) {
    const doc = new PDFDocument();
    const chunks = [];
    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => cb(Buffer.concat(chunks)));

    doc.fontSize(18).text('KWITANSI PEMBAYARAN', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12)
       .text(`Nama Pelanggan: ${data.nama}`)
       .text(`Email: ${data.email}`)
       .text(`No. Telepon: ${data.telepon || '-'}`) // Telepon mungkin tidak selalu ada jika tidak disimpan di DB customers
       .text(`Jenis Konsumen: ${data.jenis_konsumen || data.status}`) // Gunakan jenis_konsumen dari DB jika ada, fallback ke status
       .moveDown()
       .text(`Detail Pesanan:`)
       .text(`  Jenis Bunga: ${data.jenis}`)
       .text(`  Ukuran: ${data.ukuran}`)
       .text(`  Jumlah: ${data.jumlah}`)
       .text(`Alamat Pengiriman: ${data.alamat}`)
       .moveDown()
       .text(`Subtotal: Rp ${data.subtotal.toLocaleString('id-ID')}`)
       .text(`Diskon: Rp ${data.diskon.toLocaleString('id-ID')}`)
       .text(`Total Pembayaran: Rp ${data.total.toLocaleString('id-ID')}`)
       .moveDown()
       .text(`Tanggal Pesanan: ${new Date(data.waktu).toLocaleString('id-ID')}`);
    doc.end();
}

// Endpoint untuk pemesanan bunga
app.post('/api/pemesanan', async (req, res) => {
    const { nama, telepon, email, status, jenis, ukuran, jumlah, alamat } = req.body; // 'status' dari request akan digunakan sebagai 'jenis_konsumen'
    const jenisKonsumen = status; // Mengubah nama variabel agar lebih jelas sesuai schema DB

    if (!nama || !email || !jenisKonsumen || !jenis || !ukuran || !jumlah || !alamat) {
        return res.status(400).json({ error: 'Data pemesanan tidak lengkap. Pastikan semua kolom wajib terisi.' });
    }

    const { hargaSatuan, subtotal, diskon, total } = hitungHarga({ jenis, ukuran, jumlah, status: jenisKonsumen });
    const tanggalPesanan = new Date();

    let customerId;

    try {
        // 1. Cari atau buat customer
        const [customersRows] = await db.promise().query('SELECT id_customer FROM customers WHERE email = ?', [email]);

        if (customersRows.length > 0) {
            customerId = customersRows[0].id_customer;
        } else {
            const [result] = await db.promise().query(
                'INSERT INTO customers (nama, email, jenis_konsumen) VALUES (?, ?, ?)',
                [nama, email, jenisKonsumen]
            );
            customerId = result.insertId;
        }

        // 2. Simpan pesanan ke tabel orders
        const [orderResult] = await db.promise().query(
            'INSERT INTO orders (customer_id, total, diskon, alamat, status, tanggal_pesanan) VALUES (?, ?, ?, ?, ?, ?)',
            [customerId, total, diskon, alamat, 'pending', tanggalPesanan] // Status awal 'pending'
        );
        const orderId = orderResult.insertId;

        // 3. Simpan item pesanan ke tabel order_items
        await db.promise().query(
            'INSERT INTO order_items (order_id, jenis_bunga, ukuran, jumlah, harga_satuan) VALUES (?, ?, ?, ?, ?)',
            [orderId, jenis, ukuran, jumlah, hargaSatuan]
        );

        // Data lengkap untuk kwitansi dan respons
        const dataPemesananLengkap = {
            nama,
            telepon, // Dari request, tidak disimpan di tabel customers saat ini
            email,
            jenis_konsumen: jenisKonsumen,
            jenis,
            ukuran,
            jumlah,
            alamat,
            hargaSatuan,
            subtotal,
            diskon,
            total,
            waktu: tanggalPesanan.toISOString(),
            orderId: orderId
        };

        // 4. Buat PDF kwitansi
        buatKwitansiPDF(dataPemesananLengkap, async (pdfBuffer) => {
            const fileName = `kwitansi-${orderId}.pdf`;
            const fileUrl = `/invoices/${fileName}`; // Placeholder URL, as we don't actually save files to a public path in this example.
                                                  // In a real app, you'd save this to cloud storage or a dedicated folder.

            try {
                // 5. Simpan URL kwitansi ke tabel invoices
                await db.promise().query(
                    'INSERT INTO invoices (order_id, file_url, tanggal_dibuat) VALUES (?, ?, ?)',
                    [orderId, fileUrl, tanggalPesanan]
                );

                // 6. Simpan URL struk (jika kwitansi dianggap struk) ke tabel receipts
                await db.promise().query(
                    'INSERT INTO receipts (order_id, file_url, tanggal_dibuat) VALUES (?, ?, ?)',
                    [orderId, fileUrl, tanggalPesanan] // Menggunakan URL yang sama untuk receipt
                );

                // 7. Kirim email kwitansi
                await transporter.sendMail({
                    from: `Flower Store <${process.env.EMAIL_USER}>`,
                    to: email,
                    subject: `Kwitansi Pembayaran Pemesanan Bunga #${orderId}`,
                    text: `Terima kasih telah memesan bunga di Flower Store. Kwitansi pembayaran Anda untuk pesanan #${orderId} terlampir.`,
                    attachments: [
                        {
                            filename: `kwitansi-${orderId}.pdf`,
                            content: pdfBuffer,
                            contentType: 'application/pdf',
                        },
                    ],
                });

                res.json({
                    message: 'Pemesanan berhasil diproses dan kwitansi telah dikirim ke email Anda.',
                    orderId: orderId,
                    ...dataPemesananLengkap,
                    kwitansiUrl: fileUrl // Memberikan URL kwitansi (placeholder)
                });

            } catch (emailPdfErr) {
                console.error('Gagal simpan URL atau kirim email:', emailPdfErr);
                // Respon tetap sukses karena data inti sudah tersimpan di orders dan order_items
                res.status(500).json({
                    message: 'Pemesanan berhasil, tapi gagal menyimpan URL kwitansi/struk atau mengirim email kwitansi.',
                    orderId: orderId,
                    ...dataPemesananLengkap,
                    errorDetail: emailPdfErr.message
                });
            }
        });

    } catch (dbErr) {
        console.error('Gagal dalam proses database (customer/order/order_item):', dbErr);
        res.status(500).json({ error: 'Gagal memproses pemesanan karena masalah database.', detail: dbErr.message });
    }
});

// Endpoint untuk mendapatkan semua pesanan (contoh)
app.get('/api/orders', async (req, res) => {
    try {
        const [rows] = await db.promise().query(`
            SELECT
                o.id_order, o.total, o.diskon, o.alamat, o.status, o.tanggal_pesanan,
                c.nama AS customer_nama, c.email AS customer_email, c.jenis_konsumen,
                oi.jenis_bunga, oi.ukuran, oi.jumlah, oi.harga_satuan
            FROM orders o
            JOIN customers c ON o.customer_id = c.id_customer
            JOIN order_items oi ON o.id_order = oi.order_id
            ORDER BY o.tanggal_pesanan DESC
        `);
        res.json(rows);
    } catch (err) {
        console.error('Gagal mendapatkan data pesanan:', err);
        res.status(500).json({ error: 'Gagal mengambil data pesanan', detail: err.message });
    }
});

// Endpoint untuk update status pesanan
app.patch('/api/orders/:id/status', async (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ error: 'Status baru harus diberikan.' });
    }
    try {
        const [result] = await db.promise().query(
            'UPDATE orders SET status = ? WHERE id_order = ?',
            [status, orderId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pesanan tidak ditemukan.' });
        }
        res.json({ message: 'Status pesanan berhasil diupdate.' });
    } catch (err) {
        console.error('Gagal update status pesanan:', err);
        res.status(500).json({ error: 'Gagal update status pesanan', detail: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
    console.log('Pastikan variabel lingkungan EMAIL_USER, EMAIL_PASS, DB_HOST, DB_USER, DB_PASS, DB_NAME telah diatur.');
});
