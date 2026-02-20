import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { ScreenContainer, SelectCard, Button } from '../components';
import { useUserInputStore, budgetOptions } from '../store/userInput';
import { colors, typography, spacing } from '../styles/theme';
const BudgetSelectScreen = () => {
    const navigate = useNavigate();
    const { budget, setBudget, isStepValid } = useUserInputStore();
    const handleShowResult = () => {
        if (isStepValid(4)) {
            navigate('/result');
        }
    };
    const handleBack = () => {
        navigate(-1);
    };
    return (_jsxs(ScreenContainer, { currentStep: 4, footer: _jsxs("div", { style: { display: 'flex', flexDirection: 'row', gap: spacing.md }, children: [_jsx(Button, { label: "\uC774\uC804", onPress: handleBack, variant: "outline", size: "large", style: { flex: 1 } }), _jsx(Button, { label: "\uACB0\uACFC \uBCF4\uAE30", onPress: handleShowResult, variant: "primary", size: "large", disabled: !isStepValid(4), style: { flex: 2 } })] }), children: [_jsxs("div", { style: { marginBottom: spacing.xxl }, children: [_jsx("div", { style: { fontSize: typography.fontSize.caption, fontWeight: typography.fontWeight.medium, color: colors.primary, marginBottom: spacing.sm }, children: "STEP 4 / 4" }), _jsx("div", { style: { fontSize: typography.fontSize.h2, fontWeight: typography.fontWeight.bold, color: colors.gray900, marginBottom: spacing.sm }, children: "\uC608\uC0B0\uC740 \uC5B4\uB290 \uC815\uB3C4\uC778\uAC00\uC694?" }), _jsx("div", { style: { fontSize: typography.fontSize.body2, color: colors.gray600, lineHeight: 1.5 }, children: "\uAD6C\uB9E4 \uAC00\uB2A5\uD55C \uC608\uC0B0 \uBC94\uC704\uB97C \uC120\uD0DD\uD574\uC8FC\uC138\uC694" })] }), _jsx("div", { style: { marginTop: spacing.lg }, children: budgetOptions.map((option) => (_jsx(SelectCard, { label: option.label, emoji: option.emoji, selected: budget === option.value, onPress: () => setBudget(option.value), size: "large" }, option.value))) }), _jsxs("div", { style: { display: 'flex', flexDirection: 'row', backgroundColor: colors.gray50, borderRadius: spacing.md, padding: spacing.lg, marginTop: spacing.xl }, children: [_jsx("span", { style: { fontSize: 16, marginRight: spacing.sm }, children: "\uD83D\uDCCC" }), _jsx("div", { style: { flex: 1, fontSize: typography.fontSize.caption, color: colors.gray600, lineHeight: 1.75 }, children: "\uC608\uC0B0\uC5D0 \uB530\uB77C \uAD6D\uB0B4\uCC28/\uC678\uC81C\uCC28, \uC2E0\uCC28/\uC911\uACE0\uCC28 \uB4F1 \uB2E4\uC591\uD55C \uC635\uC158\uC744 \uC0B4\uD3B4\uBCFC \uC218 \uC788\uC5B4\uC694." })] })] }));
};
export default BudgetSelectScreen;
