
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
    
    if (savedPosition !== undefined) {
      // より確実にスクロール復元を行うため、複数回試行
      const restoreScroll = (attempt = 0) => {
        window.scrollTo(0, savedPosition);
        
        // スクロール位置が正しく設定されたかチェック
        setTimeout(() => {
          const currentScroll = window.scrollY;
          console.log(`Attempt ${attempt + 1}: Target ${savedPosition}, Current ${currentScroll}`);
          
          // スクロール位置が目標値と大きく異なり、まだ試行回数が残っている場合は再試行
          if (Math.abs(currentScroll - savedPosition) > 10 && attempt < 3) {
            restoreScroll(attempt + 1);
          }
        }, 50);
      };
      
      // 初回はすぐに実行、その後DOMの描画完了を待って実行
      setTimeout(() => {
        restoreScroll();
      }, 50);
      
      // さらに確実にするため、少し遅れてもう一度実行
      setTimeout(() => {
        restoreScroll();
      }, 200);
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

    // ページ遷移時にもスクロール位置を保存
    const handleUnload = () => {
      saveScrollPosition();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('unload', handleUnload);

    // コンポーネントのアンマウント時にもスクロール位置を保存
    return () => {
      saveScrollPosition();
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('unload', handleUnload);
    };
  }, [location.pathname]);

  return {
    saveScrollPosition,
    restoreScrollPosition
  };
};
