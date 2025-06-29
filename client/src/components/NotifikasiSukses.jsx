export default function NotifikasiSukses({ show, onClose }) {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 max-w-md w-full mx-4 animate-fade-in">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Pemesanan Berhasil!</h3>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Konfirmasi & kwitansi akan dikirim ke email Anda dalam waktu singkat.
          </p>
          <button 
            onClick={onClose}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
} 