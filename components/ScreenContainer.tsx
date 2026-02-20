import React, { ReactNode } from 'react';
import { colors, spacing } from '../styles/theme';
import StepBar from './StepBar';

interface ScreenContainerProps {
  children: ReactNode;
  currentStep?: number;
  totalSteps?: number;
  scrollable?: boolean;
  footer?: ReactNode;
  backgroundColor?: string;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  currentStep,
  totalSteps = 4,
  scrollable = true,
  footer,
  backgroundColor = colors.white,
}) => {
  const showStepBar = currentStep !== undefined && currentStep > 0 && currentStep <= totalSteps;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor }}>
      {showStepBar && (
        <StepBar currentStep={currentStep} totalSteps={totalSteps} />
      )}

      <div style={{
        flex: 1,
        overflowY: scrollable ? 'auto' : 'hidden',
        padding: `${spacing.lg}px`,
        paddingBottom: spacing.xl,
      }}>
        {children}
      </div>

      {footer && (
        <div style={{
          padding: `${spacing.lg}px`,
          backgroundColor: colors.white,
          borderTop: `1px solid ${colors.gray100}`,
          flexShrink: 0,
        }}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default ScreenContainer;
