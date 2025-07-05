
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
    
    // DOM更新完了後に確実にスクロール位置を復元
    const restoreScroll = () => {
      restoreScrollPosition();
    };
    
    // 複数のタイミングで復元を試行
    restoreScroll(); // 即座に実行
    setTimeout(restoreScroll, 10); // 短い遅延
    setTimeout(restoreScroll, 100); // 少し長い遅延
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
