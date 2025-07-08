import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import FormPemesanan from './components/FormPemesanan'
import InvoicePreview from './components/InvoicePreview'
import NotifikasiSukses from './components/NotifikasiSukses'
import HotlineButton from './components/HotlineButton'
import AdminOrders from './components/AdminOrders'
import { SignIn, useUser, SignOutButton } from '@clerk/clerk-react'

function HeroSection() {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-green-50 via-pink-50 to-purple-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
          FloralBloom
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
          Toko Bunga Online 24 Jam - Kirim bunga ke seluruh Indonesia dengan mudah & cepat!
        </p>
        <div className="max-w-5xl mx-auto">
          <img 
            src="https://plus.unsplash.com/premium_photo-1718360706543-f753344840ee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Toko Bunga" 
            className="w-full rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

function ProdukSection() {
  const produk = [
    { nama: 'Bunga Meja', img: 'https://images.unsplash.com/photo-1659242536509-04df338adfea?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'Cocok untuk dekorasi meja kantor & rumah.' },
    { nama: 'Bunga Papan', img: 'https://plus.unsplash.com/premium_photo-1676693582198-5579ce256342?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'Pilihan terbaik untuk ucapan selamat & duka cita.' },
    { nama: 'Buket', img: 'https://images.unsplash.com/photo-1567085639994-f422323841eb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'Buket cantik untuk hadiah spesial.' },
    { nama: 'Rangkaian Lainnya', img: 'https://images.unsplash.com/photo-1714306358950-6fd6b71c3e55?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'Pesan rangkaian custom sesuai keinginan.' },
  ];
  
  return (
    <section id="produk" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Jenis Rangkaian Bunga
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pilih rangkaian bunga yang sesuai dengan kebutuhan Anda
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {produk.map((p, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
              <div className="mb-4">
                <img 
                  src={p.img} 
                  alt={p.nama} 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {p.nama}
              </h3>
              <p className="text-gray-600 text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TentangKamiSection() {
  return (
    <section id="about" className="py-24 px-4 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Mengapa Pilih FloralBloom?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami berkomitmen memberikan layanan terbaik untuk kepuasan pelanggan
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md">
            <span className="text-3xl">✅</span>
            <span className="text-lg text-gray-700 font-medium">
              Layanan 24 jam & pengiriman cepat
            </span>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md">
            <span className="text-3xl">✅</span>
            <span className="text-lg text-gray-700 font-medium">
              Rangkaian bunga segar & berkualitas
            </span>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md">
            <span className="text-3xl">✅</span>
            <span className="text-lg text-gray-700 font-medium">
              Diskon untuk konsumen tetap
            </span>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md">
            <span className="text-3xl">✅</span>
            <span className="text-lg text-gray-700 font-medium">
              Bisa custom & konsultasi gratis
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function DiskonInfoSection() {
  return (
    <section id="diskon" className="py-24 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Penawaran Khusus!
          </h3>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Dapatkan diskon menarik untuk setiap pemesanan Anda
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 text-white border border-white/30">
            <span className="text-4xl block mb-4">⭐</span>
            <h4 className="text-xl font-semibold mb-3">
              Konsumen Tetap
            </h4>
            <p className="opacity-90">Diskon 10% untuk setiap pemesanan</p>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 text-white border border-white/30">
            <span className="text-4xl block mb-4">🎁</span>
            <h4 className="text-xl font-semibold mb-3">
              Pemesanan Besar
            </h4>
            <p className="opacity-90">Diskon 5% untuk pemesanan di atas Rp 500.000</p>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 text-white border border-white/30">
            <span className="text-4xl block mb-4">🚚</span>
            <h4 className="text-xl font-semibold mb-3">
              Pengiriman Gratis
            </h4>
            <p className="opacity-90">Gratis ongkir untuk area tertentu</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection({ onClick }) {
  return (
    <section id="cta" className="py-24 px-4 bg-gradient-to-br from-green-600 to-green-700">
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Siap Kirim Bunga?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Pesan rangkaian bunga favoritmu sekarang juga!
          </p>
        </div>
        <button 
          className="bg-white text-green-600 font-bold py-4 px-8 rounded-xl text-lg border-none cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:bg-gray-50"
          onClick={onClick}
        >
          🌸 Pesan Sekarang
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">💐</span>
              <h4 className="text-xl font-bold">FloralBloom</h4>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Toko bunga terpercaya dengan layanan 24 jam dan pengiriman ke seluruh kota.
            </p>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-6">Layanan</h5>
            <ul className="text-gray-300 space-y-3">
              <li className="hover:text-white transition-colors">Bunga Meja</li>
              <li className="hover:text-white transition-colors">Bunga Papan</li>
              <li className="hover:text-white transition-colors">Buket & Hand Bouquet</li>
              <li className="hover:text-white transition-colors">Standing Flower</li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-6">Jam Operasional</h5>
            <div className="text-gray-300 space-y-2">
              <p>Pemesanan Online: 24/7</p>
              <p>Customer Service: 08:00 - 22:00</p>
              <p>Pengiriman: 08:00 - 20:00</p>
            </div>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-6">Kontak</h5>
            <div className="space-y-4">
              <a 
                href="tel:02112345678" 
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
              >
                <span>📞</span>
                <span>(021) 1234-5678</span>
              </a>
              <a 
                href="https://wa.me/6281234567890" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
              >
                <span>💬</span>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">&copy; 2025 FloralBloom. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [invoice, setInvoice] = useState(null);
  const [showNotif, setShowNotif] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isSignedIn } = useUser();

  // Effect untuk mendeteksi scroll dan mengupdate active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset untuk navbar

      // Jika form sedang ditampilkan, set active section ke 'order' dan jangan update lagi
      if (showForm) {
        setActiveSection('order');
        return;
      }

      // Mendeteksi section yang sedang dilihat berdasarkan ID
      const homeSection = document.getElementById('home');
      const produkSection = document.getElementById('produk');
      const aboutSection = document.getElementById('about');
      const diskonSection = document.getElementById('diskon');
      const ctaSection = document.getElementById('cta');
      const footer = document.getElementById('contact');
      
      // Cek dari bawah ke atas untuk menentukan section aktif
      if (footer && scrollPosition >= footer.offsetTop) {
        setActiveSection('contact');
      } else if (ctaSection && scrollPosition >= ctaSection.offsetTop) {
        setActiveSection('order'); // CTA Section
      } else if (diskonSection && scrollPosition >= diskonSection.offsetTop) {
        setActiveSection('about'); // Diskon Section
      } else if (aboutSection && scrollPosition >= aboutSection.offsetTop) {
        setActiveSection('about'); // Tentang Kami Section
      } else if (produkSection && scrollPosition >= produkSection.offsetTop) {
        setActiveSection('home'); // Produk Section
      } else if (homeSection && scrollPosition < homeSection.offsetTop + homeSection.offsetHeight) {
        setActiveSection('home'); // Hero Section
      }
    };

    // Event listener untuk menutup form
    const handleCloseForm = () => {
      setShowForm(false);
      setActiveSection('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('closeForm', handleCloseForm);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('closeForm', handleCloseForm);
    };
  }, [showForm]); // Tambahkan showForm sebagai dependency

  function handlePemesanan(data) {
    setInvoice(data);
    setShowNotif(true);
    setShowForm(false);
  }

  function handleCloseInvoice() {
    setInvoice(null);
  }

  function handleCloseNotif() {
    setShowNotif(false);
  }

  function handleShowForm() {
    setShowForm(true);
    setInvoice(null);
    setShowNotif(false);
    setActiveSection('order');
  }

  function handleNavigate(section) {
    setActiveSection(section);
    
    switch(section) {
      case 'home':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setShowForm(false);
        setShowAdmin(false);
        break;
      case 'order':
        // Jika form belum ditampilkan, tampilkan form
        if (!showForm) {
          setShowForm(true);
          setInvoice(null);
          setShowNotif(false);
          setShowAdmin(false);
        }
        // Selalu scroll ke form
        setTimeout(() => {
          const formElement = document.querySelector('.min-h-screen.bg-gradient-to-br');
          if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
        break;
      case 'about':
        setShowForm(false);
        setShowAdmin(false);
        // Scroll ke section tentang kami menggunakan ID
        setTimeout(() => {
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
        break;
      case 'contact':
        setShowForm(false);
        setShowAdmin(false);
        // Scroll ke footer menggunakan ID
        setTimeout(() => {
          const footer = document.getElementById('contact');
          if (footer) {
            footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
        break;
      case 'admin':
        setShowForm(false);
        setShowAdmin(true);
        setInvoice(null);
        setShowNotif(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      default:
        break;
    }
  }

  return (
    <div className="landing-root">
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />
      {showAdmin ? (
        isSignedIn ? (
          <div>
            <div className="flex justify-end p-4">
              <SignOutButton afterSignOutUrl="/" />
            </div>
            <AdminOrders />
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-screen">
            <SignIn routing="hash" />
          </div>
        )
      ) : (
        <>
          <HeroSection />
          <ProdukSection />
          <TentangKamiSection />
          <DiskonInfoSection />
          <CTASection onClick={handleShowForm} />
          {showForm && <FormPemesanan onSubmit={handlePemesanan} />}
          <InvoicePreview data={invoice} onClose={handleCloseInvoice} />
          <NotifikasiSukses show={showNotif} onClose={handleCloseNotif} />
          <HotlineButton />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App
