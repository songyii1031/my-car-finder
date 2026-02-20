import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * RewardedAdModal.tsx
 * 보상형 광고 모달 컴포넌트
 * 광고 시청 중 표시되는 전체화면 모달
 */
import { useEffect, useState } from 'react';
import { colors, typography, spacing, borderRadius } from '../styles/theme';
import { AD_CONFIG } from '../config/adConfig';
const RewardedAdModal = ({ isVisible, onClose, onRewarded, onSkip, }) => {
    const [countdown, setCountdown] = useState(AD_CONFIG.SKIP_DELAY / 1000);
    const [canSkip, setCanSkip] = useState(false);
    const [adProgress, setAdProgress] = useState(0);
    useEffect(() => {
        if (!isVisible) {
            setCountdown(AD_CONFIG.SKIP_DELAY / 1000);
            setCanSkip(false);
            setAdProgress(0);
            return;
        }
        // 카운트다운 타이머
        const countdownInterval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    setCanSkip(true);
                    clearInterval(countdownInterval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        // 광고 진행률 타이머
        const progressInterval = setInterval(() => {
            setAdProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + (100 / (AD_CONFIG.MIN_WATCH_TIME / 100));
            });
        }, 100);
        // 광고 완료 타이머
        const rewardTimer = setTimeout(() => {
            onRewarded();
            onClose();
        }, AD_CONFIG.MIN_WATCH_TIME);
        return () => {
            clearInterval(countdownInterval);
            clearInterval(progressInterval);
            clearTimeout(rewardTimer);
        };
    }, [isVisible, onRewarded, onClose]);
    if (!isVisible)
        return null;
    const handleSkip = () => {
        if (canSkip && onSkip) {
            onSkip();
            onClose();
        }
    };
    return (_jsxs("div", { style: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
        }, children: [_jsx("div", { style: {
                    position: 'absolute',
                    top: spacing.xl,
                    right: spacing.xl,
                }, children: canSkip ? (_jsx("button", { onClick: handleSkip, style: {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        borderRadius: borderRadius.md,
                        padding: `${spacing.sm}px ${spacing.lg}px`,
                        color: colors.white,
                        fontSize: typography.fontSize.caption,
                        cursor: 'pointer',
                    }, children: "\uAC74\uB108\uB6F0\uAE30 \u2715" })) : (_jsxs("div", { style: {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: borderRadius.md,
                        padding: `${spacing.sm}px ${spacing.lg}px`,
                        color: colors.white,
                        fontSize: typography.fontSize.caption,
                    }, children: [countdown, "\uCD08 \uD6C4 \uAC74\uB108\uB6F0\uAE30"] })) }), _jsxs("div", { style: {
                    width: '90%',
                    maxWidth: 400,
                    backgroundColor: colors.white,
                    borderRadius: borderRadius.xl,
                    padding: spacing.xxl,
                    textAlign: 'center',
                }, children: [_jsx("div", { style: {
                            fontSize: typography.fontSize.small,
                            color: colors.gray500,
                            marginBottom: spacing.lg,
                        }, children: "\uAD11\uACE0" }), _jsxs("div", { style: {
                            width: '100%',
                            height: 200,
                            backgroundColor: colors.gray100,
                            borderRadius: borderRadius.lg,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: spacing.xl,
                        }, children: [_jsx("span", { style: { fontSize: 48, marginBottom: spacing.md }, children: "\uD83D\uDE97" }), _jsx("div", { style: {
                                    fontSize: typography.fontSize.body1,
                                    fontWeight: typography.fontWeight.semibold,
                                    color: colors.gray700,
                                }, children: "\uAD11\uACE0 \uC601\uC5ED" }), _jsx("div", { style: {
                                    fontSize: typography.fontSize.caption,
                                    color: colors.gray500,
                                    marginTop: spacing.sm,
                                }, children: "\uC2E4\uC81C \uAD11\uACE0\uAC00 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4" })] }), _jsx("div", { style: {
                            width: '100%',
                            height: 4,
                            backgroundColor: colors.gray200,
                            borderRadius: 2,
                            overflow: 'hidden',
                        }, children: _jsx("div", { style: {
                                width: `${adProgress}%`,
                                height: '100%',
                                backgroundColor: colors.primary,
                                transition: 'width 0.1s linear',
                            } }) }), _jsx("div", { style: {
                            fontSize: typography.fontSize.caption,
                            color: colors.gray600,
                            marginTop: spacing.lg,
                        }, children: "\uAD11\uACE0 \uC2DC\uCCAD \uC644\uB8CC \uC2DC \uACB0\uACFC\uB97C \uD655\uC778\uD560 \uC218 \uC788\uC5B4\uC694" })] })] }));
};
export default RewardedAdModal;
