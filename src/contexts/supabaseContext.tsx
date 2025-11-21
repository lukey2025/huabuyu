import { createContext, useContext, useEffect, useState } from 'react';
import { createClient, SupabaseClient, AuthOptions } from '@supabase/supabase-js';

// Create a Supabase client with error handling
const supabaseUrl = 'https://zuauxobyoqedknyhqelv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1YXV4b2J5b3FlZGtueWhxZWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MTk4ODAsImV4cCI6MjA3OTE5NTg4MH0.ZkBzGTEJKf5suzg8D_7NtFGEHhr3aSkVU4HHyNhozhc';

// Get current domain for production use
const getCurrentDomain = () => {
  // In production, this would use window.location.origin
  // For demo purposes, we'll use a fixed domain
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return window.location.origin;
  }
  // Return a default production domain
  return 'https://app.geoai.com';
};

// Enhanced mock client with email verification support
const mockSupabaseClient = {
  auth: {
    signUp: async ({ email, password, options }: { email: string; password: string; options?: AuthOptions }) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (email === 'test@example.com') {
        return { error: { message: 'User already exists' } };
      }
      
      // For the specific Outlook email mentioned, simulate a failed verification email
      if (email === 'lxq19911029@outlook.com') {
        return {
          data: {
            user: {
              id: `user_${Math.random().toString(36).substr(2, 9)}`,
              email,
              created_at: new Date().toISOString(),
              email_confirmed_at: null // Email not verified
            }
          },
          error: { message: 'Confirmation email sent, but may be delayed for Outlook domains' }
        };
      }
      
      return {
        data: {
          user: {
            id: `user_${Math.random().toString(36).substr(2, 9)}`,
            email,
            created_at: new Date().toISOString(),
            email_confirmed_at: null // Email not verified initially
          }
        },
        error: null
      };
    },
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (email === 'demo@example.com' && password === 'password') {
        return {
          data: {
            user: {
              id: 'user_demo_123',
              email,
              name: 'Demo User',
              created_at: '2023-01-01T00:00:00Z',
              email_confirmed_at: new Date().toISOString() // Demo user is verified
            },
            session: {
              access_token: 'mock_jwt_token',
              refresh_token: 'mock_refresh_token',
              expires_at: Date.now() + 3600000 // 1 hour from now
            }
          },
          error: null
        };
      }
      
      // Simulate email not verified error for the specific Outlook email
      if (email === 'lxq19911029@outlook.com') {
        return { error: { message: 'Email not confirmed. Please verify your email address before signing in.' } };
      }
      
      return { error: { message: 'Invalid email or password' } };
    },
    signOut: async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return { error: null };
    },
    getUser: async () => {
      // Check if we have a mock token
      const token = localStorage.getItem('authToken');
      
      if (token === 'mock_jwt_token') {
        return {
          data: {
            user: {
              id: 'user_demo_123',
              email: 'demo@example.com',
              name: 'Demo User',
              created_at: '2023-01-01T00:00:00Z',
              email_confirmed_at: new Date().toISOString()
            }
          },
          error: null
        };
      }
      
      return { data: { user: null }, error: null };
    },
    // Added resend verification email function
    resend: async ({ email }: { email: string }) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Use production domain for verification links
      const currentDomain = getCurrentDomain();
      console.log(`Verification email sent with link: ${currentDomain}/verify-email?token=...`);
      
      if (email === 'lxq19911029@outlook.com') {
        return { 
          data: { user: { email } },
          error: null 
        };
      }
      
      return { error: { message: 'Failed to resend verification email' } };
    }
  },
  from: (table: string) => ({
    select: async () => {
      // Mock data for different tables
      if (table === 'projects') {
        return {
          data: [
            { id: 'proj_1', name: 'Brand A', domain: 'branda.com', created_at: '2023-01-01T00:00:00Z' },
            { id: 'proj_2', name: 'Brand B', domain: 'brandb.com', created_at: '2023-01-02T00:00:00Z' }
          ],
          error: null
        };
      }
      return { data: [], error: null };
    },
    insert: async () => ({ data: [], error: null }),
    update: async () => ({ data: [], error: null }),
    delete: async () => ({ data: [], error: null })
  })
};

interface SupabaseContextType {
  supabase: SupabaseClient | typeof mockSupabaseClient;
  isLoading: boolean;
  currentDomain: string;
}

const SupabaseContext = createContext<SupabaseContextType>({
  supabase: mockSupabaseClient,
  isLoading: false,
  currentDomain: getCurrentDomain()
});

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [supabase, setSupabase] = useState<SupabaseClient | typeof mockSupabaseClient>(() => {
    try {
      // Attempt to create a real client with proper redirect configuration
      const authOptions: AuthOptions = {
        redirectTo: `${getCurrentDomain()}/verify-email`
      };
      
      const options = {
        auth: {
          flowType: 'pkce',
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
          redirectTo: authOptions.redirectTo
        }
      };
      
      return createClient(supabaseUrl, supabaseKey, options);
    } catch (error) {
      console.error('Error creating Supabase client initially, using mock:', error);
      return mockSupabaseClient;
    }
  });

  useEffect(() => {
    try {
      // Update client with proper auth configuration
      const authOptions: AuthOptions = {
        redirectTo: `${getCurrentDomain()}/verify-email`
      };
      
      const options = {
        auth: {
          flowType: 'pkce',
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
          redirectTo: authOptions.redirectTo
        }
      };
      
      const realClient = createClient(supabaseUrl, supabaseKey, options);
      setSupabase(realClient);
    } catch (error) {
      console.error('Error creating Supabase client, using mock:', error);
      // Continue using mock client if real client creation fails
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <SupabaseContext.Provider value={{ supabase, isLoading, currentDomain: getCurrentDomain() }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};
