
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
    console.log(`Saved scroll position for ${location.pathname}:`, scrollY);
  };

  // 保存されたスクロール位置を復元
  const restoreScrollPosition = () => {
    const savedPosition = scrollPositions.get(location.pathname);
    console.log(`Restoring scroll position for ${location.pathname}:`, savedPosition);
    
    if (savedPosition !== undefined && savedPosition > 0) {
      // requestAnimationFrameを使ってDOMの描画完了後にスクロール
      requestAnimationFrame(() => {
        window.scrollTo({
          top: savedPosition,
          behavior: 'instant'
        });
        
        // さらに確実にするため、少し遅れてもう一度実行
        setTimeout(() => {
          window.scrollTo({
            top: savedPosition,
            behavior: 'instant'
          });
        }, 100);
      });
    }
  };

  // 特定のパスのスクロール位置を強制的に復元する関数を追加
  const restoreScrollPositionForPath = (path: string) => {
    const savedPosition = scrollPositions.get(path);
    console.log(`Force restoring scroll position for ${path}:`, savedPosition);
    
    if (savedPosition !== undefined && savedPosition > 0) {
      // 少し遅延してから復元を実行
      setTimeout(() => {
        window.scrollTo({
          top: savedPosition,
          behavior: 'instant'
        });
      }, 50);
    }
  };

  // ページを離れる時にスクロール位置を保存
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveScrollPosition();
    };

    // スクロール位置を定期的に保存（ユーザーがスクロールしている間）
    let scrollTimer: NodeJS.Timeout;
    const handleScroll = () => {
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      scrollTimer = setTimeout(() => {
        saveScrollPosition();
      }, 100);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('scroll', handleScroll);

    // コンポーネントのアンマウント時にもスクロール位置を保存
    return () => {
      saveScrollPosition();
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
    };
  }, [location.pathname]);

  return {
    saveScrollPosition,
    restoreScrollPosition,
    restoreScrollPositionForPath
  };
};
