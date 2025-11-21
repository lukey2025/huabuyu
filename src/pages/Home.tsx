import { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

// Mock data - Brand Visibility Trend
const visibilityData = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 59 },
  { month: 'Mar', score: 80 },
  { month: 'Apr', score: 81 },
  { month: 'May', score: 56 },
  { month: 'Jun', score: 55 },
  { month: 'Jul', score: 72 },
  { month: 'Aug', score: 78 },
  { month: 'Sep', score: 85 },
  { month: 'Oct', score: 90 },
  { month: 'Nov', score: 95 },
  { month: 'Dec', score: 92 },
];

// Pricing plans data
const pricingPlans = [
  {
    name: 'Basic',
    price: '99',
    description: 'Perfect for individual brands or small businesses',
    features: [
      'Up to 5 projects',
      '10 AI scans per day',
      'Basic keyword analysis',
      'Email reports',
      'Community support'
    ],
    ctaText: 'Free Trial',
    highlight: false
  },
  {
    name: 'Pro',
    price: '299',
    description: 'Ideal for growing businesses and professional marketing teams',
    features: [
      'Up to 20 projects',
      '50 AI scans per day',
      'Advanced keyword analysis',
      'PDF report export',
      'Priority customer support',
      'Competitive comparison analysis'
    ],
    ctaText: 'Buy Now',
    highlight: true
  },
  {
    name: 'Enterprise',
    price: '999',
    description: 'Designed for large enterprises and marketing agencies',
    features: [
      'Unlimited projects',
      '200 AI scans per day',
      'Full-featured analysis suite',
      'Custom reports',
      '24/7 dedicated support',
      'Team collaboration features',
      'API access'
    ],
    ctaText: 'Contact Sales',
    highlight: false
  }
];

