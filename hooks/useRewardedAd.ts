/**
 * useRewardedAd.ts
 * 보상형 광고 커스텀 훅
 * 광고 로드, 표시, 보상 처리를 관리합니다.
 *
 * USE_MOCK_AD = true:  타이머 시뮬레이션으로 동작 (개발/테스트)
 * USE_MOCK_AD = false: AIT 광고 SDK 연동 (토스 컨테이너 내부에서 실제 광고 표시)
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { AD_CONFIG, USE_MOCK_AD, isAITAvailable } from '../config/adConfig';
import type { AdStatus, AdError, AdCallbacks } from '../config/adConfig';

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

  const adTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbacksRef = useRef(callbacks);

  // 콜백을 ref로 관리하여 useEffect/useCallback 의존성 문제 방지
  useEffect(() => {
    callbacksRef.current = callbacks;
  }, [callbacks]);

  // 광고 로드
  const loadAd = useCallback(() => {
    setAdStatus('loading');
    setError(null);

    if (USE_MOCK_AD) {
      // Mock 모드: 항상 성공 (개발/테스트용)
      adTimerRef.current = setTimeout(() => {
        setAdStatus('ready');
        callbacksRef.current?.onAdLoaded?.();
      }, AD_CONFIG.MOCK_LOAD_TIME);
    } else if (isAITAvailable()) {
      // AIT SDK 사용 가능 → 실제 광고 로드
      try {
        const aitAd = (window as any).ait.ad;
        aitAd.loadRewardedAd({
          unitId: AD_CONFIG.REWARDED_AD_UNIT_ID,
          onLoaded: () => {
            setAdStatus('ready');
            callbacksRef.current?.onAdLoaded?.();
          },
          onFailedToLoad: (err: any) => {
            const adError: AdError = {
              code: err?.code || 'AIT_AD_LOAD_FAILED',
              message: err?.message || '광고를 불러오는데 실패했습니다. 다시 시도해주세요.',
            };
            setError(adError);
            setAdStatus('error');
            callbacksRef.current?.onAdFailedToLoad?.(adError);
          },
        });
      } catch (e) {
        const adError: AdError = {
          code: 'AIT_SDK_ERROR',
          message: '광고 SDK 호출 중 오류가 발생했습니다.',
        };
        setError(adError);
        setAdStatus('error');
        callbacksRef.current?.onAdFailedToLoad?.(adError);
      }
    } else {
      // AIT SDK 미사용 환경 (로컬 개발 등) → 폴백 시뮬레이션
      const loadTime = 1000 + Math.random() * 1000;
      adTimerRef.current = setTimeout(() => {
        setAdStatus('ready');
        callbacksRef.current?.onAdLoaded?.();
      }, loadTime);
    }
  }, []);

  // 광고 표시
  const showAd = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      if (adStatus !== 'ready') {
        resolve(false);
        return;
      }

      setAdStatus('showing');
      callbacksRef.current?.onAdOpened?.();

      if (USE_MOCK_AD) {
        // Mock 모드: MIN_WATCH_TIME 후 자동 보상
        adTimerRef.current = setTimeout(() => {
          setIsRewarded(true);
          setAdStatus('completed');
          callbacksRef.current?.onRewarded?.();
          callbacksRef.current?.onAdClosed?.();
          resolve(true);
        }, AD_CONFIG.MIN_WATCH_TIME);
      } else if (isAITAvailable()) {
        // AIT SDK → 실제 광고 표시
        try {
          const aitAd = (window as any).ait.ad;
          aitAd.showRewardedAd({
            unitId: AD_CONFIG.REWARDED_AD_UNIT_ID,
            onRewarded: () => {
              setIsRewarded(true);
              setAdStatus('completed');
              callbacksRef.current?.onRewarded?.();
            },
            onClosed: () => {
              callbacksRef.current?.onAdClosed?.();
              resolve(true);
            },
            onError: (err: any) => {
              const adError: AdError = {
                code: err?.code || 'AIT_AD_SHOW_FAILED',
                message: err?.message || '광고 표시 중 오류가 발생했습니다.',
              };
              setError(adError);
              setAdStatus('error');
              resolve(false);
            },
          });
        } catch (e) {
          setAdStatus('error');
          resolve(false);
        }
      } else {
        // 폴백: 타이머 기반 시뮬레이션 (로컬 개발)
        adTimerRef.current = setTimeout(() => {
          setIsRewarded(true);
          setAdStatus('completed');
          callbacksRef.current?.onRewarded?.();
          callbacksRef.current?.onAdClosed?.();
          resolve(true);
        }, AD_CONFIG.MIN_WATCH_TIME);
      }
    });
  }, [adStatus]);

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
