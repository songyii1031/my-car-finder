import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenContainer, CarResultCard, Button } from '../components';
import { useUserInputStore } from '../store/userInput';
import { recommendCars, getAdditionalAdvice, generateShareText } from '../utils/recommend';
import { colors, typography, spacing, borderRadius } from '../styles/theme';
const ResultScreen = () => {
    const navigate = useNavigate();
    const { gender, bodySize, preferences, budget, reset } = useUserInputStore();
    const recommendations = useMemo(() => {
        if (!gender || !bodySize || !budget || preferences.length === 0) {
            return [];
        }
        const input = { gender, bodySize, preferences, budget };
        return recommendCars(input);
    }, [gender, bodySize, preferences, budget]);
    const advice = useMemo(() => {
        if (!gender || !bodySize || !budget) {
            return [];
        }
        return getAdditionalAdvice({ gender, bodySize, preferences, budget });
    }, [gender, bodySize, preferences, budget]);
    const handleRestart = () => {
        reset();
        navigate('/');
    };
    const handleShare = async () => {
        const shareText = generateShareText(recommendations);
        if (navigator.share) {
            try {
                await navigator.share({ title: '내 차를 찾아줘 결과', text: shareText });
            }
            catch {
                // 사용자가 취소한 경우 등
            }
        }
        else {
            await navigator.clipboard.writeText(shareText);
            alert('결과가 클립보드에 복사되었어요!');
        }
    };
    if (!gender || !bodySize || !budget || preferences.length === 0) {
        return (_jsx(ScreenContainer, { scrollable: false, children: _jsxs("div", { style: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: `0 ${spacing.xxl}px`, minHeight: '60vh' }, children: [_jsx("span", { style: { fontSize: 64, marginBottom: spacing.xl }, children: "\uD83D\uDE97" }), _jsx("div", { style: { fontSize: typography.fontSize.h3, fontWeight: typography.fontWeight.bold, color: colors.gray900, marginBottom: spacing.sm }, children: "\uC815\uBCF4\uAC00 \uBD80\uC871\uD574\uC694" }), _jsx("div", { style: { fontSize: typography.fontSize.body2, color: colors.gray600, textAlign: 'center', marginBottom: spacing.xxl, lineHeight: 1.75 }, children: "\uBAA8\uB4E0 \uB2E8\uACC4\uB97C \uC644\uB8CC\uD574\uC57C \uACB0\uACFC\uB97C \uD655\uC778\uD560 \uC218 \uC788\uC5B4\uC694." }), _jsx(Button, { label: "\uCC98\uC74C\uBD80\uD130 \uC2DC\uC791\uD558\uAE30", onPress: handleRestart, variant: "primary", size: "large" })] }) }));
    }
    return (_jsxs(ScreenContainer, { footer: _jsxs("div", { style: { display: 'flex', flexDirection: 'row', gap: spacing.md }, children: [_jsx(Button, { label: "\uB2E4\uC2DC \uD14C\uC2A4\uD2B8\uD558\uAE30", onPress: handleRestart, variant: "outline", size: "large", style: { flex: 1 } }), _jsx(Button, { label: "\uACF5\uC720\uD558\uAE30", onPress: handleShare, variant: "primary", size: "large", style: { flex: 1 } })] }), children: [_jsxs("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: spacing.xxl, paddingTop: spacing.lg }, children: [_jsx("span", { style: { fontSize: 48, marginBottom: spacing.md }, children: "\uD83C\uDF89" }), _jsx("div", { style: { fontSize: typography.fontSize.h2, fontWeight: typography.fontWeight.bold, color: colors.gray900, marginBottom: spacing.sm, textAlign: 'center' }, children: "\uACB0\uACFC\uAC00 \uB098\uC654\uC5B4\uC694!" }), _jsx("div", { style: { fontSize: typography.fontSize.body2, color: colors.gray600, textAlign: 'center' }, children: "\uB2F9\uC2E0\uC5D0\uAC8C \uB531 \uB9DE\uB294 \uCC28\uB97C \uCC3E\uC544\uBD24\uC5B4\uC694" })] }), _jsxs("div", { style: { marginBottom: spacing.xxl }, children: [_jsxs("div", { style: { fontSize: typography.fontSize.body1, fontWeight: typography.fontWeight.semibold, color: colors.gray900, marginBottom: spacing.lg }, children: ["\uC5B4\uC6B8\uB9AC\uB294 \uCC28\uC885 (", recommendations.length, "\uAC1C)"] }), recommendations.map((recommendation, index) => (_jsx(CarResultCard, { recommendation: recommendation, rank: index + 1 }, `${recommendation.category}-${index}`)))] }), advice.length > 0 && (_jsxs("div", { style: { backgroundColor: colors.gray50, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.xxl }, children: [_jsx("div", { style: { fontSize: typography.fontSize.body1, fontWeight: typography.fontWeight.semibold, color: colors.gray900, marginBottom: spacing.lg }, children: "\uD83D\uDCA1 \uCD94\uAC00 \uD301" }), advice.map((item, index) => (_jsxs("div", { style: { display: 'flex', flexDirection: 'row', marginBottom: spacing.sm }, children: [_jsx("span", { style: { fontSize: typography.fontSize.body3, color: colors.primary, marginRight: spacing.sm }, children: "\u2022" }), _jsx("div", { style: { flex: 1, fontSize: typography.fontSize.body3, color: colors.gray700, lineHeight: 1.75 }, children: item })] }, index)))] })), _jsx("div", { style: { backgroundColor: colors.gray100, borderRadius: borderRadius.md, padding: spacing.lg, marginBottom: spacing.md }, children: _jsx("div", { style: { fontSize: typography.fontSize.caption, color: colors.gray600, textAlign: 'center', lineHeight: 1.75 }, children: "\u26A0\uFE0F \uBCF8 \uACB0\uACFC\uB294 \uC77C\uBC18\uC801\uC778 \uC815\uBCF4 \uC81C\uACF5 \uBAA9\uC801\uC774\uBA70, \uD2B9\uC815 \uBE0C\uB79C\uB4DC/\uC81C\uC870\uC0AC\uC640 \uC81C\uD734 \uAD00\uACC4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC2E4\uC81C \uAD6C\uB9E4 \uC2DC \uC804\uBB38\uAC00 \uC0C1\uB2F4 \uBC0F \uC2DC\uC2B9\uC744 \uAD8C\uC7A5\uD569\uB2C8\uB2E4." }) })] }));
};
export default ResultScreen;
