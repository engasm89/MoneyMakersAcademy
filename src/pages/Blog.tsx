import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Search, 
  Calendar, 
  User, 
  ArrowRight,
  Tag,
  Clock,
  Eye,
  Heart,
  Share2
} from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const blogPosts = [
    {
      id: 1,
      title: "The Complete Guide to Algorithmic Trading in 2024",
      excerpt: "Learn the fundamentals of algorithmic trading, from basic concepts to advanced strategies. Discover how to build profitable trading systems.",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Education",
      tags: ["Algorithmic Trading", "Strategy", "Beginner"],
      image: "/api/placeholder/400/250",
      views: 1250,
      likes: 89
    },
    {
      id: 2,
      title: "Expert Advisor Development: From Strategy to Code",
      excerpt: "Step-by-step guide to developing your first Expert Advisor for MT4/MT5. Learn MQL4/MQL5 programming and backtesting techniques.",
      author: "Michael Chen",
      date: "2024-01-12",
      readTime: "12 min read",
      category: "Development",
      tags: ["MQL4", "MQL5", "Expert Advisor", "Programming"],
      image: "/api/placeholder/400/250",
      views: 980,
      likes: 67
    },
    {
      id: 3,
      title: "Risk Management: The Key to Long-Term Trading Success",
      excerpt: "Understanding risk management principles and implementing them in your trading strategy. Learn position sizing and risk controls.",
      author: "Dr. Lisa Wang",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Risk Management",
      tags: ["Risk Management", "Position Sizing", "Psychology"],
      image: "/api/placeholder/400/250",
      views: 756,
      likes: 45
    },
    {
      id: 4,
      title: "Managed Accounts vs. Self-Trading: Which is Right for You?",
      excerpt: "Compare managed account services with self-trading approaches. Understand the pros and cons of each method.",
      author: "David Rodriguez",
      date: "2024-01-08",
      readTime: "5 min read",
      category: "Managed Accounts",
      tags: ["Managed Accounts", "Self-Trading", "Comparison"],
      image: "/api/placeholder/400/250",
      views: 634,
      likes: 32
    },
    {
      id: 5,
      title: "Market Analysis: EUR/USD Technical Outlook",
      excerpt: "Current technical analysis of EUR/USD pair with trading opportunities and key support/resistance levels.",
      author: "Sarah Johnson",
      date: "2024-01-05",
      readTime: "4 min read",
      category: "Market Analysis",
      tags: ["EUR/USD", "Technical Analysis", "Forex"],
      image: "/api/placeholder/400/250",
      views: 892,
      likes: 56
    },
    {
      id: 6,
      title: "Building a Diversified Trading Portfolio",
      excerpt: "Learn how to diversify your trading portfolio across different asset classes and strategies for better risk-adjusted returns.",
      author: "Michael Chen",
      date: "2024-01-03",
      readTime: "7 min read",
      category: "Portfolio Management",
      tags: ["Portfolio", "Diversification", "Asset Allocation"],
      image: "/api/placeholder/400/250",
      views: 445,
      likes: 28
    }
  ];

  const categories = [
    { name: "All", value: "all" },
    { name: "Education", value: "Education" },
    { name: "Development", value: "Development" },
    { name: "Risk Management", value: "Risk Management" },
    { name: "Managed Accounts", value: "Managed Accounts" },
    { name: "Market Analysis", value: "Market Analysis" },
    { name: "Portfolio Management", value: "Portfolio Management" }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-slate-800">Money Makers Academy</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-slate-600 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/trading-dashboard" className="text-slate-600 hover:text-blue-600 transition-colors">
                Trading Dashboard
              </Link>
              <Link to="/trading" className="text-slate-600 hover:text-blue-600 transition-colors">
                Trading Solutions
              </Link>
              <Link to="/courses" className="text-slate-600 hover:text-blue-600 transition-colors">
                Courses
              </Link>
              <Link to="/community" className="text-slate-600 hover:text-blue-600 transition-colors">
                Community
              </Link>
              <Link to="/blog" className="text-blue-600 font-semibold">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Trading Insights & Education
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
            Stay updated with the latest trading strategies, market analysis, and educational content 
            from our expert team.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search articles, strategies, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg bg-white/90 border-0 rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.value)}
                className="rounded-full"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-xl transition-shadow group">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg flex items-center justify-center">
                  <TrendingUp className="h-16 w-16 text-blue-600" />
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-500">{post.readTime}</span>
                  </div>
                  
                  <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </CardTitle>
                  
                  <p className="text-slate-600 text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No articles found</h3>
              <p className="text-slate-500">Try adjusting your search terms or category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Stay Updated with Our Latest Content
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Get the latest trading insights, market analysis, and educational content 
            delivered directly to your inbox.
          </p>
          
          <div className="max-w-md mx-auto flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/90 border-0 text-slate-800"
            />
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8">
              Subscribe
            </Button>
          </div>
          
          <p className="text-sm text-blue-200 mt-4">
            Join 2,500+ traders who receive our weekly insights
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">Money Makers Academy</span>
              </div>
              <p className="text-slate-400 mb-4">
                Empowering traders and entrepreneurs with education, 
                automation, and managed trading solutions.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Trading Solutions</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/trading/expert-advisors" className="hover:text-white transition-colors">Expert Advisors</Link></li>
                <li><Link to="/trading/custom-ea" className="hover:text-white transition-colors">Custom EA Development</Link></li>
                <li><Link to="/trading/managed-accounts" className="hover:text-white transition-colors">Managed Accounts</Link></li>
                <li><Link to="/trading/performance" className="hover:text-white transition-colors">Performance</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Education</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/courses" className="hover:text-white transition-colors">Course Catalog</Link></li>
                <li><Link to="/coaching" className="hover:text-white transition-colors">Coaching</Link></li>
                <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
                <li><Link to="/success" className="hover:text-white transition-colors">Success Stories</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p className="mb-2">
              Trading foreign exchange and CFD instruments involves high risk and may not be suitable for all investors. 
              You could lose some or all of your capital. Past performance is not indicative of future results.
            </p>
            <p>&copy; 2024 Money Makers Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
