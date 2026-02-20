import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenContainer, SelectCard, Button } from '../components';
import { useUserInputStore, genderOptions, Gender } from '../store/userInput';
import { colors, typography, spacing } from '../styles/theme';

const GenderSelectScreen: React.FC = () => {
  const navigate = useNavigate();
  const { gender, setGender, isStepValid } = useUserInputStore();

  const handleNext = () => {
    if (isStepValid(1)) {
      navigate('/step2');
    }
  };

  return (
    <ScreenContainer
      currentStep={1}
      footer={
        <Button
          label="다음"
          onPress={handleNext}
          variant="primary"
          size="large"
          fullWidth
          disabled={!isStepValid(1)}
        />
      }
    >
      <div style={{ marginBottom: spacing.xxl }}>
        <div style={{ fontSize: typography.fontSize.caption, fontWeight: typography.fontWeight.medium, color: colors.primary, marginBottom: spacing.sm }}>
          STEP 1 / 4
        </div>
        <div style={{ fontSize: typography.fontSize.h2, fontWeight: typography.fontWeight.bold, color: colors.gray900, marginBottom: spacing.sm }}>
          성별을 선택해주세요
        </div>
        <div style={{ fontSize: typography.fontSize.body2, color: colors.gray600, lineHeight: 1.5 }}>
          차량 탐색에 참고하기 위한 정보예요
        </div>
      </div>

      <div style={{ marginTop: spacing.lg }}>
        {genderOptions.map((option) => (
          <SelectCard
            key={option.value}
            label={option.label}
            emoji={option.emoji}
            selected={gender === option.value}
            onPress={() => setGender(option.value)}
            size="large"
          />
        ))}
      </div>

      <div style={{ fontSize: typography.fontSize.caption, color: colors.gray500, textAlign: 'center', marginTop: spacing.xl }}>
        선택하신 정보는 탐색에만 활용되며, 별도로 저장되지 않아요.
      </div>
    </ScreenContainer>
  );
};

export default GenderSelectScreen;
