
import React, { useEffect, useLayoutEffect } from 'react';
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

  // useLayoutEffect を使用してDOM描画前にスクロール位置を復元
  useLayoutEffect(() => {
    console.log('Index: useLayoutEffect - attempting to restore scroll position');
    restoreScrollPosition();
  }, [restoreScrollPosition]);

  // 追加の復元タイミング（コンテンツ読み込み完了後）
  useEffect(() => {
    console.log('Index: useEffect - additional restore attempt');
    // コンテンツが完全に読み込まれた後の復元
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
