import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenContainer, CarResultCard, Button } from '../components';
import { useUserInputStore } from '../store/userInput';
import { recommendCars, getAdditionalAdvice, generateShareText } from '../utils/recommend';
import type { UserInput as RecommendInput } from '../utils/recommend';
import { colors, typography, spacing, borderRadius } from '../styles/theme';

const ResultScreen: React.FC = () => {
  const navigate = useNavigate();
  const { gender, bodySize, preferences, budget, reset } = useUserInputStore();

  const recommendations = useMemo(() => {
    if (!gender || !bodySize || !budget || preferences.length === 0) {
      return [];
    }
    const input: RecommendInput = { gender, bodySize, preferences, budget };
    return recommendCars(input);
  }, [gender, bodySize, preferences, budget]);

  const advice = useMemo(() => {
    if (!gender || !bodySize || !budget) {
      return [];
    }
    return getAdditionalAdvice({ gender, bodySize, preferences, budget });
  }, [gender, bodySize, preferences, budget]);

  const handleRestart = () => {
    reset();
    navigate('/');
  };

  const handleShare = async () => {
    const shareText = generateShareText(recommendations);
    if (navigator.share) {
      try {
        await navigator.share({ title: '차BTI 결과', text: shareText });
      } catch {
        // 사용자가 취소한 경우 등
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      alert('결과가 클립보드에 복사되었어요!');
    }
  };

  if (!gender || !bodySize || !budget || preferences.length === 0) {
    return (
      <ScreenContainer scrollable={false}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: `0 ${spacing.xxl}px`, minHeight: '60vh' }}>
          <span style={{ fontSize: 64, marginBottom: spacing.xl }}>🚗</span>
          <div style={{ fontSize: typography.fontSize.h3, fontWeight: typography.fontWeight.bold, color: colors.gray900, marginBottom: spacing.sm }}>
            정보가 부족해요
          </div>
          <div style={{ fontSize: typography.fontSize.body2, color: colors.gray600, textAlign: 'center', marginBottom: spacing.xxl, lineHeight: 1.75 }}>
            모든 단계를 완료해야 결과를 확인할 수 있어요.
          </div>
          <Button
            label="처음부터 시작하기"
            onPress={handleRestart}
            variant="primary"
            size="large"
          />
        </div>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer
      footer={
        <div style={{ display: 'flex', flexDirection: 'row', gap: spacing.md }}>
          <Button
            label="다시 테스트하기"
            onPress={handleRestart}
            variant="outline"
            size="large"
            style={{ flex: 1 }}
          />
          <Button
            label="공유하기"
            onPress={handleShare}
            variant="primary"
            size="large"
            style={{ flex: 1 }}
          />
        </div>
      }
    >
      {/* 헤더 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: spacing.xxl, paddingTop: spacing.lg }}>
        <span style={{ fontSize: 48, marginBottom: spacing.md }}>🎉</span>
        <div style={{ fontSize: typography.fontSize.h2, fontWeight: typography.fontWeight.bold, color: colors.gray900, marginBottom: spacing.sm, textAlign: 'center' }}>
          결과가 나왔어요!
        </div>
        <div style={{ fontSize: typography.fontSize.body2, color: colors.gray600, textAlign: 'center' }}>
          당신에게 딱 맞는 차를 찾아봤어요
        </div>
      </div>

      {/* 매칭 결과 카드 */}
      <div style={{ marginBottom: spacing.xxl }}>
        <div style={{ fontSize: typography.fontSize.body1, fontWeight: typography.fontWeight.semibold, color: colors.gray900, marginBottom: spacing.lg }}>
          어울리는 차종 ({recommendations.length}개)
        </div>
        {recommendations.map((recommendation, index) => (
          <CarResultCard
            key={`${recommendation.category}-${index}`}
            recommendation={recommendation}
            rank={index + 1}
          />
        ))}
      </div>

      {/* 추가 팁 */}
      {advice.length > 0 && (
        <div style={{ backgroundColor: colors.gray50, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.xxl }}>
          <div style={{ fontSize: typography.fontSize.body1, fontWeight: typography.fontWeight.semibold, color: colors.gray900, marginBottom: spacing.lg }}>
            💡 추가 팁
          </div>
          {advice.map((item, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'row', marginBottom: spacing.sm }}>
              <span style={{ fontSize: typography.fontSize.body3, color: colors.primary, marginRight: spacing.sm }}>•</span>
              <div style={{ flex: 1, fontSize: typography.fontSize.body3, color: colors.gray700, lineHeight: 1.75 }}>{item}</div>
            </div>
          ))}
        </div>
      )}

      {/* 면책 문구 */}
      <div style={{ backgroundColor: colors.gray100, borderRadius: borderRadius.md, padding: spacing.lg, marginBottom: spacing.md }}>
        <div style={{ fontSize: typography.fontSize.caption, color: colors.gray600, textAlign: 'center', lineHeight: 1.75 }}>
          ⚠️ 본 결과는 일반적인 정보 제공 목적이며, 특정 브랜드/제조사와 제휴 관계가 없습니다.
          실제 구매 시 전문가 상담 및 시승을 권장합니다.
        </div>
      </div>
    </ScreenContainer>
  );
};

export default ResultScreen;
