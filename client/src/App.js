import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Auth/SignUp';
import Login from './pages/Auth/SignIn';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Category from './pages/Category/Category';
import AddJob from './pages/Jobs/AddJob';
import JobList from'./pages/Jobs/JobList';
import ApplicationList from './pages/Applications/ApplicationList';
import AddAdmin from './pages/Auth/AddAdmin';
import UpdateJob from'./pages/Jobs/UpdateJob';
import Setting from './pages/Profile/Setting';

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
         <Route
          path="/skills"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Category />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/job"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AddJob />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/joblist"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <JobList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ApplicationList"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ApplicationList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AddAdmin />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

    <Route
          path="/update/:jobId"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <UpdateJob />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

<Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Setting />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

            </Routes>
        </Router>
    );
};

export default App;
