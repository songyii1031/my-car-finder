import React from 'react';
import { colors, typography, spacing, borderRadius } from '../styles/theme';

interface SelectCardProps {
  label: string;
  description?: string;
  emoji?: string;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
  multiSelect?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const SelectCard: React.FC<SelectCardProps> = ({
  label,
  description,
  emoji,
  selected,
  onPress,
  disabled = false,
  multiSelect = false,
  size = 'medium',
}) => {
  const paddingSize = {
    small: spacing.md,
    medium: spacing.lg,
    large: spacing.xl,
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    border: `2px solid ${selected ? colors.primary : colors.gray200}`,
    marginBottom: spacing.md,
    padding: paddingSize[size],
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    transition: 'border-color 0.15s ease',
    userSelect: 'none',
  };

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  };

  const emojiContainerStyle: React.CSSProperties = {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.gray100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    flexShrink: 0,
  };

  const textContainerStyle: React.CSSProperties = {
    flex: 1,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: typography.fontSize.body1,
    fontWeight: typography.fontWeight.semibold,
    color: selected ? colors.primary : (disabled ? colors.gray500 : colors.gray900),
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: typography.fontSize.caption,
    color: selected ? colors.gray700 : (disabled ? colors.gray400 : colors.gray600),
    marginTop: spacing.xs,
  };

  const checkboxStyle: React.CSSProperties = {
    width: 24,
    height: 24,
    borderRadius: borderRadius.sm,
    border: `2px solid ${selected ? colors.primary : colors.gray300}`,
    backgroundColor: selected ? colors.primary : 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
    flexShrink: 0,
  };

  const radioStyle: React.CSSProperties = {
    width: 24,
    height: 24,
    borderRadius: '50%',
    border: `2px solid ${selected ? colors.primary : colors.gray300}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
    flexShrink: 0,
  };

  const radioDotStyle: React.CSSProperties = {
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: colors.primary,
  };

  return (
    <div
      style={containerStyle}
      onClick={disabled ? undefined : onPress}
    >
      <div style={contentStyle}>
        {emoji && (
          <div style={emojiContainerStyle}>
            <span style={{ fontSize: 24 }}>{emoji}</span>
          </div>
        )}
        <div style={textContainerStyle}>
          <div style={labelStyle}>{label}</div>
          {description && (
            <div style={descriptionStyle}>{description}</div>
          )}
        </div>
        {multiSelect ? (
          <div style={checkboxStyle}>
            {selected && (
              <span style={{ color: colors.white, fontSize: 14, fontWeight: '700' }}>✓</span>
            )}
          </div>
        ) : (
          <div style={radioStyle}>
            {selected && <div style={radioDotStyle} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectCard;
