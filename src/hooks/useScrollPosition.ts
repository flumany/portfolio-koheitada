
import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// スクロール位置を保存するためのグローバルストレージ
const scrollPositions = new Map<string, number>();

export const useScrollPosition = () => {
  const location = useLocation();

  // 現在のスクロール位置を保存
  const saveScrollPosition = useCallback(() => {
    const scrollY = window.scrollY;
    scrollPositions.set(location.pathname, scrollY);
    console.log(`Saved scroll position for ${location.pathname}:`, scrollY);
  }, [location.pathname]);

  // 保存されたスクロール位置を復元
  const restoreScrollPosition = useCallback(() => {
    const savedPosition = scrollPositions.get(location.pathname);
    console.log(`Restoring scroll position for ${location.pathname}:`, savedPosition);
    
    if (savedPosition !== undefined && savedPosition > 0) {
      // 即座にスクロール位置を設定し、確実に復元する
      window.scrollTo(0, savedPosition);
      console.log(`Scrolled to:`, savedPosition);
      
      // 念のため、少し遅延させてもう一度実行
      setTimeout(() => {
        window.scrollTo(0, savedPosition);
        console.log(`Double-check scroll to:`, savedPosition);
      }, 50);
    }
  }, [location.pathname]);

  // スクロールイベントリスナー（デバウンス付き）
  useEffect(() => {
    let scrollTimer: NodeJS.Timeout;
    
    const handleScroll = () => {
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      scrollTimer = setTimeout(() => {
        saveScrollPosition();
      }, 100); // デバウンス時間を短縮
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [saveScrollPosition]);

  return {
    saveScrollPosition,
    restoreScrollPosition
  };
};
