import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  TrendingUp, 
  MessageCircle, 
  ThumbsUp,
  Share2,
  Bookmark,
  Filter,
  Search,
  Star,
  Award,
  Target,
  Zap,
  Shield,
  Clock,
  Eye,
  Plus,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock community data
const mockPosts = [
  {
    id: 1,
    title: "EUR/USD Analysis - Bullish Breakout Confirmed",
    author: "Sarah Johnson",
    authorRole: "Senior Trader",
    authorAvatar: "/api/placeholder/40/40",
    content: "After weeks of consolidation, EUR/USD has finally broken above the key resistance at 1.0850. The breakout is supported by strong volume and RSI momentum. Target: 1.0950, Stop: 1.0800.",
    category: "Market Analysis",
    tags: ["EURUSD", "Technical Analysis", "Breakout"],
    likes: 47,
    comments: 12,
    shares: 8,
    timeAgo: "2 hours ago",
    isPinned: true,
    isVerified: true
  },
  {
    id: 2,
    title: "Risk Management Question - Position Sizing",
    author: "Mike Chen",
    authorRole: "Intermediate Trader",
    authorAvatar: "/api/placeholder/40/40",
    content: "I'm trading with a $10,000 account and want to risk 2% per trade. How should I calculate my position size for EUR/USD with a 50-pip stop loss? Any formulas or tools you recommend?",
    category: "Risk Management",
    tags: ["Position Sizing", "Risk Management", "Beginner"],
    likes: 23,
    comments: 18,
    shares: 5,
    timeAgo: "4 hours ago",
    isPinned: false,
    isVerified: false
  },
  {
    id: 3,
    title: "My EA Development Journey - From Idea to Live Trading",
    author: "David Rodriguez",
    authorRole: "EA Developer",
    authorAvatar: "/api/placeholder/40/40",
    content: "Sharing my 6-month journey building my first Expert Advisor. Started with simple moving average crossover, now running a complex multi-timeframe strategy. Key lessons learned and performance results inside.",
    category: "EA Development",
    tags: ["Expert Advisor", "MQL4", "Automation", "Success Story"],
    likes: 89,
    comments: 34,
    shares: 22,
    timeAgo: "6 hours ago",
    isPinned: false,
    isVerified: true
  },
  {
    id: 4,
    title: "Weekly Market Outlook - Major Pairs Analysis",
    author: "Lisa Wang",
    authorRole: "Market Analyst",
    authorAvatar: "/api/placeholder/40/40",
    content: "This week's focus: Fed policy impact on USD pairs, ECB meeting implications for EUR, and BOJ intervention risks for JPY. Detailed technical levels and fundamental drivers for each major pair.",
    category: "Market Analysis",
    tags: ["Weekly Outlook", "Fundamental Analysis", "USD", "EUR", "JPY"],
    likes: 156,
    comments: 28,
    shares: 45,
    timeAgo: "1 day ago",
    isPinned: true,
    isVerified: true
  },
  {
    id: 5,
    title: "Trading Psychology - Dealing with Drawdowns",
    author: "Dr. James Thompson",
    authorRole: "Trading Psychologist",
    authorAvatar: "/api/placeholder/40/40",
    content: "Drawdowns are inevitable in trading. The key is how you handle them mentally. Here are 5 strategies to maintain emotional control during losing streaks and come back stronger.",
    category: "Trading Psychology",
    tags: ["Psychology", "Drawdown", "Emotional Control", "Mental Discipline"],
    likes: 78,
    comments: 41,
    shares: 19,
    timeAgo: "2 days ago",
    isPinned: false,
    isVerified: true
  }
];

const mockMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Trader",
    avatar: "/api/placeholder/60/60",
    joinDate: "2023-01-15",
    posts: 127,
    likes: 2341,
    isVerified: true,
    isOnline: true,
    specialties: ["Technical Analysis", "Risk Management"]
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Intermediate Trader",
    avatar: "/api/placeholder/60/60",
    joinDate: "2023-06-20",
    posts: 89,
    likes: 1456,
    isVerified: false,
    isOnline: false,
    specialties: ["Forex Trading", "Chart Patterns"]
  },
  {
    id: 3,
    name: "David Rodriguez",
    role: "EA Developer",
    avatar: "/api/placeholder/60/60",
    joinDate: "2022-11-08",
    posts: 203,
    likes: 3892,
    isVerified: true,
    isOnline: true,
    specialties: ["MQL4/MQL5", "Algorithmic Trading"]
  },
  {
    id: 4,
    name: "Lisa Wang",
    role: "Market Analyst",
    avatar: "/api/placeholder/60/60",
    joinDate: "2023-03-12",
    posts: 156,
    likes: 2789,
    isVerified: true,
    isOnline: false,
    specialties: ["Fundamental Analysis", "Economic Calendar"]
  },
  {
    id: 5,
    name: "Dr. James Thompson",
    role: "Trading Psychologist",
    avatar: "/api/placeholder/60/60",
    joinDate: "2022-09-30",
    posts: 98,
    likes: 1923,
    isVerified: true,
    isOnline: true,
    specialties: ["Trading Psychology", "Mental Discipline"]
  }
];

