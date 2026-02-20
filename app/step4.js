import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenContainer, SelectCard, Button } from '../components';
import RewardedAdModal from '../components/RewardedAdModal';
import { useUserInputStore, budgetOptions } from '../store/userInput';
import { useRewardedAd } from '../hooks/useRewardedAd';
import { colors, typography, spacing } from '../styles/theme';
const BudgetSelectScreen = () => {
    const navigate = useNavigate();
    const { budget, setBudget, isStepValid } = useUserInputStore();
    const [showAdModal, setShowAdModal] = useState(false);
    // 보상형 광고 훅
    const { adStatus, isAdReady, loadAd, resetAd, } = useRewardedAd({
        onAdLoaded: () => {
            console.log('광고 로드 완료');
        },
        onRewarded: () => {
            console.log('광고 시청 완료 - 보상 지급');
        },
        onAdSkipped: () => {
            console.log('광고 스킵됨');
        },
    });
    // 컴포넌트 마운트 시 광고 미리 로드
    useEffect(() => {
        loadAd();
    }, [loadAd]);
    // 광고 보고 결과보기 버튼 클릭
    const handleShowAdAndResult = () => {
        if (isStepValid(4)) {
            setShowAdModal(true);
        }
    };
    // 광고 시청 완료 후 결과 페이지로 이동
    const handleAdRewarded = () => {
        setShowAdModal(false);
        navigate('/result');
    };
    // 광고 스킵 (결과 페이지로 이동하지 않음)
    const handleAdSkip = () => {
        setShowAdModal(false);
        // 광고 다시 로드
        resetAd();
        loadAd();
    };
    // 광고 모달 닫기
    const handleAdClose = () => {
        setShowAdModal(false);
    };
    const handleBack = () => {
        navigate(-1);
    };
    // 버튼 라벨 결정
    const getButtonLabel = () => {
        if (adStatus === 'loading')
            return '광고 로딩 중...';
        return '🎬 광고보고 결과보기';
    };
    return (_jsxs(_Fragment, { children: [_jsxs(ScreenContainer, { currentStep: 4, footer: _jsxs("div", { style: { display: 'flex', flexDirection: 'row', gap: spacing.md }, children: [_jsx(Button, { label: "\uC774\uC804", onPress: handleBack, variant: "outline", size: "large", style: { flex: 1 } }), _jsx(Button, { label: getButtonLabel(), onPress: handleShowAdAndResult, variant: "primary", size: "large", disabled: !isStepValid(4) || adStatus === 'loading', style: { flex: 2 } })] }), children: [_jsxs("div", { style: { marginBottom: spacing.xxl }, children: [_jsx("div", { style: { fontSize: typography.fontSize.caption, fontWeight: typography.fontWeight.medium, color: colors.primary, marginBottom: spacing.sm }, children: "STEP 4 / 4" }), _jsx("div", { style: { fontSize: typography.fontSize.h2, fontWeight: typography.fontWeight.bold, color: colors.gray900, marginBottom: spacing.sm }, children: "\uC608\uC0B0\uC740 \uC5B4\uB290 \uC815\uB3C4\uC778\uAC00\uC694?" }), _jsx("div", { style: { fontSize: typography.fontSize.body2, color: colors.gray600, lineHeight: 1.5 }, children: "\uAD6C\uB9E4 \uAC00\uB2A5\uD55C \uC608\uC0B0 \uBC94\uC704\uB97C \uC120\uD0DD\uD574\uC8FC\uC138\uC694" })] }), _jsx("div", { style: { marginTop: spacing.lg }, children: budgetOptions.map((option) => (_jsx(SelectCard, { label: option.label, emoji: option.emoji, selected: budget === option.value, onPress: () => setBudget(option.value), size: "large" }, option.value))) }), _jsxs("div", { style: { display: 'flex', flexDirection: 'row', backgroundColor: colors.gray50, borderRadius: spacing.md, padding: spacing.lg, marginTop: spacing.xl }, children: [_jsx("span", { style: { fontSize: 16, marginRight: spacing.sm }, children: "\uD83D\uDCCC" }), _jsx("div", { style: { flex: 1, fontSize: typography.fontSize.caption, color: colors.gray600, lineHeight: 1.75 }, children: "\uC608\uC0B0\uC5D0 \uB530\uB77C \uAD6D\uB0B4\uCC28/\uC678\uC81C\uCC28, \uC2E0\uCC28/\uC911\uACE0\uCC28 \uB4F1 \uB2E4\uC591\uD55C \uC635\uC158\uC744 \uC0B4\uD3B4\uBCFC \uC218 \uC788\uC5B4\uC694." })] }), _jsxs("div", { style: {
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.primary + '10',
                            borderRadius: spacing.md,
                            padding: spacing.md,
                            marginTop: spacing.lg
                        }, children: [_jsx("span", { style: { fontSize: 14, marginRight: spacing.sm }, children: "\uD83C\uDFAC" }), _jsx("div", { style: { fontSize: typography.fontSize.small, color: colors.primary }, children: "\uC9E7\uC740 \uAD11\uACE0 \uC2DC\uCCAD \uD6C4 \uACB0\uACFC\uB97C \uD655\uC778\uD560 \uC218 \uC788\uC5B4\uC694" })] })] }), _jsx(RewardedAdModal, { isVisible: showAdModal, onClose: handleAdClose, onRewarded: handleAdRewarded, onSkip: handleAdSkip })] }));
};
export default BudgetSelectScreen;
