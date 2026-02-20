import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { colors, typography, spacing, borderRadius } from '../styles/theme';
const SelectCard = ({ label, description, emoji, selected, onPress, disabled = false, multiSelect = false, size = 'medium', }) => {
    const paddingSize = {
        small: spacing.md,
        medium: spacing.lg,
        large: spacing.xl,
    };
    const containerStyle = {
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
    const contentStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    };
    const emojiContainerStyle = {
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
    const textContainerStyle = {
        flex: 1,
    };
    const labelStyle = {
        fontSize: typography.fontSize.body1,
        fontWeight: typography.fontWeight.semibold,
        color: selected ? colors.primary : (disabled ? colors.gray500 : colors.gray900),
    };
    const descriptionStyle = {
        fontSize: typography.fontSize.caption,
        color: selected ? colors.gray700 : (disabled ? colors.gray400 : colors.gray600),
        marginTop: spacing.xs,
    };
    const checkboxStyle = {
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
    const radioStyle = {
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
    const radioDotStyle = {
        width: 12,
        height: 12,
        borderRadius: '50%',
        backgroundColor: colors.primary,
    };
    return (_jsx("div", { style: containerStyle, onClick: disabled ? undefined : onPress, children: _jsxs("div", { style: contentStyle, children: [emoji && (_jsx("div", { style: emojiContainerStyle, children: _jsx("span", { style: { fontSize: 24 }, children: emoji }) })), _jsxs("div", { style: textContainerStyle, children: [_jsx("div", { style: labelStyle, children: label }), description && (_jsx("div", { style: descriptionStyle, children: description }))] }), multiSelect ? (_jsx("div", { style: checkboxStyle, children: selected && (_jsx("span", { style: { color: colors.white, fontSize: 14, fontWeight: '700' }, children: "\u2713" })) })) : (_jsx("div", { style: radioStyle, children: selected && _jsx("div", { style: radioDotStyle }) }))] }) }));
};
export default SelectCard;
