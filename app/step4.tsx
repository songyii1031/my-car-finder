import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenContainer, SelectCard, Button } from '../components';
import RewardedAdModal from '../components/RewardedAdModal';
import { useUserInputStore, budgetOptions, Budget } from '../store/userInput';
import { useRewardedAd } from '../hooks/useRewardedAd';
import { colors, typography, spacing } from '../styles/theme';

const BudgetSelectScreen: React.FC = () => {
  const navigate = useNavigate();
  const { budget, setBudget, isStepValid } = useUserInputStore();
  const [showAdModal, setShowAdModal] = useState(false);

  // 보상형 광고 훅
  const {
    adStatus,
    isAdReady,
    error,
    loadAd,
    resetAd,
  } = useRewardedAd({
    onAdLoaded: () => {
      console.log('광고 로드 완료');
    },
    onRewarded: () => {
      console.log('광고 시청 완료 - 보상 지급');
    },
    onAdSkipped: () => {
      console.log('광고 스킵됨');
    },
  });

  // 컴포넌트 마운트 시 광고 미리 로드
  useEffect(() => {
    loadAd();
  }, [loadAd]);

  // 광고 로드 에러 시 자동 재시도
  useEffect(() => {
    if (adStatus === 'error') {
      const retryTimer = setTimeout(() => {
        resetAd();
        loadAd();
      }, 2000);
      return () => clearTimeout(retryTimer);
    }
  }, [adStatus, resetAd, loadAd]);

  // 광고 보고 결과보기 버튼 클릭
  const handleShowAdAndResult = () => {
    if (!isStepValid(4)) return;

    if (isAdReady) {
      // 광고 준비 완료 → 광고 모달 표시
      setShowAdModal(true);
    } else {
      // 광고가 아직 로딩 중이거나 에러인 경우 → 바로 결과로 이동
      navigate('/result');
    }
  };

  // 광고 시청 완료 후 결과 페이지로 이동
  const handleAdRewarded = () => {
    setShowAdModal(false);
    navigate('/result');
  };

  // 광고 스킵 (결과 페이지로 이동하지 않음)
  const handleAdSkip = () => {
    setShowAdModal(false);
    // 광고 다시 로드
    resetAd();
    loadAd();
  };

  // 광고 모달 닫기
  const handleAdClose = () => {
    setShowAdModal(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // 버튼 라벨 결정
  const getButtonLabel = () => {
    if (adStatus === 'loading') return '준비 중...';
    if (adStatus === 'error') return '결과 보기';
    if (isAdReady) return '🎬 광고보고 결과보기';
    return '결과 보기';
  };

  return (
    <>
      <ScreenContainer
        currentStep={4}
        footer={
          <div style={{ display: 'flex', flexDirection: 'row', gap: spacing.md }}>
            <Button
              label="이전"
              onPress={handleBack}
              variant="outline"
              size="large"
              style={{ flex: 1 }}
            />
            <Button
              label={getButtonLabel()}
              onPress={handleShowAdAndResult}
              variant="primary"
              size="large"
              disabled={!isStepValid(4)}
              style={{ flex: 2 }}
            />
          </div>
        }
      >
        <div style={{ marginBottom: spacing.xxl }}>
          <div style={{ fontSize: typography.fontSize.caption, fontWeight: typography.fontWeight.medium, color: colors.primary, marginBottom: spacing.sm }}>
            STEP 4 / 4
          </div>
          <div style={{ fontSize: typography.fontSize.h2, fontWeight: typography.fontWeight.bold, color: colors.gray900, marginBottom: spacing.sm }}>
            예산은 어느 정도인가요?
          </div>
          <div style={{ fontSize: typography.fontSize.body2, color: colors.gray600, lineHeight: 1.5 }}>
            구매 가능한 예산 범위를 선택해주세요
          </div>
        </div>

        <div style={{ marginTop: spacing.lg }}>
          {budgetOptions.map((option) => (
            <SelectCard
              key={option.value}
              label={option.label}
              emoji={option.emoji}
              selected={budget === option.value}
              onPress={() => setBudget(option.value)}
              size="large"
            />
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: colors.gray50, borderRadius: spacing.md, padding: spacing.lg, marginTop: spacing.xl }}>
          <span style={{ fontSize: 16, marginRight: spacing.sm }}>📌</span>
          <div style={{ flex: 1, fontSize: typography.fontSize.caption, color: colors.gray600, lineHeight: 1.75 }}>
            예산에 따라 국내차/외제차, 신차/중고차 등 다양한 옵션을 살펴볼 수 있어요.
          </div>
        </div>

        {/* 광고 안내 */}
        {isAdReady && (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary + '10', 
            borderRadius: spacing.md, 
            padding: spacing.md, 
            marginTop: spacing.lg 
          }}>
            <span style={{ fontSize: 14, marginRight: spacing.sm }}>🎬</span>
            <div style={{ fontSize: typography.fontSize.small, color: colors.primary }}>
              짧은 광고 시청 후 결과를 확인할 수 있어요
            </div>
          </div>
        )}
      </ScreenContainer>

      {/* 보상형 광고 모달 */}
      <RewardedAdModal
        isVisible={showAdModal}
        onClose={handleAdClose}
        onRewarded={handleAdRewarded}
        onSkip={handleAdSkip}
      />
    </>
  );
};

export default BudgetSelectScreen;
