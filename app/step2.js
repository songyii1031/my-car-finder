import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { ScreenContainer, SelectCard, Button } from '../components';
import { useUserInputStore, bodySizeOptions } from '../store/userInput';
import { colors, typography, spacing } from '../styles/theme';
const BodySizeSelectScreen = () => {
    const navigate = useNavigate();
    const { bodySize, setBodySize, isStepValid } = useUserInputStore();
    const handleNext = () => {
        if (isStepValid(2)) {
            navigate('/step3');
        }
    };
    const handleBack = () => {
        navigate(-1);
    };
    return (_jsxs(ScreenContainer, { currentStep: 2, footer: _jsxs("div", { style: { display: 'flex', flexDirection: 'row', gap: spacing.md }, children: [_jsx(Button, { label: "\uC774\uC804", onPress: handleBack, variant: "outline", size: "large", style: { flex: 1 } }), _jsx(Button, { label: "\uB2E4\uC74C", onPress: handleNext, variant: "primary", size: "large", disabled: !isStepValid(2), style: { flex: 2 } })] }), children: [_jsxs("div", { style: { marginBottom: spacing.xxl }, children: [_jsx("div", { style: { fontSize: typography.fontSize.caption, fontWeight: typography.fontWeight.medium, color: colors.primary, marginBottom: spacing.sm }, children: "STEP 2 / 4" }), _jsx("div", { style: { fontSize: typography.fontSize.h2, fontWeight: typography.fontWeight.bold, color: colors.gray900, marginBottom: spacing.sm }, children: "\uD0A4\uB97C \uC54C\uB824\uC8FC\uC138\uC694" }), _jsx("div", { style: { fontSize: typography.fontSize.body2, color: colors.gray600, lineHeight: 1.5 }, children: "\uCCB4\uD615\uC5D0 \uB9DE\uB294 \uCC28\uB7C9\uC744 \uCC3E\uC544\uBCFC\uAC8C\uC694" })] }), _jsx("div", { style: { marginTop: spacing.lg }, children: bodySizeOptions.map((option) => (_jsx(SelectCard, { label: option.label, description: option.description, selected: bodySize === option.value, onPress: () => setBodySize(option.value), size: "large" }, option.value))) }), _jsxs("div", { style: { display: 'flex', flexDirection: 'row', backgroundColor: colors.gray50, borderRadius: spacing.md, padding: spacing.lg, marginTop: spacing.xl }, children: [_jsx("span", { style: { fontSize: 16, marginRight: spacing.sm }, children: "\uD83D\uDCA1" }), _jsx("div", { style: { flex: 1, fontSize: typography.fontSize.caption, color: colors.gray600, lineHeight: 1.75 }, children: "\uCCB4\uD615\uC5D0 \uB530\uB77C \uC2DC\uD2B8 \uD3EC\uC9C0\uC158, \uC2DC\uC57C \uD655\uBCF4 \uB4F1\uC774 \uB2EC\uB77C\uC838\uC694. \uD3B8\uC548\uD55C \uC6B4\uC804\uC744 \uC704\uD55C \uCC28\uB7C9 \uD06C\uAE30\uB97C \uC54C\uC544\uBCFC\uAC8C\uC694." })] })] }));
};
export default BodySizeSelectScreen;
