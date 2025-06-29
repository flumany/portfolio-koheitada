
import React, { useEffect } from 'react';
import { useScrollPosition } from '../hooks/useScrollPosition';
import HeaderEN from '../components/HeaderEN';
import HeroEN from '../components/HeroEN';
import AboutEN from '../components/AboutEN';
import TimelineEN from '../components/TimelineEN';
import Projects from '../components/Projects';
import ContactEN from '../components/ContactEN';
import Footer from '../components/Footer';

const IndexEN: React.FC = () => {
  const { restoreScrollPosition } = useScrollPosition();

  useEffect(() => {
    console.log('IndexEN page mounted, attempting to restore scroll position');
    
    const timer = setTimeout(() => {
      restoreScrollPosition();
    }, 300);

    return () => clearTimeout(timer);
  }, [restoreScrollPosition]);

  return (
    <div className="min-h-screen">
      <HeaderEN />
      <HeroEN />
      <AboutEN />
      <TimelineEN />
      <Projects />
      <ContactEN />
      <Footer />
    </div>
  );
};

export default IndexEN;
