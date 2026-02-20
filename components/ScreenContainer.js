import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { colors, spacing } from '../styles/theme';
import StepBar from './StepBar';
const ScreenContainer = ({ children, currentStep, totalSteps = 4, scrollable = true, footer, backgroundColor = colors.white, }) => {
    const showStepBar = currentStep !== undefined && currentStep > 0 && currentStep <= totalSteps;
    return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor }, children: [showStepBar && (_jsx(StepBar, { currentStep: currentStep, totalSteps: totalSteps })), _jsx("div", { style: {
                    flex: 1,
                    overflowY: scrollable ? 'auto' : 'hidden',
                    padding: `${spacing.lg}px`,
                    paddingBottom: spacing.xl,
                }, children: children }), footer && (_jsx("div", { style: {
                    padding: `${spacing.lg}px`,
                    backgroundColor: colors.white,
                    borderTop: `1px solid ${colors.gray100}`,
                    flexShrink: 0,
                }, children: footer }))] }));
};
export default ScreenContainer;
