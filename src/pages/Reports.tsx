import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Reports() {
  const { theme } = useTheme();
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<any[]>([]);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

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
        const mockReports = [
          {
            id: 'report_1',
            projectId: 'proj_1',
            projectName: 'Brand X',
            title: 'Monthly Visibility Report',
            date: '2023-04-01',
            type: 'monthly',
            trendData: [
              { month: 'Jan', visibility: 65, mentions: 42, sentiment: 88 },
              { month: 'Feb', visibility: 59, mentions: 38, sentiment: 86 },
              { month: 'Mar', visibility: 80, mentions: 53, sentiment: 90 },
              { month: 'Apr', visibility: 81, mentions: 58, sentiment: 92 },
              { month: 'May', visibility: 87, mentions: 62, sentiment: 94 },
            ],
            summary: "Brand visibility has increased by 34% compared to the previous month, with significant improvements in AI model mentions and positive sentiment."
          },
          {
            id: 'report_2',
            projectId: 'proj_1',
            projectName: 'Brand X',
            title: 'Competitor Analysis Report',
            date: '2023-03-15',
            type: 'competitive',
            trendData: [],
            summary: "Brand X maintains a competitive edge over competitors with 15% higher visibility score and more positive sentiment in AI model responses."
          },
          {
            id: 'report_3',
            projectId: 'proj_2',
            projectName: 'Tech Solutions',
            title: 'Quarterly Performance Report',
            date: '2023-03-31',
            type: 'quarterly',
            trendData: [
              { month: 'Jan', visibility: 60, mentions: 35, sentiment: 85 },
              { month: 'Feb', visibility: 65, mentions: 40, sentiment: 86 },
              { month: 'Mar', visibility: 75, mentions: 45, sentiment: 88 },
            ],
            summary: "Tech Solutions has shown steady growth throughout Q1, with a 25% increase in brand visibility and improved sentiment scores across all measured AI models."
          }
        ];
        
        setReports(mockReports);
        if (mockReports.length > 0) {
          setSelectedReport(mockReports[0].id);
        }
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  const currentReport = reports.find(report => report.id === selectedReport);

  if (loading) {
    return (
      <div className={cn("min-h-screen flex items-center justify-center", theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900')}>
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4">Loading reports...</p>
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
                  className={cn("text-sm font-medium text-blue-500 border-b-2 border-blue-500 pb-1", theme === 'dark' ? 'text-blue-400 border-blue-400' : 'text-blue-600 border-blue-600')}
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
                <i className="fa-file-pdf mr-2"></i> Generate Report
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className={cn("mt-1", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
            View and manage your brand visibility reports
          </p>
        </div>

        {/* Reports List and Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Reports List */}
          <div className={cn("lg:col-span-1 p-6 rounded-xl shadow-md", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}>
            <h3 className="text-lg font-semibold mb-6">Report List</h3>
            <div className="space-y-3">
              {reports.length > 0 ? (
                reports.map((report) => (
                  <motion.button
                    key={report.id}
                    onClick={() => setSelectedReport(report.id)}
                    className={cn(
                      "w-full p-4 rounded-lg text-left transition-all duration-200",
                      selectedReport === report.id
                        ? `${theme === 'dark' ? 'bg-blue-900/30 border-blue-500/50' : 'bg-blue-50 border-blue-200'} border font-medium`
                        : `${theme === 'dark' ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-50 hover:bg-gray-100'} border-0`
                    )}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="font-medium">{report.title}</div>
                    <div className={cn("text-sm mt-1", theme === 'dark' ? 'text-gray-400' : 'text-gray-500')}>
                      {report.projectName} • {report.date}
                    </div>
                  </motion.button>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className={cn("p-4 rounded-full inline-flex items-center justify-center mb-4", theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100')}>
                    <i className="fa-file-alt"></i>
                  </div>
                  <p className={cn("mb-4", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
                    No reports available
                  </p>
                  <button
                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <i className="fa-plus mr-2"></i> Generate First Report
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Report Detail */}
          {currentReport ? (
            <motion.div 
              className={cn("lg:col-span-3 p-6 rounded-xl shadow-md", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h2 className="text-xl font-bold">{currentReport.title}</h2>
                  <div className="flex items-center mt-2 space-x-4">
                    <div className={cn("text-sm", theme === 'dark' ? 'text-gray-400' : 'text-gray-500')}>
                      Project: {currentReport.projectName}
                    </div>
                    <div className={cn("text-sm", theme === 'dark' ? 'text-gray-400' : 'text-gray-500')}>
                      Date: {currentReport.date}
                    </div>
                    <div className={cn("text-sm px-2 py-0.5 rounded-full", theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600')}>
                      {currentReport.type.charAt(0).toUpperCase() + currentReport.type.slice(1)}
                    </div>
                  </div>
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
                    <i className="fa-share-alt mr-2"></i> Share
                  </button>
                </div>
              </div>
              
              {/* Report Summary */}
              <div className={cn("p-6 rounded-lg mb-8", theme === 'dark' ? 'bg-gray-900' : 'bg-blue-50')}>
                <h3 className="text-lg font-semibold mb-4">Report Summary</h3>
                <p className={cn(theme === 'dark' ? 'text-gray-300' : 'text-gray-800')}>
                  {currentReport.summary}
                </p>
              </div>
              
              {/* Report Charts */}
              {currentReport.trendData && currentReport.trendData.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-6">Performance Trends</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={currentReport.trendData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                        <XAxis dataKey="month" stroke={theme === 'dark' ? '#9ca3af' : '#4b5563'} />
                        <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#4b5563'} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                            borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                            color: theme === 'dark' ? '#f9fafb' : '#111827'
                          }} 
                        />
                        <Legend />
                        <Line type="monotone" dataKey="visibility" name="Visibility Score" stroke="#3b82f6" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="mentions" name="AI Mentions" stroke="#8b5cf6" />
                        <Line type="monotone" dataKey="sentiment" name="Sentiment Score" stroke="#10b981" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
              
              {/* Key Insights */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-6">Key Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: 'Visibility Growth',
                      description: 'Consistent upward trend in brand visibility across all measured AI models',
                      icon: 'fa-chart-line',
                      color: 'blue'
                    },
                    {
                      title: 'Positive Sentiment',
                      description: 'Sentiment scores have improved by 8% compared to the previous period',
                      icon: 'fa-smile',
                      color: 'green'
                    },
                    {
                      title: 'Competitive Advantage',
                      description: 'Maintaining a 15% visibility lead over closest competitor',
                      icon: 'fa-trophy',
                      color: 'purple'
                    },
                    {
                      title: 'Content Opportunities',
                      description: 'Identified 3 key areas for content optimization to improve visibility',
                      icon: 'fa-lightbulb',
                      color: 'amber'
                    }
                  ].map((insight, index) => (
                    <motion.div 
                      key={insight.title}
                      className={cn("p-4 rounded-lg", theme === 'dark' ? 'bg-gray-900' : 'bg-white border border-gray-100 shadow-sm')}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <div className="flex items-start">
                        <div className={`p-2 rounded-md text-white mr-3 bg-${insight.color}-600`}>
                          <i className={`fa-solid ${insight.icon}`}></i>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{insight.title}</h4>
                          <p className={cn("text-sm", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
                            {insight.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Recommendations */}
              <div className={cn("p-6 rounded-lg", theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50')}>
                <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
                <div className="space-y-4">
                  {[
                    'Optimize content to include relevant keywords identified in the AI model responses',
                    'Create targeted content addressing the topics where competitor visibility is higher',
                    'Monitor sentiment trends and address any emerging issues proactively',
                    'Leverage the high-performing content formats identified in the analysis'
                  ].map((recommendation, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <div className="mr-3 mt-1">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center bg-blue-600 text-white text-xs">
                          {index + 1}
                        </div>
                      </div>
                      <p className={cn("text-sm", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}>
                        {recommendation}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className={cn("lg:col-span-3 p-12 rounded-xl shadow-md text-center", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}>
              <div className={cn("p-6 rounded-full inline-flex items-center justify-center mb-6", theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100')}>
                <i className="fa-file-alt text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Select a Report</h3>
              <p className={cn("mb-6 max-w-md mx-auto", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
                Choose a report from the list to view detailed insights and recommendations
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