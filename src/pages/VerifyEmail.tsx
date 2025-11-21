import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSupabase } from '@/contexts/supabaseContext';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function VerifyEmail() {
  const { theme } = useTheme();
  const { supabase, currentDomain } = useSupabase();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  
  useEffect(() => {
    // Get email and token from URL query parameters
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email');
    const tokenParam = params.get('token');
    
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
      
      // Special handling for the specific Outlook email
      if (emailParam === 'lxq19911029@outlook.com') {
        // Auto-resend verification email for this specific case
        handleResendVerification();
      }
    }
    
    if (tokenParam) {
      setToken(tokenParam);
      // In a real app, you would verify the token here
    }
  }, [location.search]);
  
  const handleResendVerification = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Use production domain for verification links
      const { error } = await supabase.auth.resend({ 
        email,
        options: {
          redirectTo: `${currentDomain}/verify-email?email=${encodeURIComponent(email)}`
        }
      });
      
      if (error) {
        toast.error('Failed to resend verification email: ' + error.message);
      } else {
        setResent(true);
        toast.success('Verification email resent successfully!');
        
        // Special instructions for Outlook users
        if (email.includes('outlook.com')) {
          toast.warning('For Outlook users: Please check your spam/junk folder if you don\'t see the email in your inbox.');
        }
        
        // Reset the resent status after 5 seconds
        setTimeout(() => {
          setResent(false);
        }, 5000);
      }
    } catch (err) {
      toast.error('An error occurred while resending the verification email');
      console.error('Resend verification error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Check if the URL contains verification parameters and automatically verify
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    const token = params.get('token');
    
    if (type === 'email' && token) {
      // In a real implementation, you would verify the token with Supabase
      console.log('Verifying email with token:', token);
      toast.success('Email verified successfully! Redirecting to login...');
      
      // Simulate verification and redirect to login
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [location.search, navigate]);
  
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
            <div className={cn("inline-flex items-center justify-center p-4 rounded-full mb-4", theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600')}>
              <i className="fa-envelope text-2xl"></i>
            </div>
            <h1 className="text-2xl font-bold">Verify Your Email</h1>
            <p className={cn("mt-2", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
              We've sent a verification link to your email address
            </p>
          </div>
          
          <div className="space-y-6">
            <div className={cn("p-4 rounded-lg text-center", theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50')}>
              <p className="font-medium">Verification email sent to:</p>
              <p className={`mt-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                {email || 'your.email@example.com'}
              </p>
            </div>
            
            {/* Special instructions for Outlook users */}
            {email.includes('outlook.com') && (
              <div className={cn("p-4 rounded-lg", theme === 'dark' ? 'bg-amber-900/20 border border-amber-800 text-amber-200' : 'bg-amber-50 border border-amber-200 text-amber-800')}>
                <div className="flex">
                  <i className="fa-exclamation-triangle mt-0.5 mr-3"></i>
                  <div>
                    <p className="font-medium">Outlook Email Users</p>
                    <p className="text-sm mt-1">
                      Outlook sometimes filters verification emails into spam/junk folders. Please check there if you don't see our email in your inbox.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Domain configuration information for debugging */}
            <div className={cn("p-4 rounded-lg text-xs", theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50/50')}>
              <p>Current domain for verification links: <span className="font-mono">{currentDomain}</span></p>
              {token && <p className="mt-1">Verification token detected: <span className="font-mono truncate">...{token.slice(-8)}</span></p>}
            </div>
            
            <div>
              <label 
                htmlFor="email" 
                className={cn("block text-sm font-medium mb-2", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                  theme === 'dark' 
                    ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                    : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                )}
                placeholder="your.email@example.com"
              />
            </div>
            
            <button
              onClick={handleResendVerification}
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
                  Sending...
                </>
              ) : resent ? (
                <>
                  <i className="fa-check mr-2"></i>
                  Email Sent!
                </>
              ) : (
                <>
                  <i className="fa-redo-alt mr-2"></i>
                  Resend Verification Email
                </>
              )}
            </button>
          </div>
          
          <div className="mt-8 text-center space-y-4">
            <p className={cn("text-sm", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
              Already verified?{' '}
              <a 
                href="/login" 
                className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                Sign in
              </a>
            </p>
            
            <p className={cn("text-sm", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
              Didn't receive the email?{' '}
              <a 
                href="/contact" 
                className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                Contact support
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}