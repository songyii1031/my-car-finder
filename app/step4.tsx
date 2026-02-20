import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenContainer, SelectCard, Button } from '../components';
import { useUserInputStore, budgetOptions, Budget } from '../store/userInput';
import { colors, typography, spacing } from '../styles/theme';

const BudgetSelectScreen: React.FC = () => {
  const navigate = useNavigate();
  const { budget, setBudget, isStepValid } = useUserInputStore();

  const handleShowResult = () => {
    if (isStepValid(4)) {
      navigate('/result');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
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
            label="결과 보기"
            onPress={handleShowResult}
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
    </ScreenContainer>
  );
};

export default BudgetSelectScreen;
