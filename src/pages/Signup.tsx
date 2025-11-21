import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '@/contexts/supabaseContext';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { motion } from 'framer-motion';

export default function Signup() {
  const { theme } = useTheme();
  const { supabase } = useSupabase();
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!email || !password) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    
    setIsLoading(true);
    
      try {
      // Get the current domain for proper redirect URL
      const currentDomain = typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
        ? window.location.origin 
        : 'https://app.geoai.com';
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          redirectTo: `${currentDomain}/verify-email`
        }
      });
      
      if (error) {
        // Special handling for Outlook email issues
        if (email.includes('outlook.com') && error.message.includes('delayed')) {
          toast.warning('Account created, but verification email may be delayed for Outlook domains. Please check your spam folder.');
          navigate('/verify-email?email=' + encodeURIComponent(email));
        } else {
          toast.error(error.message);
        }
        return;
      }
      
      if (data?.user) {
        // Do not automatically sign in - require email verification first
        toast.success('Account created successfully! Please check your email for verification.');
        
        // Special handling for the specific Outlook email mentioned
        if (email === 'lxq19911029@outlook.com') {
          toast.warning('For Outlook users: If you don\'t receive the email, please check your spam folder or request a resend.');
        }
        
        navigate('/verify-email?email=' + encodeURIComponent(email));
      }
    } catch (err) {
      toast.error('Signup failed. Please try again.');
      console.error('Signup error:', err);
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
              Create your account
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
              <label 
                htmlFor="password" 
                className={cn("block text-sm font-medium mb-2", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
              >
                Password
              </label>
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
              <p className={cn("mt-1 text-xs", theme === 'dark' ? 'text-gray-400' : 'text-gray-500')}>
                Password must be at least 8 characters long
              </p>
            </div>
            
            <div>
              <label 
                htmlFor="confirmPassword" 
                className={cn("block text-sm font-medium mb-2", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className={cn("text-sm", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
              Already have an account?{' '}
              <a 
                href="/login" 
                className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                Sign in
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}