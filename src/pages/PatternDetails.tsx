import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Edit3, Rocket, Book, Box, Coffee, Phone as Python, 
  Server, Blocks, Database, Globe, Shield, Zap, 
  GitBranch, Package, Terminal, Code2, CheckCircle2
} from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: 'intro', label: 'Introduction', icon: <Book className="h-5 w-5" /> },
  { id: 'architecture', label: 'Architecture', icon: <Box className="h-5 w-5" /> }
];

// Pattern-specific repository mappings - keep in sync with ConfigureDeploy.tsx
const patternRepos = {
  'spring-boot': {
    url: 'https://github.com/spring-projects/spring-petclinic.git',
    branch: 'main'
  },
  'python': {
    url: 'https://github.com/nickjj/docker-flask-example.git',
    branch: 'main'
  },
  'nodejs': {
    url: 'https://github.com/wellsfargo/nodejs-template',
    branch: 'main'
  },
  'react': {
    url: 'https://github.com/wellsfargo/react-template',
    branch: 'main'
  },
  'golang': {
    url: 'https://github.com/wellsfargo/golang-template',
    branch: 'main'
  }
};

const patterns = {
  'spring-boot': {
    title: 'Spring Boot',
    icon: <Coffee className="h-12 w-12" />,
    description: 'Enterprise-grade applications with Spring Boot',
    intro: (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-lighter p-6 rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-primary"><Package className="h-5 w-5" /></div>
              <h3 className="font-semibold text-neutral">Quick Setup</h3>
            </div>
            <p className="text-neutral-light">Start a new project in minutes with our enterprise-ready configuration</p>
          </div>
          <div className="bg-neutral-lighter p-6 rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-primary"><Shield className="h-5 w-5" /></div>
              <h3 className="font-semibold text-neutral">Enterprise Ready</h3>
            </div>
            <p className="text-neutral-light">Built-in security, monitoring, and production-grade features</p>
          </div>
          <div className="bg-neutral-lighter p-6 rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-primary"><Zap className="h-5 w-5" /></div>
              <h3 className="font-semibold text-neutral">High Performance</h3>
            </div>
            <p className="text-neutral-light">Optimized for high throughput and low latency applications</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral mb-4">Overview</h2>
            <p className="text-neutral-light">Spring Boot is our recommended framework for building enterprise Java applications. It provides a robust foundation for creating production-ready applications with minimal setup.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-neutral mb-3">Key Features</h3>
            <ul className="list-disc pl-6 space-y-2 text-neutral-light">
              <li>Auto-configuration: Automatic setup of application based on dependencies</li>
              <li>Standalone: Create standalone applications that run independently</li>
              <li>Production-ready: Built-in metrics, health checks, and externalized configuration</li>
              <li>No code generation: No requirement for XML configuration</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-neutral mb-3">When to Use</h3>
            <p className="text-neutral-light mb-2">Choose this pattern when you need:</p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-light">
              <li>Enterprise-grade Java applications</li>
              <li>RESTful web services</li>
              <li>Microservices architecture</li>
              <li>Database integration with JPA/Hibernate</li>
              <li>Security features with Spring Security</li>
              <li>Cloud-native applications</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-neutral mb-3">Getting Started</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral mb-2">1. Initialize Project</h4>
                <ul className="list-disc pl-6 space-y-1 text-neutral-light">
                  <li>Select dependencies from our curated list</li>
                  <li>Configure application properties</li>
                  <li>Set up database connections</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-neutral mb-2">2. Development</h4>
                <ul className="list-disc pl-6 space-y-1 text-neutral-light">
                  <li>Write your first controller</li>
                  <li>Implement service layer</li>
                  <li>Add security configurations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-neutral mb-2">3. Testing</h4>
                <ul className="list-disc pl-6 space-y-1 text-neutral-light">
                  <li>Unit tests with JUnit</li>
                  <li>Integration tests with Spring Test</li>
                  <li>API tests with REST Assured</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-neutral mb-2">4. Deployment</h4>
                <ul className="list-disc pl-6 space-y-1 text-neutral-light">
                  <li>Build with Maven/Gradle</li>
                  <li>Configure environment properties</li>
                  <li>Deploy to our cloud platform</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-neutral mb-3">Best Practices</h3>
            <ul className="list-disc pl-6 space-y-2 text-neutral-light">
              <li>Follow layered architecture (Controller {'->'} Service {'->'} Repository)</li>
              <li>Use dependency injection</li>
              <li>Implement proper exception handling</li>
              <li>Add comprehensive logging</li>
              <li>Include API documentation with OpenAPI/Swagger</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    architecture: (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-neutral mb-6">Spring Boot Architecture</h2>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <img 
            src="https://spring-petclinic.github.io/images/petclinic-microservices-architecture.png"
            alt="Spring Boot Microservices Architecture Diagram"
            className="w-full h-auto rounded-lg"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-neutral mb-4">Component Details</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-neutral mb-2">1. Controller Layer</h4>
                <ul className="list-disc pl-6 space-y-1 text-neutral-light">
                  <li>Handles HTTP requests</li>
                  <li>Input validation</li>
                  <li>Response formatting</li>
                  <li>API versioning</li>
                  <li>Rate limiting</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-neutral mb-2">2. Service Layer</h4>
                <ul className="list-disc pl-6 space-y-1 text-neutral-light">
                  <li>Business logic implementation</li>
                  <li>Transaction management</li>
                  <li>Integration with external services</li>
                  <li>Event handling</li>
                  <li>Caching strategies</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-neutral mb-2">3. Repository Layer</h4>
                <ul className="list-disc pl-6 space-y-1 text-neutral-light">
                  <li>Data access patterns</li>
                  <li>ORM mapping with JPA</li>
                  <li>Query optimization</li>
                  <li>Connection pooling</li>
                  <li>Data auditing</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-neutral mb-2">4. Cross-Cutting Concerns</h4>
                <ul className="list-disc pl-6 space-y-1 text-neutral-light">
                  <li>Security (Authentication/Authorization)</li>
                  <li>Logging & Monitoring</li>
                  <li>Error Handling</li>
                  <li>Performance Metrics</li>
                  <li>Data Validation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export function PatternDetails() {
  const { patternId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('intro');

  if (!patternId || !patterns[patternId as keyof typeof patterns]) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-neutral mb-4">Pattern Not Found</h2>
          <button
            onClick={() => navigate('/patterns')}
            className="inline-flex items-center space-x-2 text-primary hover:text-primary-hover"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Patterns</span>
          </button>
        </div>
      </div>
    );
  }

  const pattern = patterns[patternId as keyof typeof patterns];
  
  const handleConfigureDeploy = () => {
    navigate(`/configure-deploy/${patternId}`);
  };

  const handleEditInCodespace = () => {
    const repo = patternRepos[patternId as keyof typeof patternRepos];
    if (repo) {
      // Extract owner and repo name from the URL
      const match = repo.url.match(/github\.com\/([^\/]+)\/([^\/\.]+)/);
      if (match) {
        const [, owner, repoName] = match;
        // Construct GitHub Codespaces URL
        const codespaceUrl = `https://github.com/codespaces/new?hide_repo_select=true&ref=${repo.branch}&repo=${owner}%2F${repoName}`;
        window.open(codespaceUrl, '_blank');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/patterns')}
          className="inline-flex items-center space-x-2 text-primary hover:text-primary-hover mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Patterns</span>
        </button>
        <div className="flex items-center space-x-4">
          <div className="text-primary">
            {pattern.icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral">{pattern.title}</h1>
            <p className="text-neutral-light">{pattern.description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Content */}
        <div className="lg:col-span-3">
          {/* Tabs */}
          <div className="border-b border-neutral-lighter mb-6">
            <div className="flex space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 border-b-2 font-medium ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-neutral-light hover:text-neutral hover:border-neutral-lighter'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="prose max-w-none">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              {activeTab === 'intro' ? pattern.intro : pattern.architecture}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <button
            onClick={handleEditInCodespace}
            className="w-full flex items-center justify-center space-x-2 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-hover transition-colors"
          >
            <Edit3 className="h-5 w-5" />
            <span>Edit in Codespace</span>
          </button>
          <button
            onClick={handleConfigureDeploy}
            className="w-full flex items-center justify-center space-x-2 bg-secondary text-neutral px-4 py-3 rounded-lg hover:bg-secondary-hover transition-colors"
          >
            <Rocket className="h-5 w-5" />
            <span>Configure & Deploy</span>
          </button>
        </div>
      </div>
    </div>
  );
}