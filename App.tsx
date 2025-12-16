import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AppLayout } from './components/AppLayout';
import { UploadPage } from './pages/UploadPage';
import { ReportPage } from './pages/ReportPage';
import { HistoryPage } from './pages/HistoryPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="upload" replace />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="dashboard/:id" element={<ReportPage />} />
          <Route path="history" element={<HistoryPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;