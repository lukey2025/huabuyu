import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ScanResults() {
  const { theme } = useTheme();
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [scanResults, setScanResults] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('proj_1');

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
        const mockResults = [
          {
            id: 'scan_1',
            projectId: 'proj_1',
            projectName: 'Brand X',
            date: '2023-04-15',
            models: ['ChatGPT', 'Perplexity', 'DeepSeek'],
            results: {
              mentionRate: 92,
              sentimentScore: 94,
              keywordRanking: {
                'Brand X': 85,
                'Product Y': 72,
                'Service Z': 68,
                'Solution A': 92,
                'Feature B': 63
              },
              modelComparison: [
                { name: 'ChatGPT', mentionRate: 95, sentimentScore: 92 },
                { name: 'Perplexity', mentionRate: 89, sentimentScore: 96 },
                { name: 'DeepSeek', mentionRate: 90, sentimentScore: 94 }
              ],
              competitorAnalysis: [
                { name: 'Brand X', score: 87 },
                { name: 'Competitor A', score: 82 },
                { name: 'Competitor B', score: 76 },
                { name: 'Competitor C', score: 68 }
              ]
            }
          },
          {
            id: 'scan_2',
            projectId: 'proj_2',
            projectName: 'Tech Solutions',
            date: '2023-04-14',
            models: ['ChatGPT', 'DeepSeek'],
            results: {
              mentionRate: 75,
              sentimentScore: 88,
              keywordRanking: {},
              modelComparison: [
                { name: 'ChatGPT', mentionRate: 78, sentimentScore: 86 },
                { name: 'DeepSeek', mentionRate: 72, sentimentScore: 90 }
              ],
              competitorAnalysis: []
            }
          },
          {
            id: 'scan_3',
            projectId: 'proj_3',
            projectName: 'Global Retail',
            date: '2023-04-13',
            models: ['Perplexity'],
            results: {
              mentionRate: 68,
              sentimentScore: 85,
              keywordRanking: {},
              modelComparison: [
                { name: 'Perplexity', mentionRate: 68, sentimentScore: 85 }
              ],
              competitorAnalysis: []
            }
          }
        ];
        
        setScanResults(mockResults);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching scan results:', error);
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  const currentScan = scanResults.find(scan => scan.projectId === selectedProject);
  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981'];

  if (loading) {
    return (
      <div className={cn("min-h-screen flex items-center justify-center", theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900')}>
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4">Loading scan results...</p>
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
                  className={cn("text-sm font-medium text-blue-500 border-b-2 border-blue-500 pb-1", theme === 'dark' ? 'text-blue-400 border-blue-400' : 'text-blue-600 border-blue-600')}
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
                  className={cn("text-sm font-medium hover:text-blue-500 transition-colors", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                >
                  Optimization
                </a>
              </nav>
            </div>
            <div className="flex items-center">
              <button
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <i className="fa-play-circle mr-2"></i> Run New Scan
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Scan Results</h1>
          <p className={cn("mt-1", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
            Analyze your brand's performance across different AI models
          </p>
        </div>

        {/* Project Selector */}
        <div className="mb-8">
          <label className={cn("block text-sm font-medium mb-2", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}>
            Select Project
          </label>
          <div className="flex flex-wrap gap-2">
            {scanResults.map((scan) => (
              <button
                key={scan.projectId}
                onClick={() => setSelectedProject(scan.projectId)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm transition-all duration-200",
                  selectedProject === scan.projectId
                    ? `${theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'} font-medium`
                    : `${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}`
                )}
              >
                {scan.projectName}
              </button>
            ))}
          </div>
        </div>

        {currentScan ? (
          <>
            {/* Scan Summary */}
            <motion.div 
              className={cn("p-6 rounded-xl shadow-md mb-8", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold">{currentScan.projectName}</h2>
                  <p className={cn("text-sm", theme === 'dark' ? 'text-gray-400' : 'text-gray-500')}>
                    Scan Date: {currentScan.date} | Models Used: {currentScan.models.join(', ')}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <button
                    className={cn(
                      "px-4 py-2 rounded-md transition-colors flex items-center",
                      theme === 'dark' 
                        ? 'bg-gray-700 text-white hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    )}
                  >
                    <i className="fa-download mr-2"></i> Export PDF
                  </button>
                  <button
                    className={cn(
                      "px-4 py-2 rounded-md transition-colors flex items-center",
                      theme === 'dark' 
                        ? 'bg-gray-700 text-white hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    )}
                  >
                    <i className="fa-refresh mr-2"></i> Rescan
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className={cn("p-4 rounded-lg", theme === 'dark' ? 'bg-gray-900' : 'bg-blue-50')}>
                  <h3 className={cn("text-sm font-medium mb-1", theme === 'dark' ? 'text-gray-400' : 'text-blue-700')}>AI Mention Rate</h3>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold">{currentScan.results.mentionRate}%</span>
                    <span className="ml-2 text-green-500 text-sm">+5%</span>
                  </div>
                </div>
                <div className={cn("p-4 rounded-lg", theme === 'dark' ? 'bg-gray-900' : 'bg-purple-50')}>
                  <h3 className={cn("text-sm font-medium mb-1", theme === 'dark' ? 'text-gray-400' : 'text-purple-700')}>Sentiment Score</h3>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold">{currentScan.results.sentimentScore}/100</span>
                    <span className="ml-2 text-green-500 text-sm">+2%</span>
                  </div>
                </div>
                <div className={cn("p-4 rounded-lg", theme === 'dark' ? 'bg-gray-900' : 'bg-green-50')}>
                  <h3 className={cn("text-sm font-medium mb-1", theme === 'dark' ? 'text-gray-400' : 'text-green-700')}>Visibility Rank</h3>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold">#1</span>
                    <span className="ml-2 text-green-500 text-sm">vs competitors</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Charts and Data Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Model Comparison */}
              <motion.div 
                className={cn("p-6 rounded-xl shadow-md", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-6">Model Comparison</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={currentScan.results.modelComparison}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                      <XAxis dataKey="name" stroke={theme === 'dark' ? '#9ca3af' : '#4b5563'} />
                      <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#4b5563'} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                          borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                          color: theme === 'dark' ? '#f9fafb' : '#111827'
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="mentionRate" name="Mention Rate (%)" fill="#3b82f6" />
                      <Bar dataKey="sentimentScore" name="Sentiment Score" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Competitor Analysis */}
              <motion.div 
                className={cn("p-6 rounded-xl shadow-md", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold mb-6">Competitor Analysis</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={currentScan.results.competitorAnalysis}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="score"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {currentScan.results.competitorAnalysis.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                          borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                          color: theme === 'dark' ? '#f9fafb' : '#111827'
                        }}
                        formatter={(value) => [`Visibility Score: ${value}`, '']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            {/* Keyword Performance */}
            <motion.div 
              className={cn("p-6 rounded-xl shadow-md mb-8", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-6">Keyword Performance</h3>
              <div className="space-y-6">
                {Object.entries(currentScan.results.keywordRanking).map(([keyword, score], index) => (
                  <div key={keyword}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">{keyword}</div>
                      <div className="text-sm font-medium">{score}%</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${score}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 1, delay: 0.1 * index }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Model Responses */}
            <motion.div 
              className={cn("p-6 rounded-xl shadow-md", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold mb-6">Model Responses</h3>
              <div className="space-y-6">
                {currentScan.models.map((model, index) => (
                  <div key={model} className={cn("p-4 rounded-lg", theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50')}>
                    <div className="flex items-center mb-3">
                      <div className={`p-2 rounded-md text-white mr-3`} style={{ backgroundColor: COLORS[index % COLORS.length] }}>
                        <i className="fa-robot"></i>
                      </div>
                      <h4 className="font-medium">{model}</h4>
                    </div>
                    <p className={cn("text-sm", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}>
                      {model === 'ChatGPT' && 
                        "Brand X is a leading provider of innovative solutions with a strong market presence. Their products are known for quality and reliability, making them a top choice among consumers and businesses alike."}
                      {model === 'Perplexity' && 
                        "Based on available information, Brand X has established itself as an industry leader with high customer satisfaction ratings. They continue to innovate and expand their product offerings to meet evolving market demands."}
                      {model === 'DeepSeek' && 
                        "Brand X demonstrates consistent performance across key metrics including product quality, customer service, and brand recognition. They maintain a competitive edge through strategic market positioning and continuous improvement."}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        ) : (
          <div className={cn("p-12 rounded-xl shadow-md text-center", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}>
            <div className={cn("p-6 rounded-full inline-flex items-center justify-center mb-6", theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100')}>
              <i className="fa-search text-3xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">No Scan Results</h3>
            <p className={cn("mb-6 max-w-md mx-auto", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
              No scan has been performed for this project yet. Run a scan to analyze your brand's visibility across AI models.
            </p>
            <button
              className="px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <i className="fa-play-circle mr-2"></i> Run First Scan
            </button>
          </div>
        )}
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