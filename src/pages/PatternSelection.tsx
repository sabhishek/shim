import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Box, GitFork, Coffee, Phone as Python, Server, Blocks, Upload } from 'lucide-react';

interface Pattern {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

const patterns: Pattern[] = [
  {
    id: 'spring-boot',
    title: 'Spring Boot',
    description: 'A robust framework for Java-based applications with enterprise-grade features.',
    icon: <Coffee className="h-12 w-12" />,
    tags: ['Java', 'Backend', 'Enterprise']
  },
  {
    id: 'python',
    title: 'Python',
    description: 'Ideal for data processing, scripting, and web development with Django or Flask.',
    icon: <Python className="h-12 w-12" />,
    tags: ['Python', 'Backend', 'Data Processing']
  },
  {
    id: 'nodejs',
    title: 'Node.js',
    description: 'Perfect for JavaScript server-side applications with Express or NestJS.',
    icon: <Server className="h-12 w-12" />,
    tags: ['JavaScript', 'Backend', 'API']
  },
  {
    id: 'react',
    title: 'React',
    description: 'For building dynamic front-end web applications with modern tooling.',
    icon: <Blocks className="h-12 w-12" />,
    tags: ['JavaScript', 'Frontend', 'UI']
  },
  {
    id: 'golang',
    title: 'Go (Golang)',
    description: 'Optimized for scalable and performant back-end services.',
    icon: <Box className="h-12 w-12" />,
    tags: ['Go', 'Backend', 'Performance']
  },
  {
    id: 'import',
    title: 'Import Your App',
    description: 'Import and integrate your existing Git repository into our platform.',
    icon: <Upload className="h-12 w-12" />,
    tags: ['Import', 'Custom']
  }
];

export function PatternSelection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();

  const allTags = Array.from(new Set(patterns.flatMap(pattern => pattern.tags)));

  const filteredPatterns = patterns.filter(pattern => {
    const matchesSearch = pattern.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pattern.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => pattern.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handlePatternClick = (pattern: Pattern) => {
    if (pattern.id === 'import') {
      // Navigate to Configure & Deploy with import flag
      navigate('/configure-deploy/import');
    } else {
      navigate(`/patterns/${pattern.id}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-neutral mb-2">Select Application Pattern</h2>
        <p className="text-neutral-light">
          Choose from our curated collection of enterprise-ready application patterns or import your existing repository.
        </p>
      </div>

      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-light" />
          <input
            type="text"
            placeholder="Search patterns..."
            className="w-full pl-10 pr-4 py-2 border border-neutral-lighter rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tags Filter */}
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-primary text-white'
                  : 'bg-neutral-lighter text-neutral hover:bg-neutral-light hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Pattern Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatterns.map(pattern => (
          <div
            key={pattern.id}
            onClick={() => handlePatternClick(pattern)}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-neutral-lighter hover:border-primary"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-primary">
                {pattern.icon}
              </div>
              <h3 className="text-lg font-semibold text-neutral">{pattern.title}</h3>
            </div>
            <p className="text-neutral-light mb-4">{pattern.description}</p>
            <div className="flex flex-wrap gap-2">
              {pattern.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-neutral-lighter rounded-full text-xs font-medium text-neutral"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}