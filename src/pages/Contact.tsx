
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Contact() {
  const { theme } = useTheme();
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('sales');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name || !email || !subject || !message) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setSubmitting(false);
      setName('');
      setEmail('');
      setCompany('');
      setMessage('');
      setSubject('');
      
      toast.success('Thank you for contacting us! We will get back to you soon.');
    }, 1500);
  };

  return (
    <div className={cn("min-h-screen flex flex-col", theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900')}>
      {/* Header */}
      <header className={cn("sticky top-0 z-50 backdrop-blur-md", theme === 'dark' ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-gray-200')}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <motion.div 
                className="flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                 <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">HUABUYU AI</span>
              </motion.div>
              <nav className="hidden md:ml-8 md:flex md:space-x-10">
                <a 
                  href="/"
                  className={cn("text-sm font-medium hover:text-blue-500 transition-colors", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                >
                  Home
                </a>
                <a 
                  href="/#product"
                  className={cn("text-sm font-medium hover:text-blue-500 transition-colors", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                >
                  Product
                </a>
                <a 
                  href="/#pricing"
                  className={cn("text-sm font-medium hover:text-blue-500 transition-colors", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                >
                  Pricing
                </a>
                <a 
                  href="/#features"
                  className={cn("text-sm font-medium hover:text-blue-500 transition-colors", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                >
                  Features
                </a>
              </nav>
            </div>
            <div className="flex items-center">
              <motion.a 
                href="/login"
                className={cn("hidden md:block px-4 py-2 text-sm font-medium rounded-md", theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.a>
              <motion.a 
                href="/signup"
                className={cn("hidden md:block ml-3 px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Free Trial
              </motion.a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p className={cn("text-lg max-w-2xl mx-auto", theme === 'dark' ? 'text-gray-300' : 'text-gray-600')}>
              Have questions or need assistance? Our team is here to help you get the most out of GEO AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Information */}
            <div className={cn("lg:col-span-2 space-y-8", theme === 'dark' ? 'text-gray-300' : 'text-gray-800')}>
              <motion.div 
                className={cn("p-6 rounded-xl shadow-md", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className={cn("p-3 rounded-full mr-4", theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600')}>
                      <i className="fa-envelope"></i>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email Us</h3>
                      <a href="mailto:contact@geoai.com" className={`hover:underline ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                        contact@geoai.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className={cn("p-3 rounded-full mr-4", theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600')}>
                      <i className="fa-phone"></i>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Call Us</h3>
                      <a href="tel:+11234567890" className={`hover:underline ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                        +1 (123) 456-7890
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className={cn("p-3 rounded-full mr-4", theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600')}>
                      <i className="fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Visit Us</h3>
                      <address className="not-italic">
                        123 Innovation Drive<br />
                        San Francisco, CA 94103<br />
                        United States
                      </address>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className={cn("p-6 rounded-xl shadow-md", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-xl font-bold mb-6">Business Hours</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
                
                <div className={cn("mt-6 pt-6 border-t", theme === 'dark' ? 'border-gray-700' : 'border-gray-200')}>
                  <p>
                    <i className="fa-info-circle mr-2 text-blue-500"></i>
                    We typically respond to emails within 1 business day
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className={cn("p-6 rounded-xl shadow-md", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-xl font-bold mb-6">Follow Us</h2>
                
                <div className="flex space-x-4">
                  {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                    <a
                      key={social}
                      href={`https://${social}.com/geoai`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn("p-3 rounded-full transition-colors", 
                        theme === 'dark' 
                          ? 'bg-gray-700 hover:bg-blue-900/50 text-white' 
                          : 'bg-gray-100 hover:bg-blue-100 text-gray-800'
                      )}
                      aria-label={`Follow us on ${social}`}
                    >
                      <i className={`fa-brands fa-${social}`}></i>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Contact Form */}
            <motion.div 
              className={cn("lg:col-span-3 p-8 rounded-xl shadow-md", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-6">Send us a Message</h2>
              
              {/* Contact Type Tabs */}
              <div className="flex mb-8 border-b" theme={theme}>
                <button
                  className={`py-3 px-5 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === 'sales'
                      ? 'border-blue-500 text-blue-500'
                      : theme === 'dark'
                      ? 'border-transparent text-gray-400 hover:text-gray-300'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('sales')}
                >
                  Sales Inquiry
                </button>
                <button
                  className={`py-3 px-5 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === 'support'
                      ? 'border-blue-500 text-blue-500'
                      : theme === 'dark'
                      ? 'border-transparent text-gray-400 hover:text-gray-300'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('support')}
                >
                  Technical Support
                </button>
                <button
                  className={`py-3 px-5 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === 'partnership'
                      ? 'border-blue-500 text-blue-500'
                      : theme === 'dark'
                      ? 'border-transparent text-gray-400 hover:text-gray-300'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('partnership')}
                >
                  Partnership
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label 
                      htmlFor="name" 
                      className={cn("block text-sm font-medium mb-2", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className={cn(
                        "w-full px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                        theme === 'dark' 
                          ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'
                      )}
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="email" 
                      className={cn("block text-sm font-medium mb-2", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                    >
                      Email Address <span className="text-red-500">*</span>
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
                          ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'
                      )}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label 
                    htmlFor="company" 
                    className={cn("block text-sm font-medium mb-2", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                      theme === 'dark' 
                        ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'
                    )}
                    placeholder="Your company name"
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="subject" 
                    className={cn("block text-sm font-medium mb-2", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className={cn(
                      "w-full px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                      theme === 'dark' 
                        ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'
                    )}
                    placeholder="What is this about?"
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="message" 
                    className={cn("block text-sm font-medium mb-2", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={6}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                      theme === 'dark' 
                        ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'
                    )}
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={submitting}
                  className={cn(
                    "w-full px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center",
                    submitting 
                      ? 'bg-blue-500/80 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700',
                    'text-white'
                  )}
                >
                  {submitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="fa-paper-plane mr-2"></i>
                      Send Message
                    </>
                  )}
                </button>
              </form>
              
              <div className={cn("mt-8 pt-6 border-t text-sm text-center", theme === 'dark' ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500')}>
                Prefer to talk? Call us at <a href="tel:+11234567890" className={`hover:underline ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>+1 (123) 456-7890</a> during business hours
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <footer className={cn("py-12", theme === 'dark' ? 'bg-gray-900 border-t border-gray-800' : 'bg-white border-t border-gray-100')}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
               <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">HUABUYU AI</h3>
              <p className={cn("mb-4", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
                Leading brand visibility management platform using AI technology to help businesses enhance their online influence
              </p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <a 
                    key={social}
                    href={`https://${social}.com`}
                    className={cn("p-2 rounded-full", theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}
                  >
                    <i className={`fa-brands fa-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>
            
            {[
              {
                title: 'Product',
                links: ['Features', 'Pricing', 'Case Studies', 'Integrations', 'Changelog']
              },
              {
                title: 'Resources',
                links: ['Documentation', 'Tutorials', 'Blog', 'API', 'Community']
              },
              {
                title: 'Company',
                links: ['About Us', 'Contact Us', 'Careers', 'Privacy Policy', 'Terms of Service']
              }
            ].map((column) => (
              <div key={column.title}>
                <h4 className="text-lg font-semibold mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a 
                        href={`#${link.toLowerCase()}`}
                        className={cn("hover:underline", theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900')}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className={cn("pt-8 border-t", theme === 'dark' ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600')}>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>&copy; 2025 GEO AI. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:underline">Privacy Policy</a>
                <a href="#" className="hover:underline">Terms of Service</a>
                <a href="#" className="hover:underline">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
