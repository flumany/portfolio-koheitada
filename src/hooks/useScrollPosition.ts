
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
    
    if (savedPosition !== undefined && savedPosition >= 0) {
      // 複数回試行して確実に復元
      const scrollToPosition = () => {
        window.scrollTo({
          top: savedPosition,
          behavior: 'instant'
        });
      };

      // 即座に実行
      scrollToPosition();
      
      // 少し遅延してもう一度実行（DOM更新待ち）
      setTimeout(scrollToPosition, 50);
      setTimeout(scrollToPosition, 150);
      setTimeout(scrollToPosition, 300);
    }
  }, [location.pathname]);

  // 特定のパスのスクロール位置を強制的に復元する関数
  const restoreScrollPositionForPath = useCallback((path: string) => {
    const savedPosition = scrollPositions.get(path);
    console.log(`Force restoring scroll position for ${path}:`, savedPosition);
    
    if (savedPosition !== undefined && savedPosition >= 0) {
      const scrollToPosition = () => {
        window.scrollTo({
          top: savedPosition,
          behavior: 'instant'
        });
      };

      // 複数回試行
      setTimeout(scrollToPosition, 100);
      setTimeout(scrollToPosition, 200);
      setTimeout(scrollToPosition, 400);
    }
  }, []);

  // スクロールイベントの処理を改善
  useEffect(() => {
    let scrollTimer: NodeJS.Timeout;
    
    const handleScroll = () => {
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      scrollTimer = setTimeout(() => {
        saveScrollPosition();
      }, 100);
    };

    const handleBeforeUnload = () => {
      saveScrollPosition();
    };

    // イベントリスナーを追加
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    // クリーンアップ
    return () => {
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      saveScrollPosition(); // アンマウント時に保存
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [saveScrollPosition]);

  return {
    saveScrollPosition,
    restoreScrollPosition,
    restoreScrollPositionForPath
  };
};
