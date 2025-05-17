import './App.css'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Register, Home, EventDetails, Congratulations, ManageEvents, CreateEvent, EditEvent, NotFound, UserBookings, Contacts, Terms, Privacy } from './Pages';
import { Header, Footer, ProtectedRoute, AdminRoute } from './Components';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', language === 'ar');
    document.body.classList.toggle('ltr', language !== 'ar');
  }, [language]);

  return (
    <>
      <Router>
        <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        language={language}
        setLanguage={setLanguage}
        />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />

            {/* Protected Routes (only for booking and viewing event details) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/congratulations" element={<Congratulations />} />
              <Route path="/bookings/my" element={<UserBookings />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin/events" element={<ManageEvents />} />
              <Route path="/admin/events/create" element={<CreateEvent />} />
              <Route path="/admin/events/edit/:id" element={<EditEvent />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer/>
      </Router>
    </>
  )
}

export default App
