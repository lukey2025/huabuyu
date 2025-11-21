import { createContext } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  email_confirmed_at?: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
  loading?: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  setIsAuthenticated: (value: boolean) => {},
  setUser: (user: User | null) => {},
  logout: () => {},
  loading: false
});

// This is a simple mock implementation that will be replaced in the actual AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // This is just a placeholder for the actual provider implementation
  // The real implementation should be in a separate .tsx file
  return (
    children as React.ReactNode
  );
};