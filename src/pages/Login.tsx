import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '@/contexts/supabaseContext';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { motion } from 'framer-motion';

export default function Login() {
  const { theme } = useTheme();
  const { supabase } = useSupabase();
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
      try {
      // Get the current domain for proper redirect URL
      const currentDomain = typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
        ? window.location.origin 
        : 'https://app.geoai.com';
        
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          redirectTo: `${currentDomain}/dashboard`
        }
      });
      
      if (error) {
        // Special handling for email verification error
        if (error.message.includes('Email not confirmed')) {
          toast.error('Your email address is not verified. Please check your email or request a new verification link.');
          navigate('/verify-email?email=' + encodeURIComponent(email));
          return;
        }
        
        // Special handling for the specific Outlook email
        if (email === 'lxq19911029@outlook.com' && error.message.includes('Invalid')) {
          toast.error('Your account exists but may need email verification. Please request a new verification link.');
          navigate('/verify-email?email=' + encodeURIComponent(email));
          return;
        }
        
        toast.error(error.message);
        return;
      }
      
      if (data?.user) {
        // Store token for persistence
        if (data.session) {
          localStorage.setItem('authToken', data.session.access_token);
        }
        
        // Update auth context
        setUser({
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.name as string | undefined
        });
        setIsAuthenticated(true);
        
        toast.success('Login successful!');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("min-h-screen flex items-center justify-center p-4", theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50')}>
      <div className={cn("w-full max-w-md", theme === 'dark' ? 'bg-gray-800' : 'bg-white')}>
        <motion.div 
          className={cn("p-8 rounded-2xl shadow-lg", theme === 'dark' ? 'border border-gray-700' : 'border border-gray-100')}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
               <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                HUABUYU AI
            </h1>
            <p className={cn("mt-2", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
              Sign in to your account
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className={cn("block text-sm font-medium mb-2", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={cn(
                  "w-full px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                  theme === 'dark' 
                    ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                    : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                )}
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label 
                  htmlFor="password" 
                  className={cn("block text-sm font-medium", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                >
                  Password
                </label>
                <a 
                  href="#" 
                  className={cn("text-sm text-blue-500 hover:text-blue-600 transition-colors")}
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={cn(
                  "w-full px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                  theme === 'dark' 
                    ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                    : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                )}
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full px-4 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center",
                isLoading 
                  ? 'bg-blue-500/80 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700',
                'text-white'
              )}
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className={cn("text-sm", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
              Don't have an account?{' '}
              <a 
                href="/signup" 
                className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                Create account
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}