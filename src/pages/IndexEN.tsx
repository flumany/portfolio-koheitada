
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
    // ページマウント後に少し遅延してスクロール位置を復元
    const timer = setTimeout(() => {
      restoreScrollPosition();
    }, 150);

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
