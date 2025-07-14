
import Header from "@/components/HeaderJP";
import Hero from "@/components/HeroJP";
import About from "@/components/AboutJP";
import Timeline from "@/components/TimelineJP";
import Projects from "@/components/Projects";
import Contact from "@/components/ContactJP";
import Footer from "@/components/Footer";
import PDFExporter from "@/components/PDFExporter";
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
      
      {/* PDF Export Button */}
      <div className="fixed top-20 right-4 z-50 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg">
        <PDFExporter language="jp" />
      </div>

      <main>
        <section data-section="hero">
          <Hero />
        </section>
        <section data-section="about">
          <About />
        </section>
        <section data-section="timeline">
          <Timeline />
        </section>
        <section data-section="projects">
          <Projects />
        </section>
        <section data-section="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IndexJP;
