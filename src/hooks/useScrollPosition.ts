
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
      // requestAnimationFrameを使用してDOM更新後に確実に実行
      requestAnimationFrame(() => {
        window.scrollTo({
          top: savedPosition,
          behavior: 'instant'
        });
        console.log(`Actually scrolled to:`, savedPosition);
      });
    }
  }, [location.pathname]);

  // 特定のパスのスクロール位置を強制的に復元する関数
  const restoreScrollPositionForPath = useCallback((path: string) => {
    const savedPosition = scrollPositions.get(path);
    console.log(`Force restoring scroll position for ${path}:`, savedPosition);
    
    if (savedPosition !== undefined && savedPosition > 0) {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: savedPosition,
          behavior: 'instant'
        });
        console.log(`Force scrolled to:`, savedPosition);
      });
    }
  }, []);

  // スクロールイベントリスナー（デバウンス付き）
  useEffect(() => {
    let scrollTimer: NodeJS.Timeout;
    
    const handleScroll = () => {
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      scrollTimer = setTimeout(() => {
        saveScrollPosition();
      }, 150);
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
    restoreScrollPosition,
    restoreScrollPositionForPath
  };
};
