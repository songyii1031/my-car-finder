import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { ScreenContainer, SelectCard, Button } from '../components';
import { useUserInputStore, preferenceOptions } from '../store/userInput';
import { colors, typography, spacing } from '../styles/theme';
const PreferenceSelectScreen = () => {
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
    return (_jsxs(ScreenContainer, { currentStep: 3, footer: _jsxs("div", { style: { display: 'flex', flexDirection: 'row', gap: spacing.md }, children: [_jsx(Button, { label: "\uC774\uC804", onPress: handleBack, variant: "outline", size: "large", style: { flex: 1 } }), _jsx(Button, { label: "\uB2E4\uC74C", onPress: handleNext, variant: "primary", size: "large", disabled: !isStepValid(3), style: { flex: 2 } })] }), children: [_jsxs("div", { style: { marginBottom: spacing.lg }, children: [_jsx("div", { style: { fontSize: typography.fontSize.caption, fontWeight: typography.fontWeight.medium, color: colors.primary, marginBottom: spacing.sm }, children: "STEP 3 / 4" }), _jsx("div", { style: { fontSize: typography.fontSize.h2, fontWeight: typography.fontWeight.bold, color: colors.gray900, marginBottom: spacing.sm }, children: "\uC6B4\uC804 \uC2A4\uD0C0\uC77C\uC774 \uC5B4\uB5BB\uAC8C \uB418\uC138\uC694?" }), _jsx("div", { style: { fontSize: typography.fontSize.body2, color: colors.gray600, lineHeight: 1.5 }, children: "\uBCF8\uC778\uC5D0\uAC8C \uD574\uB2F9\uB418\uB294 \uD56D\uBAA9\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694" })] }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg, padding: `${spacing.sm}px ${spacing.md}px`, backgroundColor: colors.gray50, borderRadius: spacing.sm }, children: [_jsxs("span", { style: { fontSize: typography.fontSize.body2, color: colors.gray700 }, children: [_jsx("span", { style: { color: colors.primary, fontWeight: typography.fontWeight.bold }, children: preferences.length }), ' ', "/", ' ', maxSelections, " \uC120\uD0DD"] }), _jsx("span", { style: { fontSize: typography.fontSize.caption, color: colors.gray500 }, children: "\uCD5C\uB300 2\uAC1C\uAE4C\uC9C0 \uC120\uD0DD \uAC00\uB2A5" })] }), _jsx("div", { children: preferenceOptions.map((option) => {
                    const isSelected = preferences.includes(option.value);
                    const isDisabled = !isSelected && preferences.length >= maxSelections;
                    return (_jsx(SelectCard, { label: option.label, emoji: option.emoji, selected: isSelected, onPress: () => togglePreference(option.value), multiSelect: true, disabled: isDisabled, size: "medium" }, option.value));
                }) })] }));
};
export default PreferenceSelectScreen;
