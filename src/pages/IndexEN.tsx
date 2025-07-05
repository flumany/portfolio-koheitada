
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
