import React from 'react';
import { colors, spacing, borderRadius } from '../styles/theme';

interface StepBarProps {
  currentStep: number;
  totalSteps?: number;
}

const StepBar: React.FC<StepBarProps> = ({ currentStep, totalSteps = 4 }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div style={{ padding: `${spacing.md}px ${spacing.lg}px`, backgroundColor: colors.white }}>
      <div style={{ height: 4, backgroundColor: colors.gray200, borderRadius: borderRadius.full, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          backgroundColor: colors.primary,
          borderRadius: borderRadius.full,
          transition: 'width 0.3s ease',
        }} />
      </div>
    </div>
  );
};

export default StepBar;
