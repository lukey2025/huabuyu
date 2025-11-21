import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'sonner';
import App from "./App";
import { SupabaseProvider } from "./contexts/supabaseContext";
import { AuthContext } from "./contexts/authContext";
import "./index.css";

// Error boundary to catch any unhandled errors
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-4">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
            <i className="fa-exclamation-triangle text-2xl text-red-500"></i>
          </div>
          <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
            We're sorry, an unexpected error occurred. Please try refreshing the page or contact support if the issue persists.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Create a proper AuthProvider implementation
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Basic state management for authentication
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      setIsAuthenticated,
      setUser,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SupabaseProvider>
        <AuthProvider>
          <ErrorBoundary>
            <App />
            <Toaster />
          </ErrorBoundary>
        </AuthProvider>
      </SupabaseProvider>
    </BrowserRouter>
  </StrictMode>
);
