/**
 * useRewardedAd.js
 * 보상형 광고 커스텀 훅
 * 광고 로드, 표시, 보상 처리를 관리합니다.
 *
 * USE_MOCK_AD = true:  타이머 시뮬레이션으로 동작 (개발/테스트)
 * USE_MOCK_AD = false: 실제 AdMob SDK 연동 (TODO: SDK 연동 코드 추가)
 */
import { useState, useCallback, useRef, useEffect } from 'react';
import { AD_CONFIG, USE_MOCK_AD } from '../config/adConfig';

export function useRewardedAd(callbacks) {
    const [adStatus, setAdStatus] = useState('idle');
    const [isRewarded, setIsRewarded] = useState(false);
    const [error, setError] = useState(null);
    const adTimerRef = useRef(null);
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
        } else {
            // TODO: 실제 AdMob SDK 연동
            const loadTime = 1000 + Math.random() * 1000;
            adTimerRef.current = setTimeout(() => {
                if (Math.random() > 0.1) {
                    setAdStatus('ready');
                    callbacksRef.current?.onAdLoaded?.();
                } else {
                    const adError = {
                        code: 'AD_LOAD_FAILED',
                        message: '광고를 불러오는데 실패했습니다. 다시 시도해주세요.',
                    };
                    setError(adError);
                    setAdStatus('error');
                    callbacksRef.current?.onAdFailedToLoad?.(adError);
                }
            }, loadTime);
        }
    }, []);

    // 광고 표시
    const showAd = useCallback(() => {
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
            } else {
                // TODO: 실제 AdMob SDK의 show() 호출
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
