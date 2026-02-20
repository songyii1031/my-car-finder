import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenContainer, SelectCard, Button } from '../components';
import { useUserInputStore, bodySizeOptions, BodySize } from '../store/userInput';
import { colors, typography, spacing } from '../styles/theme';

const BodySizeSelectScreen: React.FC = () => {
  const navigate = useNavigate();
  const { bodySize, setBodySize, isStepValid } = useUserInputStore();

  const handleNext = () => {
    if (isStepValid(2)) {
      navigate('/step3');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <ScreenContainer
      currentStep={2}
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
            label="다음"
            onPress={handleNext}
            variant="primary"
            size="large"
            disabled={!isStepValid(2)}
            style={{ flex: 2 }}
          />
        </div>
      }
    >
      <div style={{ marginBottom: spacing.xxl }}>
        <div style={{ fontSize: typography.fontSize.caption, fontWeight: typography.fontWeight.medium, color: colors.primary, marginBottom: spacing.sm }}>
          STEP 2 / 4
        </div>
        <div style={{ fontSize: typography.fontSize.h2, fontWeight: typography.fontWeight.bold, color: colors.gray900, marginBottom: spacing.sm }}>
          키를 알려주세요
        </div>
        <div style={{ fontSize: typography.fontSize.body2, color: colors.gray600, lineHeight: 1.5 }}>
          체형에 맞는 차량을 찾아볼게요
        </div>
      </div>

      <div style={{ marginTop: spacing.lg }}>
        {bodySizeOptions.map((option) => (
          <SelectCard
            key={option.value}
            label={option.label}
            description={option.description}
            selected={bodySize === option.value}
            onPress={() => setBodySize(option.value)}
            size="large"
          />
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: colors.gray50, borderRadius: spacing.md, padding: spacing.lg, marginTop: spacing.xl }}>
        <span style={{ fontSize: 16, marginRight: spacing.sm }}>💡</span>
        <div style={{ flex: 1, fontSize: typography.fontSize.caption, color: colors.gray600, lineHeight: 1.75 }}>
          체형에 따라 시트 포지션, 시야 확보 등이 달라져요. 편안한 운전을 위한 차량 크기를 알아볼게요.
        </div>
      </div>
    </ScreenContainer>
  );
};

export default BodySizeSelectScreen;
