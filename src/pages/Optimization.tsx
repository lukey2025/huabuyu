import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Optimization() {
  const { theme } = useTheme();
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('proj_1');
  const [optimizationType, setOptimizationType] = useState<string>('faq');
  const [keywords, setKeywords] = useState<string>('');
  const [optimizations, setOptimizations] = useState<any[]>([]);
  const [selectedOptimization, setSelectedOptimization] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('authToken');
    if (!isAuthenticated && !token) {
      navigate('/login');
      return;
    }
    
    // For demo purposes, we'll use mock data
    try {
      // Simulate loading delay
      setTimeout(() => {
        const mockProjects = [
          { id: 'proj_1', name: 'Brand X', domain: 'brandx.com' },
          { id: 'proj_2', name: 'Tech Solutions', domain: 'techsolutions.io' },
          { id: 'proj_3', name: 'Global Retail', domain: 'globalretail.com' }
        ];
        
        const mockOptimizations = [
          {
            id: 'opt_1',
            projectId: 'proj_1',
            title: 'FAQ Content for Product Y',
            type: 'faq',
            date: '2023-04-15',
            status: 'generated',
            content: [
              {
                question: 'What makes Product Y different from competitors?',
                answer: 'Product Y stands out due to its innovative approach to solving common industry challenges. Unlike traditional solutions, it leverages advanced AI technology to deliver more accurate results with significantly less manual intervention required.'
              },
              {
                question: 'How long does it take to implement Product Y?',
                answer: 'Most customers can fully implement Product Y within 2-4 weeks, depending on the complexity of their existing systems. Our implementation team works closely with each client to ensure a smooth transition and minimal disruption to business operations.'
              },
              {
                question: 'What kind of support is available for Product Y users?',
                answer: 'We offer comprehensive support for all Product Y users, including 24/7 technical assistance, detailed documentation, regular webinars, and access to our dedicated customer success team. Enterprise clients also receive personalized account management.'
              }
            ]
          },
          {
            id: 'opt_2',
            projectId: 'proj_1',
            title: 'Page Optimization for Service Z',
            type: 'page',
            date: '2023-04-10',
            status: 'generated',
            content: {
              title: 'Enhance Your Business with Service Z - Comprehensive Solutions for Modern Enterprises',
              metaDescription: 'Discover how Service Z can transform your business operations with cutting-edge technology and industry-leading expertise. Schedule a demo today.',
              keywords: 'service z, business solutions, enterprise software, operational efficiency',
              recommendations: [
                'Add structured data markup to improve search engine understanding',
                'Optimize page loading speed by compressing images and leveraging browser caching',
                'Enhance user experience with clearer navigation and call-to-action buttons'
              ]
            }
          },
          {
            id: 'opt_3',
            projectId: 'proj_2',
            title: 'Structured Data for Tech Solutions Homepage',
            type: 'structured',
            date: '2023-04-05',
            status: 'generated',
            content: {
              code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Tech Solutions",
  "url": "https://techsolutions.io",
  "logo": "https://techsolutions.io/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-123-456-7890",
    "contactType": "customer support"
  },
  "sameAs": [
    "https://www.facebook.com/techsolutions",
    "https://twitter.com/techsolutions",
    "https://www.linkedin.com/company/techsolutions"
  ]
}
</script>`
            }
          }
        ];
        
        setProjects(mockProjects);
        setOptimizations(mockOptimizations);
        if (mockOptimizations.length > 0) {
          setSelectedOptimization(mockOptimizations[0].id);
        }
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error loading optimization data:', error);
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  const currentOptimization = optimizations.find(opt => opt.id === selectedOptimization);

  const handleGenerate = () => {
    if (!keywords.trim()) {
      toast.error('Please enter keywords for optimization');
      return;
    }
    
    setGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newOptimization = {
        id: `opt_${Date.now()}`,
        projectId: selectedProject,
        title: `${optimizationType.toUpperCase()} Optimization for ${keywords}`,
        type: optimizationType,
        date: new Date().toISOString().split('T')[0],
        status: 'generated',
        content: optimizationType === 'faq' 
          ? [
              {
                question: `What is ${keywords}?`,
                answer: `[Generated] ${keywords} is a comprehensive solution designed to help businesses achieve their goals through innovative approaches and cutting-edge technology.`
              },
              {
                question: `How can ${keywords} benefit my business?`,
                answer: `[Generated] Implementing ${keywords} can lead to improved efficiency, cost savings, and enhanced customer satisfaction for your business.`
              }
            ]
          : optimizationType === 'page'
            ? {
                title: `[Generated] ${keywords} - Comprehensive Solutions for Your Business`,
                metaDescription: `[Generated] Discover how ${keywords} can transform your operations and drive growth for your organization.`,
                keywords: keywords,
                recommendations: [
                  `[Generated] Optimize content to include relevant variations of ${keywords}`,
                  `[Generated] Improve page structure to enhance user experience for ${keywords}-related queries`
                ]
              }
            : {
                code: `[Generated] Structured data for ${keywords} would be added here.`
              }
      };
      
      setOptimizations([newOptimization, ...optimizations]);
      setSelectedOptimization(newOptimization.id);
      setKeywords('');
      setGenerating(false);
      toast.success('Optimization content generated successfully');
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  if (loading) {
    return (
      <div className={cn("min-h-screen flex items-center justify-center", theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900')}>
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4">Loading optimization tools...</p>
        </div>
      </div>
    );
  }

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
                  href="/dashboard"
                  className={cn("text-sm font-medium hover:text-blue-500 transition-colors", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                >
                  Dashboard
                </a>
                <a 
                  href="/projects"
                  className={cn("text-sm font-medium hover:text-blue-500 transition-colors", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                >
                  Projects
                </a>
                <a 
                  href="/scan-results"
                  className={cn("text-sm font-medium hover:text-blue-500 transition-colors", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                >
                  Scan Results
                </a>
                <a 
                  href="/reports"
                  className={cn("text-sm font-medium hover:text-blue-500 transition-colors", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                >
                  Reports
                </a>
                <a 
                  href="/optimization"
                  className={cn("text-sm font-medium text-blue-500 border-b-2 border-blue-500 pb-1", theme === 'dark' ? 'text-blue-400 border-blue-400' : 'text-blue-600 border-blue-600')}
                >
                  Optimization
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Content Optimization</h1>
          <p className={cn("mt-1", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
            Generate AI-powered content optimizations to improve your brand visibility
          </p>
        </div>

        {/* Generation Form */}
        <motion.div 
          className={cn("p-6 rounded-xl shadow-md mb-8", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-6">Generate Optimization</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label 
                htmlFor="project" 
                className={cn("block text-sm font-medium mb-2", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
              >
                Project
              </label>
              <select
                id="project"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className={cn(
                  "w-full px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                  theme === 'dark' 
                    ? 'bg-gray-700 border border-gray-600 text-white' 
                    : 'bg-white border border-gray-300 text-gray-900'
                )}
              >
                {projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label 
                htmlFor="optimizationType" 
                className={cn("block text-sm font-medium mb-2", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
              >
                Optimization Type
              </label>
              <select
                id="optimizationType"
                value={optimizationType}
                onChange={(e) => setOptimizationType(e.target.value)}
                className={cn(
                  "w-full px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                  theme === 'dark' 
                    ? 'bg-gray-700 border border-gray-600 text-white' 
                    : 'bg-white border border-gray-300 text-gray-900'
                )}
              >
                <option value="faq">FAQ Content</option>
                <option value="page">Page Optimization</option>
                <option value="structured">Structured Data</option>
              </select>
            </div>
            
            <div>
              <label 
                htmlFor="keywords" 
                className={cn("block text-sm font-medium mb-2", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
              >
                Target Keywords
              </label>
              <input
                type="text"
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Enter keywords separated by commas"
                className={cn(
                  "w-full px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                  theme === 'dark' 
                    ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'
                )}
              />
            </div>
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={generating}
            className={cn(
              "px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center",
              generating 
                ? 'bg-blue-500/80 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700',
              'text-white'
            )}
          >
            {generating ? (
              <>
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                Generating...
              </>
            ) : (
              <>
                <i className="fa-magic mr-2"></i>
                Generate Content
              </>
            )}
          </button>
        </motion.div>

        {/* Optimizations List and Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Optimizations List */}
          <div className={cn("lg:col-span-1 p-6 rounded-xl shadow-md", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}>
            <h3 className="text-lg font-semibold mb-6">Optimization History</h3>
            <div className="space-y-3">
              {optimizations.length > 0 ? (
                optimizations.map((optimization) => (
                  <motion.button
                    key={optimization.id}
                    onClick={() => setSelectedOptimization(optimization.id)}
                    className={cn(
                      "w-full p-4 rounded-lg text-left transition-all duration-200",
                      selectedOptimization === optimization.id
                        ? `${theme === 'dark' ? 'bg-blue-900/30 border-blue-500/50' : 'bg-blue-50 border-blue-200'} border font-medium`
                        : `${theme === 'dark' ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-50 hover:bg-gray-100'} border-0`
                    )}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="font-medium">{optimization.title}</div>
                    <div className="flex justify-between items-center mt-1">
                      <div className={cn("text-sm", theme === 'dark' ? 'text-gray-400' : 'text-gray-500')}>
                        {optimization.date}
                      </div>
                      <div className={cn("text-xs px-2 py-0.5 rounded-full", 
                        optimization.status === 'generated' 
                          ? theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                          : theme === 'dark' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
                      )}>
                        {optimization.status.charAt(0).toUpperCase() + optimization.status.slice(1)}
                      </div>
                    </div>
                  </motion.button>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className={cn("p-4 rounded-full inline-flex items-center justify-center mb-4", theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100')}>
                    <i className="fa-lightbulb"></i>
                  </div>
                  <p className={cn("mb-4", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
                    No optimizations yet
                  </p>
                  <button
                    onClick={() => document.getElementById('keywords')?.focus()}
                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <i className="fa-plus mr-2"></i> Generate First Optimization
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Optimization Detail */}
          {currentOptimization ? (
            <motion.div 
              className={cn("lg:col-span-3 p-6 rounded-xl shadow-md", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h2 className="text-xl font-bold">{currentOptimization.title}</h2>
                  <div className="flex items-center mt-2 space-x-4">
                    <div className={cn("text-sm", theme === 'dark' ? 'text-gray-400' : 'text-gray-500')}>Date: {currentOptimization.date}
                    </div>
                    <div className={cn("text-xs px-2 py-0.5 rounded-full", 
                      currentOptimization.status === 'generated' 
                        ? theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                        : theme === 'dark' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
                    )}>
                      {currentOptimization.status.charAt(0).toUpperCase() + currentOptimization.status.slice(1)}
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <button
                    onClick={() => {
                      // For demo purposes, just copy some text
                      let textToCopy = '';
                      if (currentOptimization.type === 'faq') {
                        textToCopy = currentOptimization.content.map((item: any) => 
                          `${item.question}\n${item.answer}`
                        ).join('\n\n');
                      } else if (currentOptimization.type === 'page') {
                        textToCopy = `${currentOptimization.content.title}\n${currentOptimization.content.metaDescription}`;
                      } else {
                        textToCopy = currentOptimization.content.code;
                      }
                      copyToClipboard(textToCopy);
                    }}
                    className={cn(
                      "px-4 py-2 rounded-md transition-colors flex items-center",
                      theme === 'dark' 
                        ? 'bg-gray-700 text-white hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    )}
                  >
                    <i className="fa-copy mr-2"></i> Copy to Clipboard
                  </button>
                  <button
                    className={cn(
                      "px-4 py-2 rounded-md transition-colors flex items-center",
                      theme === 'dark' 
                        ? 'bg-gray-700 text-white hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    )}
                  >
                    <i className="fa-download mr-2"></i> Export
                  </button>
                </div>
              </div>
              
              {/* FAQ Content */}
              {currentOptimization.type === 'faq' && (
                <div className="space-y-6">
                  {currentOptimization.content.map((item: any, index: number) => (
                    <motion.div 
                      key={index}
                      className={cn("p-6 rounded-lg", theme === 'dark' ? 'bg-gray-900' : 'bg-white border border-gray-100 shadow-sm')}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <h3 className="text-lg font-semibold mb-3">{item.question}</h3>
                      <p className={cn(theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}>
                        {item.answer}
                      </p>
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => copyToClipboard(item.answer)}
                          className={cn(
                            "text-sm transition-colors flex items-center",
                            theme === 'dark' 
                              ? 'text-blue-400 hover:text-blue-300' 
                              : 'text-blue-600 hover:text-blue-700'
                          )}
                        >
                          <i className="fa-copy mr-1"></i> Copy Answer
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* Page Optimization */}
              {currentOptimization.type === 'page' && (
                <div>
                  <div className={cn("p-6 rounded-lg mb-6", theme === 'dark' ? 'bg-gray-900' : 'bg-white border border-gray-100 shadow-sm')}>
                    <div className="mb-4">
                      <h3 className="text-sm font-medium mb-2">Page Title</h3>
                      <p className="font-semibold">{currentOptimization.content.title}</p>
                      <div className="mt-2 flex justify-end">
                        <button
                          onClick={() => copyToClipboard(currentOptimization.content.title)}
                          className={cn(
                            "text-sm transition-colors flex items-center",
                            theme === 'dark' 
                              ? 'text-blue-400 hover:text-blue-300' 
                              : 'text-blue-600 hover:text-blue-700'
                          )}
                        >
                          <i className="fa-copy mr-1"></i> Copy
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-sm font-medium mb-2">Meta Description</h3>
                      <p>{currentOptimization.content.metaDescription}</p>
                      <div className="mt-2 flex justify-end">
                        <button
                          onClick={() => copyToClipboard(currentOptimization.content.metaDescription)}
                          className={cn(
                            "text-sm transition-colors flex items-center",
                            theme === 'dark' 
                              ? 'text-blue-400 hover:text-blue-300' 
                              : 'text-blue-600 hover:text-blue-700'
                          )}
                        >
                          <i className="fa-copy mr-1"></i> Copy
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Target Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentOptimization.content.keywords.split(',').map((keyword: string, index: number) => (
                          <span 
                            key={index}
                            className={cn("px-3 py-1 rounded-full text-sm", theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100')}
                          >
                            {keyword.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Optimization Recommendations</h3>
                    <div className="space-y-3">
                      {currentOptimization.content.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start">
                          <div className="mr-3 mt-1">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center bg-blue-600 text-white text-xs">
                              {index + 1}
                            </div>
                          </div>
                          <p>{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Structured Data */}
              {currentOptimization.type === 'structured' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Structured Data Code</h3>
                    <button
                      onClick={() => copyToClipboard(currentOptimization.content.code)}
                      className={cn(
                        "text-sm px-3 py-1 rounded-md transition-colors flex items-center",
                        theme === 'dark' 
                          ? 'bg-gray-700 text-white hover:bg-gray-600' 
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      )}
                    >
                      <i className="fa-copy mr-1"></i> Copy Code
                    </button>
                  </div>
                  
                  <div className={cn("p-4 rounded-lg font-mono text-sm overflow-x-auto", theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100')}>
                    <pre>{currentOptimization.content.code}</pre>
                  </div>
                  
                  <div className={cn("mt-6 p-4 rounded-lg", theme === 'dark' ? 'bg-blue-900/20 border border-blue-900/50' : 'bg-blue-50 border border-blue-100')}>
                    <h4 className="font-medium mb-2 flex items-center">
                      <i className="fa-info-circle mr-2 text-blue-500"></i>
                      Implementation Instructions
                    </h4>
                    <p className={cn("text-sm", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}>
                      Copy the structured data code above and paste it into the &lt;head&gt; section of your website. 
                      This will help search engines better understand your content and may improve your visibility in search results.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <div className={cn("lg:col-span-3 p-12 rounded-xl shadow-md text-center", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}>
              <div className={cn("p-6 rounded-full inline-flex items-center justify-center mb-6", theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100')}>
                <i className="fa-lightbulb text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Select an Optimization</h3>
              <p className={cn("mb-6 max-w-md mx-auto", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
                Choose an optimization from the list to view its details
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className={cn("py-6", theme === 'dark' ? 'bg-gray-900 border-t border-gray-800' : 'bg-white border-t border-gray-100')}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={cn("text-sm", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
                 © 2025 HUABUYU AI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className={cn("text-sm hover:underline", theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900')}>
                Privacy Policy
              </a>
              <a href="#" className={cn("text-sm hover:underline", theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900')}>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}