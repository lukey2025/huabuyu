import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Projects() {
  const { theme } = useTheme();
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProject, setNewProject] = useState({ name: '', domain: '' });
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);

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
          { id: 'proj_1', name: 'Brand X', domain: 'brandx.com', visibilityScore: 87, createdAt: '2023-01-15' },
          { id: 'proj_2', name: 'Tech Solutions', domain: 'techsolutions.io', visibilityScore: 75, createdAt: '2023-02-20' },
          { id: 'proj_3', name: 'Global Retail', domain: 'globalretail.com', visibilityScore: 68, createdAt: '2023-03-05' }
        ];
        
        setProjects(mockProjects);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  const handleCreateProject = () => {
    if (!newProject.name || !newProject.domain) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // In a real app, you would save to Supabase
    const project = {
      id: `proj_${Date.now()}`,
      name: newProject.name,
      domain: newProject.domain,
      visibilityScore: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setProjects([...projects, project]);
    setNewProject({ name: '', domain: '' });
    setShowNewProjectModal(false);
    toast.success('Project created successfully');
  };

  const handleEditProject = () => {
    if (!currentProject.name || !currentProject.domain) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // In a real app, you would update in Supabase
    const updatedProjects = projects.map(project => 
      project.id === currentProject.id ? currentProject : project
    );
    
    setProjects(updatedProjects);
    setShowEditProjectModal(false);
    toast.success('Project updated successfully');
  };

  const handleDeleteProject = (projectId: string) => {
    // In a real app, you would delete from Supabase
    const updatedProjects = projects.filter(project => project.id !== projectId);
    setProjects(updatedProjects);
    toast.success('Project deleted successfully');
  };

  const openEditModal = (project: any) => {
    setCurrentProject({ ...project });
    setShowEditProjectModal(true);
  };

  if (loading) {
    return (
      <div className={cn("min-h-screen flex items-center justify-center", theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900')}>
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4">Loading projects...</p>
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
                  className={cn("text-sm font-medium text-blue-500 border-b-2 border-blue-500 pb-1", theme === 'dark' ? 'text-blue-400 border-blue-400' : 'text-blue-600 border-blue-600')}
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
              <button
                onClick={() => setShowNewProjectModal(true)}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <i className="fa-plus mr-2"></i> Add Project
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className={cn("mt-1", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
            Manage your brand visibility projects and track their performance
          </p>
        </div>

        {/* Projects Table */}
        <div className={cn("rounded-xl shadow-md overflow-hidden mb-8", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className={theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}>
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Project Name
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Domain
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Visibility Score
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Created At
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <motion.tr 
                      key={project.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{project.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a 
                          href={`https://${project.domain}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`text-blue-500 hover:underline ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}
                        >
                          {project.domain}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          </div>
                          <div className="font-medium">{project.visibilityScore}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>{project.createdAt}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => openEditModal(project)}
                          className={cn("text-blue-500 hover:text-blue-600 mr-4 transition-colors", theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : '')}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className={cn("text-red-500 hover:text-red-600 transition-colors", theme === 'dark' ? 'text-red-400 hover:text-red-300' : '')}
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center">
                      <div className="flex flex-col items-center">
                        <div className={cn("p-4 rounded-full mb-4", theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100')}>
                          <i className="fa-solid fa-folder-open text-2xl"></i>
                        </div>
                        <h3 className="text-lg font-medium mb-2">No projects yet</h3>
                        <p className={cn("mb-4 max-w-md", theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
                          Create your first project to start tracking your brand visibility
                        </p>
                        <button
                          onClick={() => setShowNewProjectModal(true)}
                          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                          <i className="fa-plus mr-2"></i> Add Project
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Project Modal */}
        {showNewProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              className={cn("w-full max-w-md p-6 rounded-xl shadow-lg", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Create New Project</h3>
                <button
                  onClick={() => setShowNewProjectModal(false)}
                  className={cn("p-2 rounded-md hover:bg-gray-200 transition-colors", theme === 'dark' ? 'hover:bg-gray-700' : '')}
                  aria-label="Close"
                >
                  <i className="fa-times"></i>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label 
                    htmlFor="projectName" 
                    className={cn("block text-sm font-medium mb-2", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                  >
                    Project Name
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className={cn(
                      "w-full px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                      theme === 'dark' 
                        ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'
                    )}
                    placeholder="e.g. My Brand"
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="projectDomain" 
                    className={cn("block text-sm font-medium mb-2", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                  >
                    Website Domain
                  </label>
                  <input
                    type="text"
                    id="projectDomain"
                    value={newProject.domain}
                    onChange={(e) => setNewProject({ ...newProject, domain: e.target.value })}
                    className={cn(
                      "w-full px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                      theme === 'dark' 
                        ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'
                    )}
                    placeholder="e.g. mybrand.com"
                  />
                </div>
                
                <div className="pt-4">
                  <button
                    onClick={handleCreateProject}
                    className="w-full px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create Project
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Edit Project Modal */}
        {showEditProjectModal && currentProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              className={cn("w-full max-w-md p-6 rounded-xl shadow-lg", theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100')}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Edit Project</h3>
                <button
                  onClick={() => setShowEditProjectModal(false)}
                  className={cn("p-2 rounded-md hover:bg-gray-200 transition-colors", theme === 'dark' ? 'hover:bg-gray-700' : '')}
                  aria-label="Close"
                >
                  <i className="fa-times"></i>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label 
                    htmlFor="editProjectName" 
                    className={cn("block text-sm font-medium mb-2", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                  >
                    Project Name
                  </label>
                  <input
                    type="text"
                    id="editProjectName"
                    value={currentProject.name}
                    onChange={(e) => setCurrentProject({ ...currentProject, name: e.target.value })}
                    className={cn(
                      "w-full px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                      theme === 'dark' 
                        ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'
                    )}
                    placeholder="e.g. My Brand"
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="editProjectDomain" 
                    className={cn("block text-sm font-medium mb-2", theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}
                  >
                    Website Domain
                  </label>
                  <input
                    type="text"
                    id="editProjectDomain"
                    value={currentProject.domain}
                    onChange={(e) => setCurrentProject({ ...currentProject, domain: e.target.value })}
                    className={cn(
                      "w-full px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                      theme === 'dark' 
                        ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'
                    )}
                    placeholder="e.g. mybrand.com"
                  />
                </div>
                
                <div className="pt-4 flex space-x-3">
                  <button
                    onClick={() => setShowEditProjectModal(false)}
                    className={cn(
                      "flex-1 px-4 py-2 rounded-md transition-colors",
                      theme === 'dark' 
                        ? 'bg-gray-700 text-white hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    )}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditProject}className="flex-1 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
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