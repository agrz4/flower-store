# Flower Store - Toko Bunga Online

Aplikasi toko bunga online dengan fitur pemesanan, perhitungan harga otomatis, dan sistem email kwitansi.

## Struktur Proyek

```
flower-store/
├── client/          # Frontend React + Vite
├── server/          # Backend Node.js + Express
└── README.md
```

## Setup Aplikasi

### 1. Setup Database MySQL

Buat database dengan nama `flower_store` dan jalankan script SQL berikut:

```sql
CREATE DATABASE flower_store;
USE flower_store;

CREATE TABLE customers (
    id_customer INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    jenis_konsumen ENUM('tetap', 'tidak tetap') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id_order INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    diskon DECIMAL(10,2) DEFAULT 0,
    alamat TEXT NOT NULL,
    status ENUM('pending', 'confirmed', 'shipped', 'delivered') DEFAULT 'pending',
    tanggal_pesanan TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id_customer)
);

CREATE TABLE order_items (
    id_item INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    jenis_bunga ENUM('meja', 'papan', 'buket', 'lain') NOT NULL,
    ukuran ENUM('kecil', 'sedang', 'besar') NOT NULL,
    jumlah INT NOT NULL,
    harga_satuan DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id_order)
);

CREATE TABLE invoices (
    id_invoice INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    tanggal_dibuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id_order)
);

CREATE TABLE receipts (
    id_receipt INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    tanggal_dibuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id_order)
);
```

### 2. Setup Server

1. Masuk ke direktori server:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Buat file `.env` di folder server dengan konfigurasi berikut:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=flower_store

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
PORT=5000
```

### 3. Setup Client

1. Masuk ke direktori client:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan aplikasi:
```bash
npm run dev
```

## Fitur Aplikasi

- ✅ Landing page responsif
- ✅ Form pemesanan bunga
- ✅ Perhitungan harga otomatis dengan diskon
- ✅ Sistem database MySQL
- ✅ Generate PDF kwitansi
- ✅ Kirim email dengan attachment PDF
- ✅ Hotline button untuk WhatsApp

## Troubleshooting

### Error Database Connection
- Pastikan MySQL server berjalan
- Periksa kredensial database di file `.env`
- Pastikan database `flower_store` sudah dibuat

### Error Port Already in Use
- Ganti PORT di file `.env`
- Atau matikan aplikasi yang menggunakan port yang sama

## Teknologi yang Digunakan

### Frontend
- React 19
- Vite
- Tailwind CSS
- HTML5 & CSS3

### Backend
- Node.js
- Express.js
- MySQL2
- Nodemailer
- PDFKit
- CORS

### Database
- MySQL

## Lisensi

ISC 