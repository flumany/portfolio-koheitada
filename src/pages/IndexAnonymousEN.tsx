import HeaderAnonymousEN from "@/components/HeaderAnonymousEN";
import HeroAnonymousEN from "@/components/HeroAnonymousEN";
import AboutEN from "@/components/AboutEN";
import TimelineEN from "@/components/TimelineEN";
import ProjectsEN from "@/components/ProjectsEN";

import FooterAnonymous from "@/components/FooterAnonymous";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useEffect } from "react";

const IndexAnonymousEN = () => {
  const { restoreScrollPosition } = useScrollPosition();

  useEffect(() => {
    console.log('IndexAnonymousEN page mounted, attempting to restore scroll position');
    
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
      <HeaderAnonymousEN />
      <HeroAnonymousEN />
      <AboutEN />
      <TimelineEN />
      <ProjectsEN />
      
      <FooterAnonymous />
    </div>
  );
};

export default IndexAnonymousEN;