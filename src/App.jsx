import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import AdminMessages from './pages/AdminMessages.jsx';
import AdminReports from './pages/AdminReports.jsx';
import AdminUsers from './pages/AdminUsers.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsAndConditions from './pages/TermsAndConditions.jsx';
import Pricing from './pages/Pricing.jsx';
import SuccessStories from './pages/SuccessStories.jsx';
import Partners from './pages/Partners.jsx';
import Contact from './pages/Contact.jsx';
import Preloader from './components/Preloader.jsx';
import SessionModal from './components/SessionModal.jsx';
import DashboardLayout from './components/DashboardLayout.jsx';
import CookieConsent from './components/CookieConsent.jsx';
import UserSettings from './pages/UserSettings.jsx';
import PasswordAdvisory from './components/PasswordAdvisory.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import SEO from './components/SEO.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

// Simple Landing Page Component
const LandingPage = ({ user }) => (
  <>
    <SEO
      title="Your Path to Higher Education"
      description="Bridge to College empowers Rwandan students to achieve their higher education dreams through personalized guidance, scholarship support, and expert university application assistance."
      keywords="Education Rwanda, University Application Rwanda, Scholarships Rwanda, Bridge to College, Higher Education Rwanda"
    />
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
  const idleTimerRef = useRef(null);

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
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (user) {
        // 30 min = 1800000ms
        idleTimerRef.current = setTimeout(() => {
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
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('mousedown', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [user]);

  const login = useCallback((userData) => {
    // Save user data (including token) to localStorage
    localStorage.setItem('btc_user', JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('btc_user');
    setUser(null);
  }, []);

  const isDashboardRoute = ['/dashboard', '/admin-dashboard', '/apply', '/settings', '/admin-messages', '/admin-reports', '/admin-users'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <ScrollToTop />
      <Preloader isLoading={loading} />
      <SessionModal
        isOpen={showSessionModal}
        onConfirm={() => { setShowSessionModal(false); window.location.href = '/login'; }}
        onLogout={() => setShowSessionModal(false)}
      />

      {!!user?.requires_password_change && user.role !== 'admin' && (
        <PasswordAdvisory
          user={user}
          onSuccess={(updatedUser) => setUser(updatedUser)}
        />
      )}

      {!isDashboardRoute && <Navbar user={user} logout={logout} />}

      {isDashboardRoute ? (
        <DashboardLayout user={user} logout={logout}>
          <ErrorBoundary>
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
                element={user ? (
                  user.role === 'admin' ?
                    <AdminSettings user={user} setUser={setUser} /> :
                    <UserSettings user={user} setUser={setUser} />
                ) : <Navigate to="/login" />}
              />
              <Route
                path="/admin-messages"
                element={user && user.role === 'admin' ? <AdminMessages user={user} /> : <Navigate to={user ? "/dashboard" : "/login"} />}
              />
              <Route
                path="/admin-reports"
                element={user && user.role === 'admin' ? <AdminReports user={user} /> : <Navigate to={user ? "/dashboard" : "/login"} />}
              />
              <Route
                path="/admin-users"
                element={user && user.role === 'admin' ? <AdminUsers user={user} /> : <Navigate to={user ? "/dashboard" : "/login"} />}
              />
            </Routes>
          </ErrorBoundary>
        </DashboardLayout>
      ) : (
        <main className="flex-grow">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<LandingPage user={user} />} />
              <Route path="/login" element={<Login onLogin={login} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </ErrorBoundary>
        </main>
      )}

      {!isDashboardRoute && <Footer />}
      <CookieConsent />
    </div>
  );
}

export default App;
