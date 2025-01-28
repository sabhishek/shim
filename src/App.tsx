import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { PatternSelection } from './pages/PatternSelection';
import { PatternDetails } from './pages/PatternDetails';
import { ConfigureDeploy } from './pages/ConfigureDeploy';
import { 
  Menu, 
  Home as HomeIcon, 
  Box, 
  Coffee, 
  Phone as Python, 
  Server, 
  Blocks, 
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(window.innerWidth >= 1024);

  const patterns = [
    { id: 'spring-boot', name: 'Spring Boot', icon: <Coffee className="h-5 w-5" /> },
    { id: 'python', name: 'Python', icon: <Python className="h-5 w-5" /> },
    { id: 'nodejs', name: 'Node.js', icon: <Server className="h-5 w-5" /> },
    { id: 'react', name: 'React', icon: <Blocks className="h-5 w-5" /> },
    { id: 'golang', name: 'Go (Golang)', icon: <Box className="h-5 w-5" /> }
  ];

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      setIsNavOpen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-neutral-lighter flex">
        {/* Navigation Sidebar */}
        <div 
          className={`fixed lg:relative top-0 left-0 h-screen bg-white shadow-lg transition-all duration-300 z-50 flex flex-col ${
            isNavOpen ? 'w-64' : 'w-16'
          }`}
        >
          {/* Toggle Button */}
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="absolute -right-3 top-20 bg-white rounded-full p-1 shadow-md hover:bg-neutral-lighter transition-colors lg:flex hidden"
          >
            {isNavOpen ? 
              <ChevronLeft className="h-4 w-4 text-neutral" /> : 
              <ChevronRight className="h-4 w-4 text-neutral" />
            }
          </button>

          {/* Navigation Content */}
          <div className="flex-1 p-4 space-y-8 overflow-y-auto">
            {/* Main Navigation */}
            <div>
              <div className={`mb-4 flex items-center ${isNavOpen ? 'justify-between' : 'justify-center'}`}>
                <Menu className="h-6 w-6 text-primary" />
                {isNavOpen && <span className="font-semibold text-neutral">Navigation</span>}
              </div>
              <nav className="space-y-2">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => `
                    flex items-center space-x-3 p-2 rounded-lg transition-colors
                    ${isActive ? 'bg-primary text-white' : 'text-neutral hover:bg-neutral-lighter'}
                    ${!isNavOpen && 'justify-center'}
                  `}
                >
                  <HomeIcon className="h-5 w-5" />
                  {isNavOpen && <span>Home</span>}
                </NavLink>
                <NavLink 
                  to="/patterns" 
                  className={({ isActive }) => `
                    flex items-center space-x-3 p-2 rounded-lg transition-colors
                    ${isActive ? 'bg-primary text-white' : 'text-neutral hover:bg-neutral-lighter'}
                    ${!isNavOpen && 'justify-center'}
                  `}
                >
                  <Box className="h-5 w-5" />
                  {isNavOpen && <span>Patterns</span>}
                </NavLink>
              </nav>
            </div>

            {/* Pattern Links */}
            {isNavOpen && (
              <div>
                <div className="mb-4 font-semibold text-neutral">App Patterns</div>
                <nav className="space-y-2">
                  {patterns.map(pattern => (
                    <NavLink
                      key={pattern.id}
                      to={`/patterns/${pattern.id}`}
                      className={({ isActive }) => `
                        flex items-center space-x-3 p-2 rounded-lg transition-colors
                        ${isActive ? 'bg-primary text-white' : 'text-neutral hover:bg-neutral-lighter'}
                      `}
                    >
                      {pattern.icon}
                      <span>{pattern.name}</span>
                    </NavLink>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${isNavOpen ? 'lg:ml-0' : 'lg:ml-0'} ${isNavOpen ? 'ml-64' : 'ml-16'}`}>
          <Header isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/patterns" element={<PatternSelection />} />
              <Route path="/patterns/:patternId" element={<PatternDetails />} />
              <Route path="/configure-deploy/:patternId?" element={<ConfigureDeploy />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;