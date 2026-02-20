import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenContainer, SelectCard, Button } from '../components';
import { useUserInputStore, preferenceOptions, Preference } from '../store/userInput';
import { colors, typography, spacing } from '../styles/theme';

const PreferenceSelectScreen: React.FC = () => {
  const navigate = useNavigate();
  const { preferences, togglePreference, isStepValid } = useUserInputStore();
  const maxSelections = 2;

  const handleNext = () => {
    if (isStepValid(3)) {
      navigate('/step4');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <ScreenContainer
      currentStep={3}
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
            disabled={!isStepValid(3)}
            style={{ flex: 2 }}
          />
        </div>
      }
    >
      <div style={{ marginBottom: spacing.lg }}>
        <div style={{ fontSize: typography.fontSize.caption, fontWeight: typography.fontWeight.medium, color: colors.primary, marginBottom: spacing.sm }}>
          STEP 3 / 4
        </div>
        <div style={{ fontSize: typography.fontSize.h2, fontWeight: typography.fontWeight.bold, color: colors.gray900, marginBottom: spacing.sm }}>
          운전 스타일이 어떻게 되세요?
        </div>
        <div style={{ fontSize: typography.fontSize.body2, color: colors.gray600, lineHeight: 1.5 }}>
          본인에게 해당되는 항목을 선택해주세요
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg, padding: `${spacing.sm}px ${spacing.md}px`, backgroundColor: colors.gray50, borderRadius: spacing.sm }}>
        <span style={{ fontSize: typography.fontSize.body2, color: colors.gray700 }}>
          <span style={{ color: colors.primary, fontWeight: typography.fontWeight.bold }}>{preferences.length}</span>
          {' '}/{' '}{maxSelections} 선택
        </span>
        <span style={{ fontSize: typography.fontSize.caption, color: colors.gray500 }}>최대 2개까지 선택 가능</span>
      </div>

      <div>
        {preferenceOptions.map((option) => {
          const isSelected = preferences.includes(option.value);
          const isDisabled = !isSelected && preferences.length >= maxSelections;

          return (
            <SelectCard
              key={option.value}
              label={option.label}
              emoji={option.emoji}
              selected={isSelected}
              onPress={() => togglePreference(option.value)}
              multiSelect
              disabled={isDisabled}
              size="medium"
            />
          );
        })}
      </div>
    </ScreenContainer>
  );
};

export default PreferenceSelectScreen;
