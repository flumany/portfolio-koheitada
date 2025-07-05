
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
    
    // DOM更新後に確実にスクロール位置を復元
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
      <Projects />
      <Timeline />
      <Contact />
      <Footer />
    </div>
  );
};

export default IndexJP;
