import { useState, useEffect } from 'react';

const JENIS_BUNGA = [
  { label: 'Bunga Meja', value: 'meja', harga: { kecil: 100000, sedang: 200000, besar: 300000 }, icon: '🪴' },
  { label: 'Bunga Papan', value: 'papan', harga: { kecil: 300000, sedang: 500000, besar: 700000 }, icon: '🎀' },
  { label: 'Buket', value: 'buket', harga: { kecil: 80000, sedang: 150000, besar: 250000 }, icon: '💐' },
  { label: 'Lainnya', value: 'lain', harga: { kecil: 50000, sedang: 100000, besar: 200000 }, icon: '🌸' },
];

const UKURAN = [
  { label: 'Kecil', value: 'kecil', desc: 'Cocok untuk hadiah personal' },
  { label: 'Sedang', value: 'sedang', desc: 'Pilihan terpopuler' },
  { label: 'Besar', value: 'besar', desc: 'Untuk acara spesial' }
];

export default function FormPemesanan({ onSubmit }) {
  const [form, setForm] = useState({
    nama: '',
    telepon: '',
    email: '',
    status: 'tidak tetap',
    jenis: 'meja',
    ukuran: 'kecil',
    jumlah: 1,
    alamat: '',
    metodePembayaran: 'transfer',
  });
  const [total, setTotal] = useState(0);
  const [diskon, setDiskon] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const jenis = JENIS_BUNGA.find(j => j.value === form.jenis);
    const hargaSatuan = jenis.harga[form.ukuran];
    const subtotal = hargaSatuan * form.jumlah;
    let diskon = 0;
    if (form.status === 'tetap') {
      diskon = subtotal * 0.1;
    } else if (form.status === 'tidak tetap' && subtotal >= 500000) {
      diskon = subtotal * 0.05;
    }
    setDiskon(diskon);
    setTotal(subtotal - diskon);
  }, [form]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'jumlah' ? Number(value) : value }));
  }

  function handleClose() {
    // Trigger navigation to home to close form
    window.dispatchEvent(new CustomEvent('closeForm'));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/pemesanan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form }),
      });
      const data = await res.json();
      onSubmit(data);
    } catch {
      alert('Gagal mengirim data ke server');
    } finally {
      setIsSubmitting(false);
    }
  }

  const selectedJenis = JENIS_BUNGA.find(j => j.value === form.jenis);
  const selectedUkuran = UKURAN.find(u => u.value === form.ukuran);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-pink-50 to-purple-50 py-12 lg:py-20 px-4 relative">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="Tutup form"
      >
        <span className="text-2xl text-gray-600 group-hover:text-gray-800 transition-colors">×</span>
      </button>

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-6">
            <span className="text-2xl">🌸</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Formulir Pemesanan
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Pesan rangkaian bunga favoritmu dengan mudah dan cepat!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 lg:p-10 space-y-8">
              
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-pink-600 text-sm">👤</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Informasi Pemesan</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700">
                      Nama Lengkap *
                    </label>
                    <input 
                      name="nama" 
                      value={form.nama} 
                      onChange={handleChange} 
                      required 
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700">
                      No. Telepon *
                    </label>
                    <input 
                      name="telepon" 
                      value={form.telepon} 
                      onChange={handleChange} 
                      required 
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700">
                      Email *
                    </label>
                    <input 
                      name="email" 
                      type="email" 
                      value={form.email} 
                      onChange={handleChange} 
                      required 
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      placeholder="email@example.com"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700">
                      Status Konsumen
                    </label>
                    <select 
                      name="status" 
                      value={form.status} 
                      onChange={handleChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    >
                      <option value="tetap">⭐ Konsumen Tetap (Diskon 10%)</option>
                      <option value="tidak tetap">🆕 Konsumen Baru</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Product Selection */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">🌺</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Pilihan Produk</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700">
                      Jenis Bunga
                    </label>
                    <select 
                      name="jenis" 
                      value={form.jenis} 
                      onChange={handleChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    >
                      {JENIS_BUNGA.map(j => (
                        <option key={j.value} value={j.value}>{j.icon} {j.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700">
                      Ukuran
                    </label>
                    <select 
                      name="ukuran" 
                      value={form.ukuran} 
                      onChange={handleChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    >
                      {UKURAN.map(u => (
                        <option key={u.value} value={u.value}>{u.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700">
                      Jumlah *
                    </label>
                    <input 
                      name="jumlah" 
                      type="number" 
                      min="1" 
                      value={form.jumlah} 
                      onChange={handleChange} 
                      required 
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Alamat Pengiriman *
                </label>
                <textarea 
                  name="alamat" 
                  value={form.alamat} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 bg-white/50 backdrop-blur-sm min-h-[120px] resize-none"
                  placeholder="Masukkan alamat lengkap pengiriman..."
                />
              </div>

              {/* Payment Method */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Metode Pembayaran *
                </label>
                <select
                  name="metodePembayaran"
                  value={form.metodePembayaran}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                >
                  <option value="transfer">Transfer Bank</option>
                  <option value="qris">QRIS</option>
                  <option value="cod">Bayar di Tempat (COD)</option>
                </select>
              </div>
            </form>
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 lg:p-8 space-y-6 sticky top-8">
              
              {/* Product Preview */}
              <div className="text-center pb-6 border-b border-gray-200">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{selectedJenis.icon}</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{selectedJenis.label}</h4>
                <p className="text-sm text-gray-600">{selectedUkuran.label} • {form.jumlah} item</p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 text-lg">Ringkasan Biaya</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Harga Satuan:</span>
                    <span className="font-medium">Rp {selectedJenis.harga[form.ukuran].toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">Rp {(total + diskon).toLocaleString('id-ID')}</span>
                  </div>
                  
                  {diskon > 0 && (
                    <div className="flex justify-between items-center bg-green-50 rounded-lg p-3">
                      <span className="text-green-700 font-medium">Diskon:</span>
                      <span className="font-bold text-green-600">- Rp {diskon.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-800">Total:</span>
                      <span className="text-2xl font-bold text-green-600">Rp {total.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Memproses...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    🌸 Pesan Sekarang
                  </span>
                )}
              </button>

              {/* Additional Info */}
              <div className="text-center text-sm text-gray-500 space-y-2">
                <p>✅ Pembayaran setelah barang diterima</p>
                <p>🚚 Pengiriman 2-4 jam</p>
                <p>💬 Konsultasi gratis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 