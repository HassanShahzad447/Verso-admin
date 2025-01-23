import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Auth/SignUp';
import Login from './pages/Auth/SignIn';
import AddAdmin from './pages/Auth/AddAdmin';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
            </Routes>
        </Router>
    );
};

export default App;
