
import HeaderEN from "@/components/HeaderEN";
import HeroEN from "@/components/HeroEN";
import AboutEN from "@/components/AboutEN";
import TimelineEN from "@/components/TimelineEN";
import ProjectsEN from "@/components/ProjectsEN";
import ContactEN from "@/components/ContactEN";
import Footer from "@/components/Footer";
import PDFExporter from "@/components/PDFExporter";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useEffect } from "react";

const IndexEN = () => {
  const { restoreScrollPosition } = useScrollPosition();

  useEffect(() => {
    console.log('IndexEN page mounted, attempting to restore scroll position');
    
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
      <HeaderEN />
      
      {/* PDF Export Button */}
      <div className="fixed top-20 right-4 z-50 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg">
        <PDFExporter language="en" />
      </div>

      <main>
        <section data-section="hero">
          <HeroEN />
        </section>
        <section data-section="about">
          <AboutEN />
        </section>
        <section data-section="timeline">
          <TimelineEN />
        </section>
        <section data-section="projects">
          <ProjectsEN />
        </section>
        <section data-section="contact">
          <ContactEN />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IndexEN;
