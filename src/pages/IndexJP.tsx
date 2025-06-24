
import React, { useEffect } from 'react';
import { useScrollPosition } from '../hooks/useScrollPosition';
import Header from '../components/Header';
import HeroJP from '../components/HeroJP';
import AboutJP from '../components/AboutJP';
import TimelineJP from '../components/TimelineJP';
import Projects from '../components/Projects';
import ContactJP from '../components/ContactJP';
import Footer from '../components/Footer';

const IndexJP: React.FC = () => {
  const { restoreScrollPosition } = useScrollPosition();

  useEffect(() => {
    console.log('IndexJP page mounted, attempting to restore scroll position');
    
    const timer = setTimeout(() => {
      restoreScrollPosition();
    }, 300);

    return () => clearTimeout(timer);
  }, [restoreScrollPosition]);

  return (
    <div className="min-h-screen">
      <Header />
      <HeroJP />
      <AboutJP />
      <TimelineJP />
      <Projects />
      <ContactJP />
      <Footer />
    </div>
  );
};

export default IndexJP;
