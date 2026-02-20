/**
 * RewardedAdModal.tsx
 * 보상형 광고 모달 컴포넌트
 * 광고 시청 중 표시되는 전체화면 모달
 */

import React, { useEffect, useState } from 'react';
import { colors, typography, spacing, borderRadius } from '../styles/theme';
import { AD_CONFIG } from '../config/adConfig';

interface RewardedAdModalProps {
  isVisible: boolean;
  onClose: () => void;
  onRewarded: () => void;
  onSkip?: () => void;
}

const RewardedAdModal: React.FC<RewardedAdModalProps> = ({
  isVisible,
  onClose,
  onRewarded,
  onSkip,
}) => {
  const [countdown, setCountdown] = useState(AD_CONFIG.SKIP_DELAY / 1000);
  const [canSkip, setCanSkip] = useState(false);
  const [adProgress, setAdProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCountdown(AD_CONFIG.SKIP_DELAY / 1000);
      setCanSkip(false);
      setAdProgress(0);
      return;
    }

    // 카운트다운 타이머
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanSkip(true);
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 광고 진행률 타이머
    const progressInterval = setInterval(() => {
      setAdProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + (100 / (AD_CONFIG.MIN_WATCH_TIME / 100));
      });
    }, 100);

    // 광고 완료 타이머
    const rewardTimer = setTimeout(() => {
      onRewarded();
      onClose();
    }, AD_CONFIG.MIN_WATCH_TIME);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(progressInterval);
      clearTimeout(rewardTimer);
    };
  }, [isVisible, onRewarded, onClose]);

  if (!isVisible) return null;

  const handleSkip = () => {
    if (canSkip && onSkip) {
      onSkip();
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    }}>
      {/* 스킵 버튼 */}
      <div style={{
        position: 'absolute',
        top: spacing.xl,
        right: spacing.xl,
      }}>
        {canSkip ? (
          <button
            onClick={handleSkip}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              borderRadius: borderRadius.md,
              padding: `${spacing.sm}px ${spacing.lg}px`,
              color: colors.white,
              fontSize: typography.fontSize.caption,
              cursor: 'pointer',
            }}
          >
            건너뛰기 ✕
          </button>
        ) : (
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: borderRadius.md,
            padding: `${spacing.sm}px ${spacing.lg}px`,
            color: colors.white,
            fontSize: typography.fontSize.caption,
          }}>
            {countdown}초 후 건너뛰기
          </div>
        )}
      </div>

      {/* 광고 콘텐츠 영역 */}
      <div style={{
        width: '90%',
        maxWidth: 400,
        backgroundColor: colors.white,
        borderRadius: borderRadius.xl,
        padding: spacing.xxl,
        textAlign: 'center',
      }}>
        {/* 광고 라벨 */}
        <div style={{
          fontSize: typography.fontSize.small,
          color: colors.gray500,
          marginBottom: spacing.lg,
        }}>
          광고
        </div>

        {/* 광고 이미지/콘텐츠 영역 (실제 광고로 대체됨) */}
        <div style={{
          width: '100%',
          height: 200,
          backgroundColor: colors.gray100,
          borderRadius: borderRadius.lg,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: spacing.xl,
        }}>
          <span style={{ fontSize: 48, marginBottom: spacing.md }}>🚗</span>
          <div style={{
            fontSize: typography.fontSize.body1,
            fontWeight: typography.fontWeight.semibold,
            color: colors.gray700,
          }}>
            광고 영역
          </div>
          <div style={{
            fontSize: typography.fontSize.caption,
            color: colors.gray500,
            marginTop: spacing.sm,
          }}>
            실제 광고가 여기에 표시됩니다
          </div>
        </div>

        {/* 진행률 바 */}
        <div style={{
          width: '100%',
          height: 4,
          backgroundColor: colors.gray200,
          borderRadius: 2,
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${adProgress}%`,
            height: '100%',
            backgroundColor: colors.primary,
            transition: 'width 0.1s linear',
          }} />
        </div>

        {/* 안내 텍스트 */}
        <div style={{
          fontSize: typography.fontSize.caption,
          color: colors.gray600,
          marginTop: spacing.lg,
        }}>
          광고 시청 완료 시 결과를 확인할 수 있어요
        </div>
      </div>
    </div>
  );
};

export default RewardedAdModal;
