import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Server, 
  Database, 
  Globe, 
  Link, 
  Code2, 
  Check,
  AlertCircle,
  Rocket,
  GitFork,
  GitBranch
} from 'lucide-react';

interface DeploymentConfig {
  repository: {
    url: string;
    branch: string;
  };
  dataCenters: string[];
  database: {
    required: boolean;
    type: 'existing' | 'new' | null;
  };
  loadBalancer: boolean;
  vanityUrl: boolean;
}

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

const initialConfig: DeploymentConfig = {
  repository: {
    url: '',
    branch: 'main'
  },
  dataCenters: ['DC1'],
  database: {
    required: false,
    type: null
  },
  loadBalancer: false,
  vanityUrl: false
};

const dataCenterOptions = ['DC1', 'DC2', 'DC3', 'DC4'];

export function ConfigureDeploy() {
  const { patternId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'form' | 'yaml'>('form');
  const [config, setConfig] = useState<DeploymentConfig>(() => {
    if (patternId && patternId !== 'import' && patternRepos[patternId as keyof typeof patternRepos]) {
      return {
        ...initialConfig,
        repository: patternRepos[patternId as keyof typeof patternRepos]
      };
    }
    return initialConfig;
  });
  const [isReviewing, setIsReviewing] = useState(false);

  const handleDataCenterToggle = (dc: string) => {
    setConfig(prev => ({
      ...prev,
      dataCenters: prev.dataCenters.includes(dc)
        ? prev.dataCenters.filter(d => d !== dc)
        : [...prev.dataCenters, dc]
    }));
  };

  const handleDatabaseChange = (required: boolean, type: 'existing' | 'new' | null = null) => {
    setConfig(prev => ({
      ...prev,
      database: { required, type: required ? type : null }
    }));
  };

  const handleRepositoryChange = (field: 'url' | 'branch', value: string) => {
    setConfig(prev => ({
      ...prev,
      repository: {
        ...prev.repository,
        [field]: value
      }
    }));
  };

  const generateYaml = () => {
    return `apiVersion: apiextensions.crossplane.io/v1
kind: Composition
metadata:
  name: ${patternId || 'custom'}-app-composition
  labels:
    pattern: ${patternId || 'custom'}
spec:
  compositeTypeRef:
    apiVersion: apps.example.org/v1alpha1
    kind: CompositeApp
  resources:
    - name: repository
      base:
        apiVersion: gitops.crossplane.io/v1alpha1
        kind: GitRepository
        spec:
          url: ${config.repository.url}
          branch: ${config.repository.branch}
    - name: infrastructure
      base:
        apiVersion: infra.example.org/v1alpha1
        kind: DataCenterDeployment
        spec:
          dataCenters:
            ${config.dataCenters.map(dc => `- ${dc}`).join('\n            ')}
    - name: database
      base:
        apiVersion: database.example.org/v1alpha1
        kind: OracleDatabase
        spec:
          required: ${config.database.required}
          type: ${config.database.required ? (config.database.type === 'existing' ? 'Oracle' : 'NewOracle') : 'None'}
    - name: networking
      base:
        apiVersion: networking.crossplane.io/v1alpha1
        kind: VirtualNetwork
        spec:
          loadBalancer: ${config.loadBalancer}
          vanityUrl: ${config.vanityUrl}`;
  };

  const handleDeploy = () => {
    setIsReviewing(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-primary hover:text-primary-hover mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
        <div className="flex items-center space-x-4">
          <Code2 className="h-12 w-12 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-neutral">Configure & Deploy</h1>
            <p className="text-neutral-light">
              {patternId === 'import'
                ? 'Configure deployment settings for your custom application'
                : `Configure deployment settings for ${patternId} pattern`}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Form */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="border-b border-neutral-lighter mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('form')}
                className={`flex items-center space-x-2 px-4 py-2 border-b-2 font-medium ${
                  activeTab === 'form'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-neutral-light hover:text-neutral hover:border-neutral-lighter'
                }`}
              >
                <span>Form View</span>
              </button>
              <button
                onClick={() => setActiveTab('yaml')}
                className={`flex items-center space-x-2 px-4 py-2 border-b-2 font-medium ${
                  activeTab === 'yaml'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-neutral-light hover:text-neutral hover:border-neutral-lighter'
                }`}
              >
                <span>YAML View</span>
              </button>
            </div>
          </div>

          {activeTab === 'form' ? (
            <div className="space-y-8">
              {/* Repository Configuration */}
              <section className="bg-white p-6 rounded-lg border border-neutral-lighter">
                <div className="flex items-center space-x-3 mb-4">
                  <GitFork className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-semibold text-neutral">Repository</h2>
                </div>
                <p className="text-neutral-light mb-4">
                  {patternId === 'import'
                    ? 'Enter your application repository details'
                    : 'Pattern repository configuration'}
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral mb-1">Repository URL</label>
                    <input
                      type="text"
                      value={config.repository.url}
                      onChange={(e) => handleRepositoryChange('url', e.target.value)}
                      placeholder="https://github.com/username/repository"
                      className="w-full px-3 py-2 border border-neutral-lighter rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      readOnly={patternId !== 'import' && patternId !== undefined}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral mb-1">Branch</label>
                    <input
                      type="text"
                      value={config.repository.branch}
                      onChange={(e) => handleRepositoryChange('branch', e.target.value)}
                      placeholder="main"
                      className="w-full px-3 py-2 border border-neutral-lighter rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      readOnly={patternId !== 'import' && patternId !== undefined}
                    />
                  </div>
                </div>
              </section>

              {/* Data Centers */}
              <section className="bg-white p-6 rounded-lg border border-neutral-lighter">
                <div className="flex items-center space-x-3 mb-4">
                  <Server className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-semibold text-neutral">Data Centers</h2>
                </div>
                <p className="text-neutral-light mb-4">Select the data centers where your application should be deployed.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {dataCenterOptions.map(dc => (
                    <button
                      key={dc}
                      onClick={() => handleDataCenterToggle(dc)}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        config.dataCenters.includes(dc)
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-neutral-lighter hover:border-neutral-light text-neutral-light'
                      }`}
                    >
                      {dc}
                    </button>
                  ))}
                </div>
              </section>

              {/* Database */}
              <section className="bg-white p-6 rounded-lg border border-neutral-lighter">
                <div className="flex items-center space-x-3 mb-4">
                  <Database className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-semibold text-neutral">Database</h2>
                </div>
                <p className="text-neutral-light mb-4">Specify if your application requires a database.</p>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      checked={!config.database.required}
                      onChange={() => handleDatabaseChange(false)}
                      className="text-primary"
                    />
                    <span className="text-neutral">No database required</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      checked={config.database.required && config.database.type === 'existing'}
                      onChange={() => handleDatabaseChange(true, 'existing')}
                      className="text-primary"
                    />
                    <span className="text-neutral">Use existing Oracle Database</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      checked={config.database.required && config.database.type === 'new'}
                      onChange={() => handleDatabaseChange(true, 'new')}
                      className="text-primary"
                    />
                    <span className="text-neutral">Request new database</span>
                  </label>
                </div>
              </section>

              {/* Load Balancer */}
              <section className="bg-white p-6 rounded-lg border border-neutral-lighter">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-semibold text-neutral">Load Balancer</h2>
                </div>
                <p className="text-neutral-light mb-4">Configure load balancing for your application.</p>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={config.loadBalancer}
                    onChange={(e) => setConfig(prev => ({ ...prev, loadBalancer: e.target.checked }))}
                    className="text-primary rounded"
                  />
                  <span className="text-neutral">Enable load balancer</span>
                </label>
              </section>

              {/* Vanity URL */}
              <section className="bg-white p-6 rounded-lg border border-neutral-lighter">
                <div className="flex items-center space-x-3 mb-4">
                  <Link className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-semibold text-neutral">Vanity URL</h2>
                </div>
                <p className="text-neutral-light mb-4">Configure custom URL for your application.</p>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={config.vanityUrl}
                    onChange={(e) => setConfig(prev => ({ ...prev, vanityUrl: e.target.checked }))}
                    className="text-primary rounded"
                  />
                  <span className="text-neutral">Enable vanity URL</span>
                </label>
              </section>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg border border-neutral-lighter">
              <pre className="bg-neutral-lighter p-4 rounded-lg overflow-auto font-mono text-sm">
                {generateYaml()}
              </pre>
            </div>
          )}
        </div>

        {/* Right Sidebar - Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg border border-neutral-lighter sticky top-8">
            <h3 className="text-lg font-semibold text-neutral mb-4">Deployment Summary</h3>
            <div className="space-y-4 mb-6">
              {/* Repository Info */}
              <div>
                <h4 className="text-sm font-medium text-neutral mb-2">Repository</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-neutral-light">
                    <GitFork className="h-4 w-4" />
                    <span className="truncate">{config.repository.url || 'No repository specified'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-neutral-light">
                    <GitBranch className="h-4 w-4" />
                    <span>{config.repository.branch}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-neutral mb-2">Data Centers</h4>
                <div className="flex flex-wrap gap-2">
                  {config.dataCenters.map(dc => (
                    <span key={dc} className="px-2 py-1 bg-neutral-lighter rounded text-sm text-neutral">
                      {dc}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-neutral mb-2">Database</h4>
                <p className="text-sm text-neutral-light">
                  {config.database.required 
                    ? `Using ${config.database.type === 'existing' ? 'existing' : 'new'} database`
                    : 'No database required'}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-neutral mb-2">Network Configuration</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Check className={`h-4 w-4 ${config.loadBalancer ? 'text-primary' : 'text-neutral-light'}`} />
                    <span className="text-sm text-neutral-light">Load Balancer</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className={`h-4 w-4 ${config.vanityUrl ? 'text-primary' : 'text-neutral-light'}`} />
                    <span className="text-sm text-neutral-light">Vanity URL</span>
                  </div>
                </div>
              </div>
            </div>

            {isReviewing ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-primary">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Deployment in Progress</span>
                </div>
                <div className="bg-neutral-lighter rounded-lg p-4">
                  <p className="text-sm text-neutral-light">
                    Your application is being configured and deployed. This process may take several minutes.
                  </p>
                </div>
              </div>
            ) : (
              <button
                onClick={handleDeploy}
                className="w-full flex items-center justify-center space-x-2 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-hover transition-colors"
              >
                <Rocket className="h-5 w-5" />
                <span>Deploy Application</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}