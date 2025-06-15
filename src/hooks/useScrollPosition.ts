
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
    console.log(`Saved scroll position for ${location.pathname}: ${scrollY}`);
  }, [location.pathname]);

  // 保存されたスクロール位置を復元
  const restoreScrollPosition = useCallback(() => {
    const savedPosition = scrollPositions.get(location.pathname);
    console.log(`Attempting to restore scroll position for ${location.pathname}: ${savedPosition}`);
    
    if (savedPosition !== undefined && savedPosition > 0) {
      // 複数のタイミングでスクロール復元を試行
      const restoreAttempts = [0, 50, 100, 200, 500];
      
      restoreAttempts.forEach((delay, index) => {
        setTimeout(() => {
          // DOM要素が完全に描画されるまで待機
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const currentScroll = window.scrollY;
              console.log(`Restore attempt ${index + 1} at ${delay}ms - Current: ${currentScroll}, Target: ${savedPosition}`);
              
              // まだ目標位置に到達していない場合のみスクロール
              if (Math.abs(currentScroll - savedPosition) > 10) {
                window.scrollTo({
                  top: savedPosition,
                  behavior: 'instant'
                });
                
                // スクロール後の位置を確認
                setTimeout(() => {
                  const afterScroll = window.scrollY;
                  console.log(`After scroll attempt ${index + 1}: ${afterScroll}`);
                }, 10);
              }
            });
          });
        }, delay);
      });
    } else {
      console.log(`No saved position found for ${location.pathname} or position is 0`);
    }
  }, [location.pathname]);

  // ページを離れる時にスクロール位置を保存
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveScrollPosition();
    };

    // スクロール位置を定期的に保存（ユーザーがスクロールしている間）
    const handleScroll = () => {
      saveScrollPosition();
    };

    // ページ遷移時の保存
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        saveScrollPosition();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // コンポーネント初期化時に一度スクロール位置を保存
    saveScrollPosition();

    return () => {
      // アンマウント時にも保存
      saveScrollPosition();
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [location.pathname, saveScrollPosition]);

  return {
    saveScrollPosition,
    restoreScrollPosition
  };
};
