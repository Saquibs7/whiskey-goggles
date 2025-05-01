import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GlassWater, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Upload', path: '/upload' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Gallery', path: '/gallery' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-amber-900 bg-opacity-95 text-amber-50 shadow-md' 
          : 'bg-transparent text-amber-900'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <GlassWater size={28} className={`${isScrolled ? 'text-amber-200' : 'text-amber-800'} transition-colors duration-300`} />
          <span className="font-serif text-xl font-bold tracking-tight">Whisky Goggle</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={`
                font-medium transition-colors duration-300
                ${location.pathname === link.path 
                  ? (isScrolled ? 'text-amber-200 border-b-2 border-amber-200' : 'text-amber-800 border-b-2 border-amber-800') 
                  : (isScrolled ? 'text-amber-50 hover:text-amber-200' : 'text-amber-700 hover:text-amber-900')}
              `}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-2xl"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X size={24} className={isScrolled ? 'text-amber-50' : 'text-amber-900'} />
          ) : (
            <Menu size={24} className={isScrolled ? 'text-amber-50' : 'text-amber-900'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-amber-800 text-amber-50">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={`
                  font-medium py-2 
                  ${location.pathname === link.path 
                    ? 'text-amber-200 border-l-4 border-amber-200 pl-2' 
                    : 'text-amber-50 hover:text-amber-200 pl-2'}
                `}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;