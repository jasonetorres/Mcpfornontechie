import React, { useState, useEffect } from 'react'
import { Search, Filter, Clock, BookOpen, Users, Zap, ArrowRight, X } from 'lucide-react'

interface SearchResult {
  id: string
  title: string
  type: 'course' | 'template' | 'guide' | 'community' | 'video'
  description: string
  url: string
  relevance: number
  tags: string[]
  lastUpdated?: string
  author?: string
}

const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    title: 'MCP Fundamentals: Complete Course',
    type: 'course',
    description: 'Learn the basics of Model Context Protocol with hands-on examples',
    url: '/mcp-basics',
    relevance: 95,
    tags: ['beginner', 'fundamentals', 'course'],
    lastUpdated: '2 days ago'
  },
  {
    id: '2',
    title: 'Community Q&A Bot Template',
    type: 'template',
    description: 'Automated community member lookup using Google Sheets and ChatGPT',
    url: '/templates',
    relevance: 88,
    tags: ['community', 'automation', 'zapier'],
    author: 'Sarah Chen'
  },
  {
    id: '3',
    title: 'Setting up your first MCP connection',
    type: 'guide',
    description: 'Step-by-step guide for beginners to create their first MCP integration',
    url: '/guides',
    relevance: 82,
    tags: ['beginner', 'setup', 'tutorial'],
    lastUpdated: '1 week ago'
  },
  {
    id: '4',
    title: 'MCP Security Best Practices Discussion',
    type: 'community',
    description: 'Community discussion about keeping your MCP implementations secure',
    url: '/community',
    relevance: 75,
    tags: ['security', 'best-practices', 'discussion'],
    author: 'Alex Thompson'
  },
  {
    id: '5',
    title: 'MCP in 5 Minutes - Video Overview',
    type: 'video',
    description: 'Quick video introduction to MCP concepts and benefits',
    url: '/demo',
    relevance: 70,
    tags: ['video', 'overview', 'quick-start'],
    lastUpdated: '3 days ago'
  }
]

export default function SmartSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'MCP basics',
    'Zapier integration',
    'community templates',
    'security best practices'
  ])

  useEffect(() => {
    if (query.length > 2) {
      performSearch(query)
    } else {
      setResults([])
    }
  }, [query, selectedTypes])

  const performSearch = async (searchQuery: string) => {
    setIsSearching(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Filter and sort results based on query and filters
    let filteredResults = mockSearchResults.filter(result => {
      const matchesQuery = result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          result.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(result.type)
      
      return matchesQuery && matchesType
    })

    // Sort by relevance
    filteredResults.sort((a, b) => b.relevance - a.relevance)
    
    setResults(filteredResults)
    setIsSearching(false)
  }

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    if (searchQuery && !recentSearches.includes(searchQuery)) {
      setRecentSearches([searchQuery, ...recentSearches.slice(0, 3)])
    }
  }

  const toggleTypeFilter = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const clearFilters = () => {
    setSelectedTypes([])
    setQuery('')
    setResults([])
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="w-4 h-4 text-blue-400" />
      case 'template': return <Zap className="w-4 h-4 text-purple-400" />
      case 'guide': return <BookOpen className="w-4 h-4 text-green-400" />
      case 'community': return <Users className="w-4 h-4 text-orange-400" />
      case 'video': return <Clock className="w-4 h-4 text-red-400" />
      default: return <Search className="w-4 h-4 text-gray-400" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'template': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'guide': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'community': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'video': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl overflow-hidden">
      {/* Search Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses, templates, guides, and more..."
              className="w-full bg-muted border border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:border-matrix-primary focus:outline-none focus:ring-2 focus:ring-matrix-primary/20"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-all duration-200 ${
              showFilters || selectedTypes.length > 0
                ? 'bg-matrix-primary/20 border-matrix-primary text-matrix-primary'
                : 'bg-muted border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {selectedTypes.length > 0 && (
              <span className="bg-matrix-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {selectedTypes.length}
              </span>
            )}
          </button>
        </div>

        {/* Recent Searches */}
        {!query && recentSearches.length > 0 && (
          <div className="mt-4">
            <div className="text-muted-foreground text-sm mb-2">Recent searches:</div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-foreground font-medium">Content Type</span>
              {selectedTypes.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-matrix-primary hover:text-matrix-secondary text-sm"
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {['course', 'template', 'guide', 'community', 'video'].map((type) => (
                <button
                  key={type}
                  onClick={() => toggleTypeFilter(type)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                    selectedTypes.includes(type)
                      ? getTypeColor(type)
                      : 'bg-muted border-border text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {getTypeIcon(type)}
                  <span className="capitalize">{type}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search Results */}
      <div className="max-h-96 overflow-y-auto">
        {isSearching ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-2 border-matrix-primary/30 border-t-matrix-primary rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-muted-foreground">Searching...</div>
          </div>
        ) : results.length > 0 ? (
          <div className="p-4 space-y-3">
            {results.map((result) => (
              <div key={result.id} className="p-4 bg-muted/50 hover:bg-muted rounded-lg transition-colors duration-200 cursor-pointer group">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getTypeIcon(result.type)}
                      <h3 className="font-semibold text-foreground group-hover:text-matrix-primary transition-colors duration-200">
                        {result.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(result.type)}`}>
                        {result.type}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-3">{result.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <span>Relevance: {result.relevance}%</span>
                      </div>
                      {result.author && (
                        <div className="flex items-center space-x-1">
                          <span>by {result.author}</span>
                        </div>
                      )}
                      {result.lastUpdated && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{result.lastUpdated}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {result.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-background text-muted-foreground rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-matrix-primary transition-colors duration-200 ml-4" />
                </div>
              </div>
            ))}
          </div>
        ) : query.length > 2 ? (
          <div className="p-8 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <div className="text-foreground font-medium mb-2">No results found</div>
            <div className="text-muted-foreground text-sm">
              Try adjusting your search terms or filters
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <div className="text-foreground font-medium mb-2">Start typing to search</div>
            <div className="text-muted-foreground text-sm">
              Find courses, templates, guides, and community content
            </div>
          </div>
        )}
      </div>
    </div>
  )
}