import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import GenderSelectScreen from './app/index';
import BodySizeSelectScreen from './app/step2';
import PreferenceSelectScreen from './app/step3';
import BudgetSelectScreen from './app/step4';
import ResultScreen from './app/result';
export default function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(GenderSelectScreen, {}) }), _jsx(Route, { path: "/step2", element: _jsx(BodySizeSelectScreen, {}) }), _jsx(Route, { path: "/step3", element: _jsx(PreferenceSelectScreen, {}) }), _jsx(Route, { path: "/step4", element: _jsx(BudgetSelectScreen, {}) }), _jsx(Route, { path: "/result", element: _jsx(ResultScreen, {}) })] }));
}
