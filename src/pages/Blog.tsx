import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Calendar, 
  User, 
  ArrowRight, 
  TrendingUp,
  BookOpen,
  MessageCircle,
  Download,
  Play,
  Clock,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";
import MobileNavigation from "@/components/MobileNavigation";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const blogPosts = [
    {
      id: 1,
      title: "The Complete Guide to Algorithmic Trading in 2024",
      excerpt: "Learn how to build profitable trading algorithms from scratch. This comprehensive guide covers everything from strategy development to risk management.",
      author: "Sarah Chen",
      date: "2024-01-15",
      readTime: "12 min read",
      category: "Algorithmic Trading",
      image: "/api/placeholder/400/250",
      views: 2847,
      featured: true
    },
    {
      id: 2,
      title: "Expert Advisor Development: From Idea to Profit",
      excerpt: "Step-by-step process of creating your first Expert Advisor for MetaTrader 4/5. Includes code examples and testing strategies.",
      author: "Michael Rodriguez",
      date: "2024-01-12",
      readTime: "8 min read",
      category: "Expert Advisors",
      image: "/api/placeholder/400/250",
      views: 1923
    },
    {
      id: 3,
      title: "Risk Management Strategies for Automated Trading",
      excerpt: "Protect your capital with proven risk management techniques. Learn position sizing, stop-loss strategies, and portfolio diversification.",
      author: "Dr. James Wilson",
      date: "2024-01-10",
      readTime: "10 min read",
      category: "Risk Management",
      image: "/api/placeholder/400/250",
      views: 1654
    },
    {
      id: 4,
      title: "Backtesting vs Forward Testing: What You Need to Know",
      excerpt: "Understanding the difference between backtesting and forward testing, and why both are crucial for successful algorithmic trading.",
      author: "Lisa Thompson",
      date: "2024-01-08",
      readTime: "6 min read",
      category: "Testing",
      image: "/api/placeholder/400/250",
      views: 1432
    },
    {
      id: 5,
      title: "Building a Diversified Trading Portfolio",
      excerpt: "Learn how to create a balanced portfolio of trading strategies across different markets and timeframes for consistent returns.",
      author: "Robert Kim",
      date: "2024-01-05",
      readTime: "9 min read",
      category: "Portfolio Management",
      image: "/api/placeholder/400/250",
      views: 1287
    },
    {
      id: 6,
      title: "The Psychology of Automated Trading",
      excerpt: "Overcoming emotional trading decisions and maintaining discipline when using automated systems.",
      author: "Dr. Amanda Foster",
      date: "2024-01-03",
      readTime: "7 min read",
      category: "Psychology",
      image: "/api/placeholder/400/250",
      views: 1156
    }
  ];

  const categories = [
    "All",
    "Algorithmic Trading",
    "Expert Advisors", 
    "Risk Management",
    "Testing",
    "Portfolio Management",
    "Psychology"
  ];

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Link to="/courses">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Start Free
                </Button>
              </Link>
            </div>
            <MobileNavigation />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Trading Insights & Education
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Stay ahead with expert insights, tutorials, and market analysis from our team of professional traders
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles, tutorials, and insights..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg bg-white text-slate-900 border-0 rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-blue-50"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Featured Article</h2>
          {filteredPosts.filter(post => post.featured).map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="h-64 md:h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <Play className="h-16 w-16 text-blue-600" />
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge className="bg-blue-100 text-blue-800">Featured</Badge>
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{post.title}</h3>
                  <p className="text-slate-600 mb-6">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.views.toLocaleString()}</span>
                      </div>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.filter(post => !post.featured).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-blue-600" />
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.views.toLocaleString()}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8">
            Get the latest trading insights, tutorials, and market analysis delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex space-x-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white text-slate-900 border-0"
            />
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8">
              Subscribe
            </Button>
          </div>
          <p className="text-sm mt-4 opacity-80">
            No spam, unsubscribe at any time
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">Money Makers Academy</span>
              </div>
              <p className="text-slate-300 mb-4">
                Empowering traders worldwide with algorithmic trading education and expert solutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Trading Solutions</h3>
              <ul className="space-y-2 text-slate-300">
                <li><Link to="/trading/expert-advisors" className="hover:text-white">Expert Advisors</Link></li>
                <li><Link to="/trading/custom-ea" className="hover:text-white">Custom EA Development</Link></li>
                <li><Link to="/trading/managed-accounts" className="hover:text-white">Managed Accounts</Link></li>
                <li><Link to="/trading-dashboard" className="hover:text-white">Trading Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Education</h3>
              <ul className="space-y-2 text-slate-300">
                <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link to="/community" className="hover:text-white">Community</Link></li>
                <li><Link to="/success" className="hover:text-white">Success Stories</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-300">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Money Makers Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;