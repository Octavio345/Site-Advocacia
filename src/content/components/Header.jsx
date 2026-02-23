import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header({ siteName, oab, whatsapp }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Função para determinar a rota correta
  const getRoute = (item) => {
    switch(item) {
      case 'Início':
        return '/';
      case 'Artigos':
        return '/blog';
      case 'Sobre':
        return '/sobre';
      case 'Contato':
        return '/contato';
      default:
        return '/';
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'
    }`}>
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="relative group">
          <h1 className={`text-2xl font-bold transition-colors duration-300 ${
            isScrolled ? 'text-primary' : 'text-white'
          }`}>
            {siteName}
          </h1>
          <p className={`text-sm transition-colors duration-300 ${
            isScrolled ? 'text-gray-600' : 'text-white/80'
          }`}>{oab}</p>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {['Início', 'Artigos', 'Sobre', 'Contato'].map((item) => (
            <Link
              key={item}
              to={getRoute(item)}
              className={`relative font-medium transition-all duration-300 hover:text-accent group ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-full font-medium transition-all hover:scale-105 hover:shadow-lg animate-pulse-slow"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.177.181-.076.355.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z"/>
          </svg>
          WhatsApp
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            isScrolled ? 'text-primary hover:bg-gray-100' : 'text-white hover:bg-white/10'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="container-custom py-4 flex flex-col space-y-3">
          {['Início', 'Artigos', 'Sobre', 'Contato'].map((item) => (
            <Link
              key={item}
              to={getRoute(item)}
              className="text-gray-700 hover:text-primary hover:bg-gray-50 px-4 py-2 rounded-lg transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-green-600 transition"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}