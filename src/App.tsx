import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { Home } from './pages/Home';
import { SmartCalculators } from './pages/SmartCalculators';
import { WellnessScorePage } from './pages/WellnessScore';
import { BodyAssessmentPage } from './pages/BodyAssessment';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="smart-calculators" element={<SmartCalculators />} />
          <Route path="wellness-score" element={<WellnessScorePage />} />
          <Route path="body-assessment" element={<BodyAssessmentPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
