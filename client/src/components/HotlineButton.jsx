const WA_NUMBER = '6281234567890'; // Ganti dengan nomor WA toko
const TEL_NUMBER = '0211234567'; // Ganti dengan nomor telepon toko

export default function HotlineButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-4">
      <a 
        href={`https://wa.me/${WA_NUMBER}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 font-semibold text-lg"
      >
        <span className="text-2xl">💬</span>
        <span className="hidden sm:inline">Chat WhatsApp 24 Jam</span>
        <span className="sm:hidden">WhatsApp</span>
      </a>
      <a 
        href={`tel:${TEL_NUMBER}`} 
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 font-semibold text-lg"
      >
        <span className="text-2xl">📞</span>
        <span className="hidden sm:inline">Telepon Toko</span>
        <span className="sm:hidden">Telepon</span>
      </a>
    </div>
  );
} 