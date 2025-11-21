import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '@/contexts/supabaseContext';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

// Mock data for dashboard
const visibilityTrendData = [
  { date: 'Mon', score: 65 },
  { date: 'Tue', score: 59 },
  { date: 'Wed', score: 80 },
  { date: 'Thu', score: 81 },
  { date: 'Fri', score: 56 },
  { date: 'Sat', score: 55 },
  { date: 'Sun', score: 72 },
];

const keywordPerformanceData = [
  { name: 'Brand X', visibility: 85, trend: 'up' },
  { name: 'Product Y', visibility: 72, trend: 'up' },
  { name: 'Service Z', visibility: 68, trend: 'down' },
  { name: 'Solution A', visibility: 92, trend: 'up' },
  { name: 'Feature B', visibility: 63, trend: 'down' },
];

export default function Dashboard() {
  const { theme } = useTheme();
  const { supabase } = useSupabase();
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (!isAuthenticated && !token) {
        navigate('/login');
        return;
      }
      
      // For demo purposes, we'll simulate loading projects
      try {
        // In a real app, you would fetch projects from Supabase
        // const { data, error } = await supabase.from('projects').select('*');
        
        // Mock data for demonstration
        const mockProjects = [
          { id: 'proj_1', name: 'Brand X', domain: 'brandx.com', visibilityScore: 87 },
          { id: 'proj_2', name: 'Tech Solutions', domain: 'techsolutions.io', visibilityScore: 75 },
          { id: 'proj_3', name: 'Global Retail', domain: 'globalretail.com', visibilityScore: 68 }
        ];
        
        setProjects(mockProjects);
        if (mockProjects.length > 0) {
          setActiveProject(mockProjects[0].id);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [isAuthenticated, navigate, supabase]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (loading) {
    return (
      <div className={cn("min-h-screen flex items-center justify-center", theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900')}>
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4">Loading dashboard...</p>
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
                  className={cn("text-sm font-medium text-blue-500 border-b-2 border-blue-500 pb-1", theme === 'dark' ? 'text-blue-400 border-blue-400' : 'text-blue-600 border-blue-600')}
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
                  className={cn("text-sm font-medium hover:text-blue-500 transition-colors", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                >
                  Optimization
                </a>
              </nav>
            </div>
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200')}>
                  {user?.name ? (
                    <span className="font-medium text-sm">{user.name.charAt(0).toUpperCase()}</span>
                  ) : (
                    <i className="fa-solid fa-user"></i>
                  )}
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium">{user?.name || 'User'}</p>
                  <p className={cn("text-xs", theme === 'dark' ? 'text-gray-400' : 'text-gray-500')}>
                    {user?.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className={cn("p-2 rounded-md hover:bg-gray-200 transition-colors", theme === 'dark' ? 'hover:bg-gray-800' : '')}
                aria-label="Logout"
              >
                <i className="fa-solid fa-sign-out-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className={cn("mt-1", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
            Welcome back, {user?.name || 'User'}! Here's an overview of your brand visibility.
          </p>
        </div>

        {/* Project Selector */}
        <div className="mb-8">
          <label className={cn("block text-sm font-medium mb-2", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}>
            Select Project
          </label>
          <div className="flex flex-wrap gap-2">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveProject(project.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm transition-all duration-200",
                  activeProject === project.id
                    ? `${theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'} font-medium`
                    : `${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}`
                )}
              >
                {project.name}
              </button>
            ))}
            <button
              className={cn(
                "px-4 py-2 rounded-full text-sm flex items-center gap-1",
                theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
              )}
            >
              <i className="fa-plus"></i>
              Add Project
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              title: 'Visibility Score', 
              value: '87', 
              change: '+5%', 
              trend: 'up',
              icon: 'fa-eye',
              description: 'Overall brand visibility'
            },
            { 
              title: 'AI Mention Rate', 
              value: '92%', 
              change: '+2%', 
              trend: 'up',
              icon: 'fa-brain',
              description: 'Brand mentions in AI models'
            },
            { 
              title: 'Search Rankings', 
              value: '4.2', 
              change: '-0.3', 
              trend: 'down',
              icon: 'fa-search',
              description: 'Average keyword position'
            },
            { 
              title: 'Competitive Gap', 
              value: '12%', 
              change: '-3%', 
              trend: 'down',
              icon: 'fa-chart-pie',
              description: 'vs top competitor'
            }
          ].map((metric, index) => (
            <motion.div
              key={metric.title}
              className={cn("p-6 rounded-xl shadow-md", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className={cn("text-sm font-medium", theme === 'dark' ? 'text-gray-400' : 'text-gray-500')}>
                  {metric.title}
                </h3>
                <div className={cn("p-2 rounded-full", theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600')}>
                  <i className={`fa-solid ${metric.icon}`}></i>
                </div>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">{metric.value}</span>
                <span className={`ml-2 text-sm font-medium ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change}
                </span>
              </div>
              <p className={cn("mt-1 text-xs", theme === 'dark' ? 'text-gray-400' : 'text-gray-500')}>
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Charts and Data Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Visibility Trend Chart */}
          <div className={cn("lg:col-span-2 p-6 rounded-xl shadow-md", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Visibility Trend</h3>
              <div className={cn("text-sm", theme === 'dark' ? 'text-gray-400' : 'text-gray-500')}>
                Last 7 days
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={visibilityTrendData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke={theme === 'dark' ? '#9ca3af' : '#4b5563'} />
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
                    fill="url(#colorTrend)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Keywords */}
          <div className={cn("p-6 rounded-xl shadow-md", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Top Keywords</h3>
              <a href="#" className={cn("text-sm text-blue-500 hover:text-blue-600 transition-colors")}>
                View all
              </a>
            </div>
            <div className="space-y-4">
              {keywordPerformanceData.map((keyword, index) => (
                <div key={keyword.name} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{keyword.name}</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1 dark:bg-gray-700">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full" 
                        style={{ width: `${keyword.visibility}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="ml-3 text-sm font-medium">{keyword.visibility}%</span>
                  <span className={`ml-3 text-sm ${keyword.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    <i className={`fa-solid fa-arrow-${keyword.trend}`}></i>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Run New Scan',
              description: 'Analyze your brand visibility across AI models',
              icon: 'fa-play-circle',
              color: 'blue',
              link: '/scan-results'
            },
            {
              title: 'Generate Report',
              description: 'Create a detailed PDF report of your visibility metrics',
              icon: 'fa-file-pdf',
              color: 'purple',
              link: '/reports'
            },
            {
              title: 'Optimize Content',
              description: 'Get AI-powered suggestions to improve your content',
              icon: 'fa-magic',
              color: 'green',
              link: '/optimization'
            }
          ].map((action, index) => (
            <motion.a
              key={action.title}
              href={action.link}
              className={cn(
                "p-6 rounded-xl shadow-md border flex flex-col items-center text-center transition-all hover:shadow-lg",
                theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:border-blue-500/50' : 'bg-white border-gray-100 hover:border-blue-200'
              )}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className={`p-4 rounded-full mb-4 text-white bg-${action.color}-600`}>
                <i className={`fa-solid ${action.icon} text-xl`}></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
              <p className={cn("text-sm", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
                {action.description}
              </p>
            </motion.a>
          ))}
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