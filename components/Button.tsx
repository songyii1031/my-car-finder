import React from 'react';
import { colors, typography, spacing, borderRadius } from '../styles/theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const getVariantStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: disabled ? colors.gray300 : colors.primary };
      case 'secondary':
        return { backgroundColor: disabled ? colors.gray200 : colors.gray100 };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          border: `1.5px solid ${disabled ? colors.gray300 : colors.primary}`,
        };
      case 'text':
        return { backgroundColor: 'transparent' };
      default:
        return {};
    }
  };

  const getVariantTextStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return { color: colors.white };
      case 'secondary':
        return { color: disabled ? colors.gray500 : colors.gray900 };
      case 'outline':
        return { color: disabled ? colors.gray400 : colors.primary };
      case 'text':
        return { color: disabled ? colors.gray400 : colors.primary };
      default:
        return {};
    }
  };

  const getSizeStyle = (): React.CSSProperties => {
    switch (size) {
      case 'small':
        return { padding: `${spacing.sm}px ${spacing.md}px` };
      case 'medium':
        return { padding: `${spacing.md}px ${spacing.lg}px` };
      case 'large':
        return { padding: `${spacing.lg}px ${spacing.xl}px` };
      default:
        return {};
    }
  };

  const getSizeFontStyle = (): React.CSSProperties => {
    switch (size) {
      case 'small':
        return { fontSize: typography.fontSize.body3 };
      case 'medium':
        return { fontSize: typography.fontSize.body2 };
      case 'large':
        return { fontSize: typography.fontSize.body1 };
      default:
        return {};
    }
  };

  const buttonStyle: React.CSSProperties = {
    borderRadius: borderRadius.md,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    border: 'none',
    outline: 'none',
    width: fullWidth ? '100%' : undefined,
    opacity: disabled || loading ? 0.7 : 1,
    fontFamily: 'inherit',
    transition: 'opacity 0.15s ease',
    ...getVariantStyle(),
    ...getSizeStyle(),
    ...style,
  };

  const labelStyle: React.CSSProperties = {
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'center',
    ...getVariantTextStyle(),
    ...getSizeFontStyle(),
    ...textStyle,
  };

  return (
    <button
      style={buttonStyle}
      onClick={!disabled && !loading ? onPress : undefined}
      disabled={disabled || loading}
    >
      {loading ? (
        <span style={{ color: variant === 'primary' ? colors.white : colors.primary }}>•••</span>
      ) : (
        <span style={labelStyle}>{label}</span>
      )}
    </button>
  );
};

export default Button;
