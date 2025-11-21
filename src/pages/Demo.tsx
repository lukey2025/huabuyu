import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Demo() {
  const { theme } = useTheme();
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [timezone, setTimezone] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name || !email || !company || !date) {
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
      setPhone('');
      setTimezone('');
      setDate('');
      setMessage('');
      
      toast.success('Thank you! We have scheduled your demo and will contact you shortly.');
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

      <main className="flex-grow">
        {/* Hero Section */}
        <section className={cn("py-16", theme === 'dark' ? 'bg-gray-900' : 'bg-white')}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Schedule a Demo
                </span>
              </h1>
              <p className={cn("text-lg sm:text-xl mb-8", theme === 'dark' ? 'text-gray-300' : 'text-gray-600')}>
                See how GEO AI can help you monitor, analyze, and optimize your brand's visibility across search engines and AI models
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Demo Video */}
            <motion.div 
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className={cn("rounded-xl overflow-hidden shadow-2xl relative", theme === 'dark' ? 'border border-gray-700' : 'border border-gray-200')}>
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
                  <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                    <i className="fa-solid fa-play text-white text-2xl ml-1"></i>
                  </div>
                </div>
                
                {/* Demo thumbnail - using the specified image generation API */}
                <img
                  src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=AI%20dashboard%2C%20brand%20visibility%20analytics%2C%20modern%20UI%2C%20data%20visualization%2C%20charts%20and%20metrics&sign=fefb0f5a0004c53f62623a9d8698dc78"
                  alt="GEO AI Demo"
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: '500px' }}
                />
              </div>
              
              <div className={cn("mt-8 space-y-6 p-6 rounded-xl shadow-md", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}>
                <h3 className="text-xl font-bold">What You'll See in the Demo</h3>
                
                <div className="space-y-4">
                  {[
                    {
                      title: 'Brand Visibility Tracking',
                      description: 'How GEO AI continuously monitors your brand across search engines and AI models',
                      icon: 'fa-eye'
                    },
                    {
                      title: 'Competitor Analysis',
                      description: 'Compare your performance against competitors and identify market opportunities',
                      icon: 'fa-chart-pie'
                    },
                    {
                      title: 'AI-Powered Insights',
                      description: 'Discover actionable recommendations to improve your brand visibility',
                      icon: 'fa-brain'
                    },
                    {
                      title: 'Content Optimization',
                      description: 'See how our AI generates optimized content to boost your online presence',
                      icon: 'fa-magic'
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
                    >
                      <div className={cn("p-3 rounded-full mr-4 flex-shrink-0 mt-1", theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600')}>
                        <i className={`fa-solid ${item.icon}`}></i>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className={cn("text-sm", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Demo Scheduler */}
            <motion.div 
              className={cn("p-8 rounded-xl shadow-lg", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">Book Your Demo</h2>
              
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label 
                      htmlFor="company" 
                      className={cn("block text-sm font-medium mb-2", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                    >
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
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
                      htmlFor="phone" 
                      className={cn("block text-sm font-medium mb-2", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                        theme === 'dark' 
                          ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'
                      )}
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
                
                <div>
                  <label 
                    htmlFor="timezone" 
                    className={cn("block text-sm font-medium mb-2", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                  >
                    Time Zone
                  </label>
                  <select
                    id="timezone"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                      theme === 'dark' 
                        ? 'bg-gray-700 border border-gray-600 text-white' 
                        : 'bg-white border border-gray-300 text-gray-900'
                    )}
                  >
                    <option value="">Select your time zone</option>
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-7">Mountain Time (UTC-7)</option>
                    <option value="UTC-6">Central Time (UTC-6)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC+0">London Time (UTC+0)</option>
                    <option value="UTC+8">Beijing Time (UTC+8)</option>
                  </select>
                </div>
                
                <div>
                  <label 
                    htmlFor="date" 
                    className={cn("block text-sm font-medium mb-2", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                  >
                    Preferred Date & Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className={cn(
                      "w-full px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                      theme === 'dark' 
                        ? 'bg-gray-700 border border-gray-600 text-white' 
                        : 'bg-white border border-gray-300 text-gray-900'
                    )}
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="message" 
                    className={cn("block text-sm font-medium mb-2", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                  >
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                      theme === 'dark' 
                        ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'
                    )}
                    placeholder="Any specific features you'd like to focus on during the demo?"
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
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <i className="fa-calendar-check mr-2"></i>
                      Schedule Demo
                    </>
                  )}
                </button>
                
                <div className={cn("text-sm text-center", theme === 'dark' ? 'text-gray-400' : 'text-gray-500')}>
                  Demos are typically 30 minutes long and conducted via Zoom
                </div>
              </form>
            </motion.div>
          </div>
          
          {/* Testimonials */}
          <div className="mt-24">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
              <p className={cn("text-lg max-w-2xl mx-auto", theme === 'dark' ? 'text-gray-300' : 'text-gray-600')}>
                See how GEO AI has helped businesses improve their brand visibility
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: 'Sarah Johnson',
                  title: 'Marketing Director, TechCorp',
                  quote: 'GEO AI has completely transformed how we monitor our brand presence. The AI-powered insights have helped us increase our visibility by 40% in just three months.',
                  image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=professional%20business%20woman%2C%20confident%20expression%2C%20corporate%20background&sign=ccd04c91b2dee03992545c98eed607c1'
                },
                {
                  name: 'Michael Chen',
                  title: 'CEO, GlobalRetail',
                  quote: 'The competitor analysis feature alone has been worth the investment. We now have clear insights into where we stand and how to differentiate ourselves in the market.',
                  image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=professional%20business%20man%2C%20confident%20expression%2C%20corporate%20background&sign=f8d8c478040748005165817229a048b7'
                },
                {
                  name: 'Emily Rodriguez',
                  title: 'Brand Manager, HealthPlus',
                  quote: 'The content optimization recommendations are spot on. Our team has been able to implement changes quickly and see measurable improvements in our search visibility.',
                  image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=professional%20business%20woman%2C%20confident%20expression%2C%20corporate%20background&sign=ccd04c91b2dee03992545c98eed607c1'
                }
              ].map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className={cn("p-6 rounded-xl shadow-md", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index + 0.5 }}
                >
                  <div className="mb-6">
                    <i className="fa-quote-left text-4xl text-blue-500 opacity-20"></i>
                  </div>
                  <p className="mb-6 italic">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className={cn("text-sm", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <section className={cn("py-20 mt-16", theme === 'dark' ? 'bg-gray-900' : 'bg-white')}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className={cn("max-w-4xl mx-auto rounded-2xl overflow-hidden relative", theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-600 to-purple-600')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
                <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
              </div>
              <div className="py-16 px-8 text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Boost Your Brand Visibility?</h2>
                <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                  Schedule a demo today and discover how GEO AI can help you improve your brand's online presence
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <motion.a 
                    href="/signup"
                    className="px-8 py-3 text-lg font-medium rounded-lg bg-white text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start 14-Day Free Trial
                  </motion.a>
                  <motion.button
                    onClick={() => {
                      // Scroll to the booking form
                      const formElement = document.querySelector('form');
                      if (formElement) {
                        formElement.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="px-8 py-3 text-lg font-medium rounded-lg bg-transparent border-2 border-white text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Schedule Demo
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
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