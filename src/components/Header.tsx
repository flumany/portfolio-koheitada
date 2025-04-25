
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle scroll effect
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
        top: offsetTop - 80, // Account for header height
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
          <button onClick={() => scrollToSection('experience')} className="nav-link">Experience</button>
          <button onClick={() => scrollToSection('projects')} className="nav-link">Projects</button>
          <button onClick={() => scrollToSection('models')} className="nav-link">3D Models</button>
          <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-nordic-dark focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-nordic-white py-4 animate-fade-in">
          <div className="container-custom flex flex-col space-y-4">
            <button onClick={() => scrollToSection('about')} className="nav-link py-2 text-left">About</button>
            <button onClick={() => scrollToSection('experience')} className="nav-link py-2 text-left">Experience</button>
            <button onClick={() => scrollToSection('projects')} className="nav-link py-2 text-left">Projects</button>
            <button onClick={() => scrollToSection('models')} className="nav-link py-2 text-left">3D Models</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link py-2 text-left">Contact</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
