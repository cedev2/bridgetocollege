import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import ApplicationForm from './components/ApplicationForm.jsx';
import Footer from './components/Footer.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminSettings from './pages/AdminSettings.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsAndConditions from './pages/TermsAndConditions.jsx';
import Pricing from './pages/Pricing.jsx';
import SuccessStories from './pages/SuccessStories.jsx';
import Preloader from './components/Preloader.jsx';
import SessionModal from './components/SessionModal.jsx';
import DashboardLayout from './components/DashboardLayout.jsx';

// Simple Landing Page Component
const LandingPage = ({ user }) => (
  <>
    <Hero user={user} />
    <About />
    <Services />
  </>
);

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('btc_user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const location = useLocation();
  let idleTimer = null;

  useEffect(() => {
    // 1. Page Transition Loading
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    // 3. Activity Tracker (Idle Timeout)
    const resetTimer = () => {
      if (idleTimer) clearTimeout(idleTimer);
      if (user) {
        // 30 min = 1800000ms
        idleTimer = setTimeout(() => {
          setShowSessionModal(true);
          logout();
        }, 1800000);
      }
    };

    if (user) {
      window.addEventListener('mousemove', resetTimer);
      window.addEventListener('mousedown', resetTimer);
      window.addEventListener('keydown', resetTimer);
      resetTimer();
    }

    return () => {
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('mousedown', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [user]);

  const login = (userData) => {
    // Save user data (including token) to localStorage
    localStorage.setItem('btc_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('btc_user');
    setUser(null);
  };

  const isDashboardRoute = ['/dashboard', '/admin-dashboard', '/apply', '/settings'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Preloader isLoading={loading} />
      <SessionModal 
        isOpen={showSessionModal} 
        onConfirm={() => { setShowSessionModal(false); window.location.href='/login'; }}
        onLogout={() => setShowSessionModal(false)}
      />
      
      {!isDashboardRoute && <Navbar user={user} logout={logout} />}
      
      {isDashboardRoute ? (
        <DashboardLayout user={user} logout={logout}>
          <Routes>
            <Route 
              path="/dashboard" 
              element={user ? <UserDashboard user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/admin-dashboard" 
              element={user && user.role === 'admin' ? <AdminDashboard user={user} /> : <Navigate to={user ? "/dashboard" : "/login"} />} 
            />
            <Route 
              path="/apply" 
              element={user ? <ApplicationForm user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/settings" 
              element={user && user.role === 'admin' ? <AdminSettings user={user} setUser={setUser} /> : <Navigate to={user ? "/dashboard" : "/login"} />} 
            />
          </Routes>
        </DashboardLayout>
      ) : (
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage user={user} />} />
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/success-stories" element={<SuccessStories />} />
          </Routes>
        </main>
      )}

      {!isDashboardRoute && <Footer />}
    </div>
  );
}

export default App;
