import { jsx as _jsx } from "react/jsx-runtime";
import { colors, typography, spacing, borderRadius } from '../styles/theme';
const Button = ({ label, onPress, variant = 'primary', size = 'medium', disabled = false, loading = false, fullWidth = false, style, textStyle, }) => {
    const getVariantStyle = () => {
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
    const getVariantTextStyle = () => {
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
    const getSizeStyle = () => {
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
    const getSizeFontStyle = () => {
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
    const buttonStyle = {
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
    const labelStyle = {
        fontWeight: typography.fontWeight.semibold,
        textAlign: 'center',
        ...getVariantTextStyle(),
        ...getSizeFontStyle(),
        ...textStyle,
    };
    return (_jsx("button", { style: buttonStyle, onClick: !disabled && !loading ? onPress : undefined, disabled: disabled || loading, children: loading ? (_jsx("span", { style: { color: variant === 'primary' ? colors.white : colors.primary }, children: "\u2022\u2022\u2022" })) : (_jsx("span", { style: labelStyle, children: label })) }));
};
export default Button;
