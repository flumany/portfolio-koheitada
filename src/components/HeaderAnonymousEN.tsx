import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const HeaderAnonymousEN: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: offsetTop - 80,
        behavior: "smooth"
      });
      setIsOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-nordic-white shadow-sm' : 'bg-transparent'}`}>
      <div className="container-custom py-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl font-poppins font-medium">Portfolio</span>
        </div>

        <nav className="hidden md:flex space-x-8 items-center">
          <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
          <button onClick={() => scrollToSection('experience')} className="nav-link">Experience</button>
          <button onClick={() => scrollToSection('projects')} className="nav-link">Projects</button>
          <Link to="/anonymous" className="flex items-center gap-2 bg-nordic-beige px-4 py-2 rounded-md text-sm hover:bg-opacity-80 transition-all border border-nordic-gray/20">
            <span className="text-xs bg-white px-2 py-1 rounded text-nordic-dark font-medium">English</span>
            <span>日本語</span>
          </Link>
        </nav>

        <button 
          className="md:hidden text-nordic-dark focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-nordic-white py-4 animate-fade-in">
          <div className="container-custom flex flex-col space-y-4">
            <button onClick={() => scrollToSection('about')} className="nav-link py-2 text-left">About</button>
            <button onClick={() => scrollToSection('experience')} className="nav-link py-2 text-left">Experience</button>
            <button onClick={() => scrollToSection('projects')} className="nav-link py-2 text-left">Projects</button>
            <Link to="/anonymous" className="flex items-center gap-2 bg-nordic-beige px-4 py-2 rounded-md text-sm hover:bg-opacity-80 transition-all w-fit border border-nordic-gray/20">
              <span className="text-xs bg-white px-2 py-1 rounded text-nordic-dark font-medium">English</span>
              <span>日本語</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderAnonymousEN;