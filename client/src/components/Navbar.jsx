import { useState, useEffect } from 'react';

function Navbar({ onNavigate, activeSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (section) => {
    if (onNavigate) {
      onNavigate(section);
    }
    setIsMenuOpen(false); // Close menu when item is clicked
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 navbar-container">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="h-8 w-8 text-pink-600 text-2xl animate-pulse">🌸</span>
            <h1 className="text-xl md:text-2xl font-bold text-pink-700 tracking-tight">
              FloralBloom
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { id: 'home', label: 'Beranda' },
              { id: 'order', label: 'Pesan' },
              { id: 'about', label: 'Tentang Kami' },
              { id: 'contact', label: 'Kontak' }
            ].map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                className={`relative px-3 py-2 text-gray-700 hover:text-pink-600 transition-all duration-300 font-medium ${
                  activeSection === item.id ? 'text-pink-600' : ''
                }`} 
                onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
              >
                {item.label}
                {/* Active indicator */}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-pink-600 transform transition-all duration-300 ${
                  activeSection === item.id ? 'scale-x-100' : 'scale-x-0'
                }`}></span>
              </a>
            ))}
          </nav>
          
          {/* Enhanced Hamburger Menu Button */}
          <button 
            className={`hamburger-menu lg:hidden relative flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-pink-50 transition-all duration-300 group ${
              isMenuOpen ? 'bg-pink-100' : ''
            }`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {/* Top line */}
            <span className={`block w-6 h-0.5 bg-gray-800 rounded-full transition-all duration-300 ease-in-out transform ${
              isMenuOpen ? 'rotate-45 translate-y-2' : 'group-hover:w-7'
            }`}></span>
            
            {/* Middle line */}
            <span className={`block w-6 h-0.5 bg-gray-800 rounded-full transition-all duration-300 ease-in-out transform my-1 ${
              isMenuOpen ? 'opacity-0 scale-0' : 'group-hover:w-5'
            }`}></span>
            
            {/* Bottom line */}
            <span className={`block w-6 h-0.5 bg-gray-800 rounded-full transition-all duration-300 ease-in-out transform ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : 'group-hover:w-7'
            }`}></span>
          </button>
        </div>

        {/* Enhanced Mobile Navigation Menu */}
        <div className={`mobile-menu lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-gradient-to-b from-white to-pink-50 border-t border-pink-200 mt-4 rounded-lg shadow-inner">
            <nav className="flex flex-col py-4 space-y-1">
              {[
                { id: 'home', label: 'Beranda', icon: '🏠' },
                { id: 'order', label: 'Pesan', icon: '📋' },
                { id: 'about', label: 'Tentang Kami', icon: '👥' },
                { id: 'contact', label: 'Kontak', icon: '📞' }
              ].map((item, index) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`} 
                  className={`group mx-2 px-4 py-3 rounded-lg text-gray-700 hover:text-pink-600 hover:bg-white hover:shadow-md transition-all duration-300 transform hover:scale-105 ${
                    activeSection === item.id ? 'text-pink-600 bg-white shadow-md font-semibold' : ''
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isMenuOpen ? 'slideInFromRight 0.3s ease-out forwards' : 'none'
                  }}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                    {activeSection === item.id && (
                      <span className="ml-auto w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
                    )}
                  </div>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 lg:hidden z-[-1]"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  );
}

export default Navbar; 