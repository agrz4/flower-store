export default function InvoicePreview({ data, onClose }) {
  if (!data) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
            <span className="text-4xl">📋</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Faktur Pengiriman</h2>
          <p className="text-gray-600 text-lg">Detail pemesanan Anda</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4 text-lg">Informasi Pemesan</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nama:</span>
                  <span className="font-medium">{data.nama}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">No. Telepon:</span>
                  <span className="font-medium">{data.telepon}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{data.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium px-3 py-1 rounded-full text-sm ${
                    data.status === 'tetap' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {data.status === 'tetap' ? 'Konsumen Tetap' : 'Konsumen Baru'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4 text-lg">Detail Pesanan</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Jenis Bunga:</span>
                  <span className="font-medium capitalize">{data.jenis}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ukuran:</span>
                  <span className="font-medium capitalize">{data.ukuran}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Jumlah:</span>
                  <span className="font-medium">{data.jumlah}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4 text-lg">Alamat Pengiriman</h3>
          <p className="text-gray-700 leading-relaxed">{data.alamat}</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-pink-50 rounded-xl p-6 mb-8 border border-green-100">
          <h3 className="font-semibold text-gray-800 mb-6 text-lg">Ringkasan Biaya</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">Rp {(data.total + data.diskon).toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Diskon:</span>
              <span className="font-medium text-green-600">- Rp {data.diskon.toLocaleString('id-ID')}</span>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-800">Total:</span>
                <span className="text-2xl font-bold text-green-600">Rp {data.total.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
          >
            Tutup
          </button>
          <button 
            onClick={() => window.print()}
            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
          >
            🖨️ Cetak
          </button>
        </div>
      </div>
    </div>
  );
} 