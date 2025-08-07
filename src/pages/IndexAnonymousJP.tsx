import HeaderAnonymousJP from "@/components/HeaderAnonymousJP";
import HeroAnonymousJP from "@/components/HeroAnonymousJP";
import AboutJP from "@/components/AboutJP";
import TimelineJP from "@/components/TimelineJP";
import Projects from "@/components/Projects";

import FooterAnonymous from "@/components/FooterAnonymous";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useEffect } from "react";

const IndexAnonymousJP = () => {
  const { restoreScrollPosition } = useScrollPosition();

  useEffect(() => {
    console.log('IndexAnonymousJP page mounted, attempting to restore scroll position');
    
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
      <HeaderAnonymousJP />
      <HeroAnonymousJP />
      <AboutJP />
      <TimelineJP />
      <Projects />
      
      <FooterAnonymous />
    </div>
  );
};

export default IndexAnonymousJP;