// Core features
const coreFeatures = [
  {
    icon: 'fa-brain',
    title: 'Multi-model AI Detection Engine',
    description: 'Integrates advanced models like ChatGPT, Perplexity, and DeepSeek for comprehensive brand online visibility analysis'
  },
  {
    icon: 'fa-chart-line',
    title: 'Real-time Trend Tracking',
    description: 'Continuously monitors brand keyword ranking changes to identify market opportunities and potential risks'
  },
  {
    icon: 'fa-eye',
    title: 'Competitor Analysis',
    description: 'Gain deep insights into competitor performance and receive competitive advantage strategies and differentiation recommendations'
  },
  {
    icon: 'fa-file-pdf',
    title: 'Professional Report Generation',
    description: 'Automatically generate detailed PDF reports with data visualizations and actionable optimization suggestions'
  },
  {
    icon: 'fa-bullhorn',
    title: 'Content Optimization Suggestions',
    description: 'AI-powered content optimization to enhance brand visibility and attractiveness in search results'
  },
  {
    icon: 'fa-clock',
    title: 'Scheduled Task Management',
    description: 'Set up automated scans and report delivery to stay updated on brand dynamics without manual monitoring'
  }
];

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className={cn("min-h-screen flex flex-col", theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900')}>
      {/* Navigation Bar */}
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
        {['Product', 'Features', 'Pricing', 'Cases', 'Support', 'Verify Email'].map((item, index) => (
          <motion.a 
            key={item}
            href={item === 'Verify Email' ? '/verify-email' : `#${item.toLowerCase()}`}
            className={cn("text-sm font-medium hover:text-blue-500 transition-colors", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            {item}
          </motion.a>
        ))}
              </nav>
            </div>
            <div className="flex items-center">
              <button 
                onClick={toggleTheme}
                className={cn("p-2 rounded-full mr-4", theme === 'dark' ? 'bg-gray-800 text-yellow-300' : 'bg-gray-100 text-gray-800')}
                aria-label="Toggle theme"
              >
                <i className={theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}></i>
              </button>
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
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md focus:outline-none"
                aria-label="Toggle menu"
              >
                <i className={isMenuOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars'}></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className={cn("md:hidden", theme === 'dark' ? 'bg-gray-800' : 'bg-white')}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['Product', 'Features', 'Pricing', 'Cases', 'Support'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={cn("block px-3 py-2 rounded-md text-base font-medium", theme === 'dark' ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900')}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="flex space-x-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <a
                  href="/login"
                  className={cn("block px-3 py-2 rounded-md text-base font-medium", theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800')}
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                >
                  Free Trial
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className={cn("py-20", theme === 'dark' ? 'bg-gray-900' : 'bg-white')}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI-Powered Brand Visibility Platform
                </span>
              </h1>
              <p className={cn("text-lg sm:text-xl mb-8", theme === 'dark' ? 'text-gray-300' : 'text-gray-600')}>
                Monitor, analyze, and optimize your brand's visibility across search engines and AI models to enhance brand influence and market competitiveness
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.a 
                  href="/signup"
                  className="px-8 py-3 text-lg font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start 14-Day Free Trial
                </motion.a>
                <motion.a 
                  href="#demo"
                  className={cn("px-8 py-3 text-lg font-medium rounded-lg flex items-center justify-center gap-2", theme === 'dark' ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fa-solid fa-play-circle"></i>
                  Watch Demo
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Data Visualization Section */}
        <section id="product" className={cn("py-16", theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50')}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-4">Real-time Brand Visibility Tracking</h2>
              <p className={cn("text-lg max-w-2xl mx-auto", theme === 'dark' ? 'text-gray-300' : 'text-gray-600')}>
                Continuously monitor your brand's performance across search engines and large language models through advanced AI analysis
              </p>
            </motion.div>
            
            <motion.div 
              className={cn("bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-10", theme === 'dark' ? 'border border-gray-700' : 'border border-gray-100')}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xl font-semibold mb-6">Brand Visibility Trend (2025)</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={visibilityData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke={theme === 'dark' ? '#9ca3af' : '#4b5563'} />
                    <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#4b5563'} />
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                        borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                        color: theme === 'dark' ? '#f9fafb' : '#111827'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#3b82f6" 
                      fillOpacity={1} 
                      fill="url(#colorScore)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'AI Mention Rate', value: '92%', change: '+12%', icon: 'fa-chart-pie' },
                { title: 'Search Visibility', value: '87%', change: '+8%', icon: 'fa-search' },
                { title: 'Sentiment Score', value: '94/100', change: '+5%', icon: 'fa-smile' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  className={cn("bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md", theme === 'dark' ? 'border border-gray-700' : 'border border-gray-100')}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={cn("text-lg font-medium", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}>{stat.title}</h3>
                    <div className={cn("p-2 rounded-full", theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600')}>
                      <i className={`fa-solid ${stat.icon}`}></i>
                    </div>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{stat.value}</span>
                    <span className="ml-2 text-sm font-medium text-green-500">{stat.change}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Core Features Section */}
        <section id="features" className={cn("py-16", theme === 'dark' ? 'bg-gray-900' : 'bg-white')}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-4">Powerful Features, Simple Operation</h2>
              <p className={cn("text-lg max-w-2xl mx-auto", theme === 'dark' ? 'text-gray-300' : 'text-gray-600')}>
                GEO AI provides comprehensive brand visibility management tools to help you optimize your online presence and enhance brand influence
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {coreFeatures.map((feature, index) => (
                <motion.div 
                  key={feature.title}
                  className={cn("p-6 rounded-xl", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-100')}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={cn("p-3 rounded-lg inline-block mb-4", theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600')}>
                    <i className={`fa-solid ${feature.icon} text-xl`}></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className={cn("", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className={cn("py-16", theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50')}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
              <p className={cn("text-lg max-w-2xl mx-auto", theme === 'dark' ? 'text-gray-300' : 'text-gray-600')}>
                Whether you're an individual brand, growing business, or large enterprise, we have solutions to meet your needs
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <motion.div 
                  key={plan.name}
                  className={cn(
                    "rounded-2xl overflow-hidden transition-all duration-300",
                    plan.highlight 
                      ? `${theme === 'dark' ? 'bg-gradient-to-b from-blue-900/40 to-gray-900 border-blue-500/50' : 'bg-gradient-to-b from-blue-50 to-white border-blue-200'} shadow-lg relative` 
                      : `${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'} shadow`
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {plan.highlight && (
                    <div className="absolute top-0 inset-x-0 bg-blue-600 text-white text-center py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="p-8 pt-10">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <p className={cn("text-sm mb-6", theme === 'dark' ? 'text-gray-400' : 'text-gray-500')}>
                      {plan.description}
                    </p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">¥{plan.price}</span>
                      <span className={cn("text-base", theme === 'dark' ? 'text-gray-400' : 'text-gray-500')}>
                        /month
                      </span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <i className="fa-solid fa-check text-green-500 mt-1 mr-3"></i>
                          <span className={cn(theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <motion.a 
                      href={plan.ctaText === 'Contact Sales' ? '/contact' : '/signup'}
                      className={cn(
                        "block text-center py-3 px-4 rounded-lg font-medium",
                        plan.highlight 
                          ? "bg-blue-600 text-white hover:bg-blue-700" 
                          : `${theme === 'dark' ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200'}`
                      )}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {plan.ctaText}
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className={cn("py-20", theme === 'dark' ? 'bg-gray-900' : 'bg-white')}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className={cn("max-w-4xl mx-auto rounded-2xl overflow-hidden relative", theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-600 to-purple-600')}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
                <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
              </div>
              <div className="py-16 px-8 text-center relative z-10"><h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Start Enhancing Your Brand Visibility</h2>
                <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                  Join thousands of businesses using GEO AI to optimize their brand's performance across search engines and AI models
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
                  <motion.a 
                    href="/demo"
                    className="px-8 py-3 text-lg font-medium rounded-lg bg-transparent border-2 border-white text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Schedule Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
                    aria-label={`Visit our ${social}`}
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
                <a href="/privacy" className="hover:underline">Privacy Policy</a>
                <a href="/terms" className="hover:underline">Terms of Service</a>
                <a href="/cookies" className="hover:underline">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}