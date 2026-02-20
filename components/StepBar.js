import { jsx as _jsx } from "react/jsx-runtime";
import { colors, spacing, borderRadius } from '../styles/theme';
const StepBar = ({ currentStep, totalSteps = 4 }) => {
    const progress = (currentStep / totalSteps) * 100;
    return (_jsx("div", { style: { padding: `${spacing.md}px ${spacing.lg}px`, backgroundColor: colors.white }, children: _jsx("div", { style: { height: 4, backgroundColor: colors.gray200, borderRadius: borderRadius.full, overflow: 'hidden' }, children: _jsx("div", { style: {
                    height: '100%',
                    width: `${progress}%`,
                    backgroundColor: colors.primary,
                    borderRadius: borderRadius.full,
                    transition: 'width 0.3s ease',
                } }) }) }));
};
export default StepBar;
