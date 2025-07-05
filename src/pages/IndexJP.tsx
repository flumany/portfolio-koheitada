
import Header from "@/components/HeaderJP";
import Hero from "@/components/HeroJP";
import About from "@/components/AboutJP";
import Projects from "@/components/Projects";
import Timeline from "@/components/TimelineJP";
import Contact from "@/components/ContactJP";
import Footer from "@/components/Footer";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useEffect } from "react";

const IndexJP = () => {
  const { restoreScrollPosition } = useScrollPosition();

  useEffect(() => {
    console.log('IndexJP page mounted, attempting to restore scroll position');
    
    // より確実にスクロール位置を復元
    const restoreWithRetry = () => {
      restoreScrollPosition();
      
      // 複数回試行して確実に復元
      setTimeout(() => restoreScrollPosition(), 100);
      setTimeout(() => restoreScrollPosition(), 300);
      setTimeout(() => restoreScrollPosition(), 600);
    };

    // 少し遅延してから復元を開始
    const timer = setTimeout(restoreWithRetry, 50);

    return () => clearTimeout(timer);
  }, [restoreScrollPosition]);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Timeline />
      <Contact />
      <Footer />
    </div>
  );
};

export default IndexJP;
