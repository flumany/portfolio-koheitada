
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// スクロール位置を保存するためのグローバルストレージ
const scrollPositions = new Map<string, number>();

export const useScrollPosition = () => {
  const location = useLocation();

  // 現在のスクロール位置を保存
  const saveScrollPosition = () => {
    const scrollY = window.scrollY;
    scrollPositions.set(location.pathname, scrollY);
  };

  // 保存されたスクロール位置を復元
  const restoreScrollPosition = () => {
    const savedPosition = scrollPositions.get(location.pathname);
    if (savedPosition !== undefined) {
      // スクロール復元を少し遅延させることで、DOMの描画完了を待つ
      setTimeout(() => {
        window.scrollTo(0, savedPosition);
      }, 100);
    }
  };

  // ページを離れる時にスクロール位置を保存
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveScrollPosition();
    };

    // スクロール位置を定期的に保存（ユーザーがスクロールしている間）
    const handleScroll = () => {
      saveScrollPosition();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  return {
    saveScrollPosition,
    restoreScrollPosition
  };
};
