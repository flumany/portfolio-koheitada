
import HeaderEN from "@/components/HeaderEN";
import HeroEN from "@/components/HeroEN";
import AboutEN from "@/components/AboutEN";
import ProjectsEN from "@/components/ProjectsEN";
import TimelineEN from "@/components/TimelineEN";
import ContactEN from "@/components/ContactEN";
import Footer from "@/components/Footer";
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
      <HeroEN />
      <AboutEN />
      <ProjectsEN />
      <TimelineEN />
      <ContactEN />
      <Footer />
    </div>
  );
};

export default IndexEN;