const Community = () => {
  const [activeTab, setActiveTab] = useState("discussions");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    tags: ""
  });

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating post:", newPost);
    // Here you would typically send the data to your backend
    alert("Post created successfully!");
    setNewPost({ title: "", content: "", category: "", tags: "" });
  };

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
            <div className="flex items-center space-x-8">
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
              <Link to="/community" className="text-blue-600 font-semibold">
                Community
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Trading Community
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
            Connect with fellow traders, share insights, and learn from experienced professionals. 
            Join our vibrant community of successful traders and entrepreneurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4">
              <Users className="mr-2 h-5 w-5" />
              Join Community
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Discussion
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">2,500+</div>
              <div className="text-slate-600">Active Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">15,000+</div>
              <div className="text-slate-600">Discussions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">50,000+</div>
              <div className="text-slate-600">Posts & Comments</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">24/7</div>
              <div className="text-slate-600">Active Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Create Post */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5 text-blue-600" />
                      Create Post
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCreatePost} className="space-y-4">
                      <div>
                        <Input
                          placeholder="Post title..."
                          value={newPost.title}
                          onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Textarea
                          placeholder="What's on your mind?"
                          value={newPost.content}
                          onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                          rows={3}
                          required
                        />
                      </div>
                      <div>
                        <Select value={newPost.category} onValueChange={(value) => setNewPost(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="market-analysis">Market Analysis</SelectItem>
                            <SelectItem value="risk-management">Risk Management</SelectItem>
                            <SelectItem value="ea-development">EA Development</SelectItem>
                            <SelectItem value="psychology">Trading Psychology</SelectItem>
                            <SelectItem value="general">General Discussion</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Input
                          placeholder="Tags (comma separated)"
                          value={newPost.tags}
                          onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Post Discussion
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Community Rules */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      Community Rules
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        Be respectful and constructive
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        No spam or self-promotion
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        Share knowledge and insights
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        Help fellow traders
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        Follow trading guidelines
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Top Members */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-yellow-600" />
                      Top Contributors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockMembers.slice(0, 3).map((member) => (
                        <div key={member.id} className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            {member.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1">
                              <span className="font-semibold text-sm text-slate-800">{member.name}</span>
                              {member.isVerified && (
                                <CheckCircle className="h-3 w-3 text-blue-600" />
                              )}
                            </div>
                            <div className="text-xs text-slate-500">{member.role}</div>
                          </div>
                          <div className="text-xs text-slate-500">
                            {member.posts} posts
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Tabs */}
              <div className="flex space-x-1 mb-6">
                <Button
                  variant={activeTab === "discussions" ? "default" : "outline"}
                  onClick={() => setActiveTab("discussions")}
                  className="flex-1"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Discussions
                </Button>
                <Button
                  variant={activeTab === "members" ? "default" : "outline"}
                  onClick={() => setActiveTab("members")}
                  className="flex-1"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Members
                </Button>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search discussions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="market analysis">Market Analysis</SelectItem>
                    <SelectItem value="risk management">Risk Management</SelectItem>
                    <SelectItem value="ea development">EA Development</SelectItem>
                    <SelectItem value="trading psychology">Trading Psychology</SelectItem>
                    <SelectItem value="general">General Discussion</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Posts */}
              {activeTab === "discussions" && (
                <div className="space-y-6">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className={`hover:shadow-lg transition-shadow ${post.isPinned ? 'border-l-4 border-l-blue-500' : ''}`}>
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-slate-800">{post.author}</span>
                                {post.isVerified && (
                                  <CheckCircle className="h-4 w-4 text-blue-600" />
                                )}
                                <Badge variant="outline" className="text-xs">
                                  {post.authorRole}
                                </Badge>
                              </div>
                              <div className="text-sm text-slate-500">
                                {post.timeAgo} • {post.category}
                              </div>
                            </div>
                          </div>
                          {post.isPinned && (
                            <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                              Pinned
                            </Badge>
                          )}
                        </div>
                        
                        <CardTitle className="text-lg text-slate-800 mb-2">{post.title}</CardTitle>
                        <p className="text-slate-600 text-sm mb-4">{post.content}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <Button variant="ghost" size="sm" className="text-slate-600">
                              <ThumbsUp className="mr-2 h-4 w-4" />
                              {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-slate-600">
                              <MessageCircle className="mr-2 h-4 w-4" />
                              {post.comments}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-slate-600">
                              <Share2 className="mr-2 h-4 w-4" />
                              {post.shares}
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Bookmark className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Members */}
              {activeTab === "members" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockMembers.map((member) => (
                    <Card key={member.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                              <Users className="h-8 w-8 text-blue-600" />
                            </div>
                            {member.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-slate-800">{member.name}</h3>
                              {member.isVerified && (
                                <CheckCircle className="h-4 w-4 text-blue-600" />
                              )}
                            </div>
                            <p className="text-sm text-slate-600 mb-2">{member.role}</p>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span>{member.posts} posts</span>
                              <span>{member.likes} likes</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-slate-800 mb-2">Specialties:</h4>
                          <div className="flex flex-wrap gap-2">
                            {member.specialties.map((specialty, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            Joined {new Date(member.joinDate).toLocaleDateString()}
                          </span>
                          <Button size="sm" variant="outline">
                            <MessageCircle className="mr-2 h-3 w-3" />
                            Message
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Connect with thousands of traders, share your insights, and accelerate your learning 
            journey with our supportive community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4">
              <Users className="mr-2 h-5 w-5" />
              Join Community Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
              <MessageCircle className="mr-2 h-5 w-5" />
              Browse Discussions
            </Button>
          </div>
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

export default Community;
