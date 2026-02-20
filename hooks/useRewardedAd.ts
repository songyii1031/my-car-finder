/**
 * useRewardedAd.ts
 * 보상형 광고 커스텀 훅
 * 광고 로드, 표시, 보상 처리를 관리합니다.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { AD_CONFIG, AdStatus, AdError, AdCallbacks } from '../config/adConfig';

interface UseRewardedAdReturn {
  adStatus: AdStatus;
  isAdReady: boolean;
  isAdShowing: boolean;
  isRewarded: boolean;
  error: AdError | null;
  loadAd: () => void;
  showAd: () => Promise<boolean>;
  resetAd: () => void;
}

export function useRewardedAd(callbacks?: AdCallbacks): UseRewardedAdReturn {
  const [adStatus, setAdStatus] = useState<AdStatus>('idle');
  const [isRewarded, setIsRewarded] = useState(false);
  const [error, setError] = useState<AdError | null>(null);
  
  const adTimerRef = useRef<NodeJS.Timeout | null>(null);
  const watchStartTimeRef = useRef<number>(0);

  // 광고 로드
  const loadAd = useCallback(() => {
    setAdStatus('loading');
    setError(null);
    
    // 시뮬레이션: 실제로는 AdMob SDK를 사용
    // 광고 로드 시뮬레이션 (1-2초 소요)
    const loadTime = 1000 + Math.random() * 1000;
    
    adTimerRef.current = setTimeout(() => {
      // 90% 확률로 광고 로드 성공 (테스트용)
      if (Math.random() > 0.1) {
        setAdStatus('ready');
        callbacks?.onAdLoaded?.();
      } else {
        const adError: AdError = {
          code: 'AD_LOAD_FAILED',
          message: '광고를 불러오는데 실패했습니다. 다시 시도해주세요.',
        };
        setError(adError);
        setAdStatus('error');
        callbacks?.onAdFailedToLoad?.(adError);
      }
    }, loadTime);
  }, [callbacks]);

  // 광고 표시
  const showAd = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      if (adStatus !== 'ready') {
        resolve(false);
        return;
      }

      setAdStatus('showing');
      watchStartTimeRef.current = Date.now();
      callbacks?.onAdOpened?.();

      // 광고 시청 시뮬레이션 (5초 후 보상)
      adTimerRef.current = setTimeout(() => {
        const watchTime = Date.now() - watchStartTimeRef.current;
        
        if (watchTime >= AD_CONFIG.MIN_WATCH_TIME) {
          setIsRewarded(true);
          setAdStatus('completed');
          callbacks?.onRewarded?.();
          callbacks?.onAdClosed?.();
          resolve(true);
        } else {
          setAdStatus('skipped');
          callbacks?.onAdSkipped?.();
          callbacks?.onAdClosed?.();
          resolve(false);
        }
      }, AD_CONFIG.MIN_WATCH_TIME);
    });
  }, [adStatus, callbacks]);

  // 광고 상태 리셋
  const resetAd = useCallback(() => {
    if (adTimerRef.current) {
      clearTimeout(adTimerRef.current);
    }
    setAdStatus('idle');
    setIsRewarded(false);
    setError(null);
  }, []);

  // 클린업
  useEffect(() => {
    return () => {
      if (adTimerRef.current) {
        clearTimeout(adTimerRef.current);
      }
    };
  }, []);

  return {
    adStatus,
    isAdReady: adStatus === 'ready',
    isAdShowing: adStatus === 'showing',
    isRewarded,
    error,
    loadAd,
    showAd,
    resetAd,
  };
}
