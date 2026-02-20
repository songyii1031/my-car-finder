import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { ScreenContainer, SelectCard, Button } from '../components';
import { useUserInputStore, genderOptions } from '../store/userInput';
import { colors, typography, spacing } from '../styles/theme';
const GenderSelectScreen = () => {
    const navigate = useNavigate();
    const { gender, setGender, isStepValid } = useUserInputStore();
    const handleNext = () => {
        if (isStepValid(1)) {
            navigate('/step2');
        }
    };
    return (_jsxs(ScreenContainer, { currentStep: 1, footer: _jsx(Button, { label: "\uB2E4\uC74C", onPress: handleNext, variant: "primary", size: "large", fullWidth: true, disabled: !isStepValid(1) }), children: [_jsxs("div", { style: { marginBottom: spacing.xxl }, children: [_jsx("div", { style: { fontSize: typography.fontSize.caption, fontWeight: typography.fontWeight.medium, color: colors.primary, marginBottom: spacing.sm }, children: "STEP 1 / 4" }), _jsx("div", { style: { fontSize: typography.fontSize.h2, fontWeight: typography.fontWeight.bold, color: colors.gray900, marginBottom: spacing.sm }, children: "\uC131\uBCC4\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694" }), _jsx("div", { style: { fontSize: typography.fontSize.body2, color: colors.gray600, lineHeight: 1.5 }, children: "\uCC28\uB7C9 \uD0D0\uC0C9\uC5D0 \uCC38\uACE0\uD558\uAE30 \uC704\uD55C \uC815\uBCF4\uC608\uC694" })] }), _jsx("div", { style: { marginTop: spacing.lg }, children: genderOptions.map((option) => (_jsx(SelectCard, { label: option.label, emoji: option.emoji, selected: gender === option.value, onPress: () => setGender(option.value), size: "large" }, option.value))) }), _jsx("div", { style: { fontSize: typography.fontSize.caption, color: colors.gray500, textAlign: 'center', marginTop: spacing.xl }, children: "\uC120\uD0DD\uD558\uC2E0 \uC815\uBCF4\uB294 \uD0D0\uC0C9\uC5D0\uB9CC \uD65C\uC6A9\uB418\uBA70, \uBCC4\uB3C4\uB85C \uC800\uC7A5\uB418\uC9C0 \uC54A\uC544\uC694." })] }));
};
export default GenderSelectScreen;
