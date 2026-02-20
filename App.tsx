import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GenderSelectScreen from './app/index';
import BodySizeSelectScreen from './app/step2';
import PreferenceSelectScreen from './app/step3';
import BudgetSelectScreen from './app/step4';
import ResultScreen from './app/result';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GenderSelectScreen />} />
      <Route path="/step2" element={<BodySizeSelectScreen />} />
      <Route path="/step3" element={<PreferenceSelectScreen />} />
      <Route path="/step4" element={<BudgetSelectScreen />} />
      <Route path="/result" element={<ResultScreen />} />
    </Routes>
  );
}
