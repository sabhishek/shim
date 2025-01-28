import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Box,
  GitFork,
  Book,
  Clock,
  ChevronRight,
  Cloud,
  GitBranch,
  CircleDot
} from 'lucide-react';

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const myApplications = [
    { 
      name: 'Customer Portal',
      repo: 'customer-portal',
      branch: 'main',
      status: 'deployed',
      lastUpdated: '10 minutes ago'
    },
    { 
      name: 'Payment Service',
      repo: 'payment-service',
      branch: 'develop',
      status: 'building',
      lastUpdated: '1 hour ago'
    },
    { 
      name: 'Auth Service',
      repo: 'auth-service',
      branch: 'feature/oauth',
      status: 'failed',
      lastUpdated: '2 hours ago'
    }
  ];

  const recentActivity = [
    { type: 'pattern', name: 'React Microservice Template', date: '2 hours ago' },
    { type: 'import', name: 'payment-service', date: '1 day ago' },
    { type: 'deploy', name: 'user-auth-service', date: '2 days ago' }
  ];

  const announcements = [
    { title: 'New Pattern Available', desc: 'GraphQL API Template now available', date: 'Today' },
    { title: 'Maintenance Notice', desc: 'Scheduled downtime on March 15', date: 'Yesterday' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed':
        return 'text-green-500';
      case 'building':
        return 'text-yellow-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-neutral-light';
    }
  };

  const handleAppClick = (appName: string) => {
    navigate('/configure-deploy/spring-boot');
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Overview Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-semibold text-neutral mb-4">Welcome to WF:AppSmith</h2>
        <p className="text-neutral-light mb-6">
          Your centralized hub for application development. Start by selecting an approved pattern
          or import your existing repository to begin building with our enterprise-ready templates.
        </p>
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-light" />
          <input
            type="text"
            placeholder="Search patterns, repositories, or documentation..."
            className="w-full pl-10 pr-4 py-2 border border-neutral-lighter rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Main CTAs */}
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/patterns')}
            className="flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors"
          >
            <Box className="h-5 w-5" />
            <span>Select App Pattern</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-secondary text-neutral px-6 py-3 rounded-lg hover:bg-secondary-hover transition-colors">
            <GitFork className="h-5 w-5" />
            <span>Import Existing Repo</span>
          </button>
        </div>
      </div>

      {/* My Applications */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-neutral">My Applications</h3>
          <button className="text-primary hover:text-primary-hover text-sm font-medium">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-neutral-lighter">
                <th className="text-left py-3 px-4 text-sm font-medium text-neutral-light">Application</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-neutral-light">Repository</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-neutral-light">Branch</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-neutral-light">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-neutral-light">Last Updated</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-neutral-light"></th>
              </tr>
            </thead>
            <tbody>
              {myApplications.map((app, index) => (
                <tr key={index} className="border-b border-neutral-lighter hover:bg-neutral-lighter/30 transition-colors">
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleAppClick(app.name)}
                      className="font-medium text-primary hover:text-primary-hover hover:underline text-left"
                    >
                      {app.name}
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <GitFork className="h-4 w-4 text-neutral-light" />
                      <span className="text-neutral-light">{app.repo}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <GitBranch className="h-4 w-4 text-neutral-light" />
                      <span className="text-neutral-light">{app.branch}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <CircleDot className={`h-4 w-4 ${getStatusColor(app.status)}`} />
                      <span className={`capitalize ${getStatusColor(app.status)}`}>{app.status}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-neutral-light">{app.lastUpdated}</span>
                  </td>
                  <td className="py-4 px-4">
                    <button 
                      onClick={() => handleAppClick(app.name)}
                      className="text-primary hover:text-primary-hover"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral">Recent Activity</h3>
              <Clock className="h-5 w-5 text-neutral-light" />
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-neutral-lighter rounded-lg hover:bg-background-dark transition-colors">
                  <div className="flex items-center space-x-3">
                    {activity.type === 'pattern' && <Box className="h-5 w-5 text-primary" />}
                    {activity.type === 'import' && <GitFork className="h-5 w-5 text-secondary" />}
                    {activity.type === 'deploy' && <Cloud className="h-5 w-5 text-neutral" />}
                    <div>
                      <p className="font-medium text-neutral">{activity.name}</p>
                      <p className="text-sm text-neutral-light">{activity.date}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-neutral-light" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links & Announcements */}
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral">Quick Links</h3>
              <Book className="h-5 w-5 text-neutral-light" />
            </div>
            <div className="space-y-3">
              <a href="#" className="block p-3 bg-neutral-lighter rounded-lg hover:bg-background-dark transition-colors">
                <p className="font-medium text-neutral">Documentation</p>
                <p className="text-sm text-neutral-light">Access guides and references</p>
              </a>
              <a href="#" className="block p-3 bg-neutral-lighter rounded-lg hover:bg-background-dark transition-colors">
                <p className="font-medium text-neutral">FAQs</p>
                <p className="text-sm text-neutral-light">Common questions answered</p>
              </a>
              <a href="#" className="block p-3 bg-neutral-lighter rounded-lg hover:bg-background-dark transition-colors">
                <p className="font-medium text-neutral">Support</p>
                <p className="text-sm text-neutral-light">Get help when needed</p>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-neutral mb-4">Announcements</h3>
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <div key={index} className="border-l-4 border-primary pl-4">
                  <p className="font-medium text-neutral">{announcement.title}</p>
                  <p className="text-sm text-neutral-light">{announcement.desc}</p>
                  <p className="text-xs text-neutral-light mt-1">{announcement.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}