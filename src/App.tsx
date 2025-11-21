import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/authContext';
import { useTheme } from './hooks/useTheme';
import { cn } from './lib/utils';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

// Import all pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ScanResults from './pages/ScanResults';
import Reports from './pages/Reports';
import Optimization from './pages/Optimization';
import Contact from './pages/Contact';
import Demo from './pages/Demo';
import { Empty } from './components/Empty';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!isAuthenticated && !token) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  // Return children directly for now
  return <>{children}</>;
};

// Basic Layout component
const Layout = ({ children, isAuthPage = false }: { children: React.ReactNode, isAuthPage?: boolean }) => {
  const { theme } = useTheme();
  
  // Skip header and footer for auth pages
  if (isAuthPage) {
    return (
      <div className={cn("min-h-screen", theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900')}>
        {children}
      </div>
    );
  }
  
  return (
    <div className={cn("min-h-screen flex flex-col", theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900')}>
      {children}
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Global error handler
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
      toast.error('An unexpected error occurred. Please try refreshing the page.');
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  
  // Show loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900">
        <motion.div 
          className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.p 
          className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Loading application...
        </motion.p>
      </div>
    );
  }
  
  return (
    <Layout>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/demo" element={<Demo />} />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/projects" 
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/scan-results" 
          element={
            <ProtectedRoute>
              <ScanResults />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/reports" 
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/optimization" 
          element={
            <ProtectedRoute>
              <Optimization />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch-all route */}
        <Route path="*" element={<Empty />} />
      </Routes>
    </Layout>
  );
}

export default App;