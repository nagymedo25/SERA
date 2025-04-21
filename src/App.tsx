import React from 'react';
import './router-config'; // استيراد ملف إسكات تحذيرات React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import theme from './theme';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewDashboard from './pages/NewDashboard';
import Assessment from './pages/Assessment';
import NotFound from './pages/NotFound';
import Certificate from './pages/Certificate';
import Onboarding from './pages/Onboarding';
import AIPlanner from './components/dashboard/AIPlanner';
import ProgressPage from './pages/analytics/ProgressPage';
import ProfileSettings from './pages/settings/ProfileSettings';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<NewDashboard />} />
            <Route path="/dashboard/old" element={<Dashboard />} />
            <Route path="/analytics/progress" element={<ProgressPage />} />
            <Route path="/ai-planner" element={<AIPlanner />} />
            <Route path="/settings" element={<ProfileSettings />} />
            <Route path="/profile" element={<ProfileSettings />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/certificate/:id" element={<Certificate />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App; 