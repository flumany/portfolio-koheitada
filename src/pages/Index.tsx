
import React, { useEffect } from 'react';
import { useScrollPosition } from '../hooks/useScrollPosition';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Timeline from '../components/Timeline';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  const { restoreScrollPosition } = useScrollPosition();

  // ページがマウントされた時にスクロール位置を復元
  useEffect(() => {
    console.log('Index page mounted, attempting to restore scroll position');
    
    // DOMの描画とコンテンツの読み込みを待ってからスクロール位置を復元
    const timer = setTimeout(() => {
      restoreScrollPosition();
    }, 100);

    return () => clearTimeout(timer);
  }, [restoreScrollPosition]);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Timeline />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
