import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BookOpen, 
  TrendingUp, 
  Users, 
  Clock, 
  Star,
  Play,
  Download,
  Award,
  CheckCircle,
  ArrowRight,
  Filter,
  Search,
  Target,
  Zap,
  Shield,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock course data
const mockCourses = [
  {
    id: 1,
    title: "Forex Trading Fundamentals",
    description: "Master the basics of forex trading from currency pairs to market analysis",
    instructor: "Sarah Johnson",
    duration: "6 weeks",
    level: "Beginner",
    price: 297,
    originalPrice: 497,
    rating: 4.9,
    students: 1247,
    lessons: 24,
    category: "Trading Basics",
    image: "/api/placeholder/400/250",
    features: [
      "Live trading sessions",
      "Downloadable resources",
      "Certificate of completion",
      "Lifetime access",
      "Mobile app access"
    ],
    curriculum: [
      "Introduction to Forex Markets",
      "Currency Pairs and Pips",
      "Reading Price Charts",
      "Technical Analysis Basics",
      "Risk Management",
      "Trading Psychology"
    ],
    isPopular: true
  },
  {
    id: 2,
    title: "Advanced Technical Analysis",
    description: "Deep dive into advanced chart patterns, indicators, and market structure",
    instructor: "Michael Chen",
    duration: "8 weeks",
    level: "Intermediate",
    price: 497,
    originalPrice: 697,
    rating: 4.8,
    students: 892,
    lessons: 32,
    category: "Technical Analysis",
    image: "/api/placeholder/400/250",
    features: [
      "Advanced charting techniques",
      "Custom indicator development",
      "Market structure analysis",
      "Live Q&A sessions",
      "Trading journal templates"
    ],
    curriculum: [
      "Advanced Chart Patterns",
      "Fibonacci Analysis",
      "Market Structure",
      "Volume Analysis",
      "Multi-timeframe Analysis",
      "Custom Indicators"
    ],
    isPopular: false
  },
  {
    id: 3,
    title: "Expert Advisor Development",
    description: "Learn to build and program automated trading systems for MT4/MT5",
    instructor: "David Rodriguez",
    duration: "12 weeks",
    level: "Advanced",
    price: 997,
    originalPrice: 1297,
    rating: 4.9,
    students: 456,
    lessons: 48,
    category: "Automation",
    image: "/api/placeholder/400/250",
    features: [
      "MQL4/MQL5 programming",
      "Strategy development",
      "Backtesting and optimization",
      "Risk management coding",
      "Live deployment support"
    ],
    curriculum: [
      "MQL4/MQL5 Basics",
      "Strategy Development",
      "Risk Management Systems",
      "Backtesting Techniques",
      "Optimization Methods",
      "Live Deployment"
    ],
    isPopular: true
  },
  {
    id: 4,
    title: "Risk Management Mastery",
    description: "Protect your capital with professional risk management strategies",
    instructor: "Lisa Wang",
    duration: "4 weeks",
    level: "All Levels",
    price: 197,
    originalPrice: 297,
    rating: 4.7,
    students: 1563,
    lessons: 16,
    category: "Risk Management",
    image: "/api/placeholder/400/250",
    features: [
      "Position sizing formulas",
      "Drawdown management",
      "Portfolio diversification",
      "Risk assessment tools",
      "Emergency protocols"
    ],
    curriculum: [
      "Position Sizing",
      "Drawdown Control",
      "Portfolio Management",
      "Risk Assessment",
      "Emergency Procedures",
      "Performance Monitoring"
    ],
    isPopular: false
  },
  {
    id: 5,
    title: "Trading Psychology & Mindset",
    description: "Develop the mental discipline and emotional control for consistent trading",
    instructor: "Dr. James Thompson",
    duration: "5 weeks",
    level: "All Levels",
    price: 247,
    originalPrice: 347,
    rating: 4.8,
    students: 1089,
    lessons: 20,
    category: "Psychology",
    image: "/api/placeholder/400/250",
    features: [
      "Emotional control techniques",
      "Mental discipline training",
      "Stress management",
      "Decision-making frameworks",
      "Performance tracking"
    ],
    curriculum: [
      "Trading Psychology Basics",
      "Emotional Control",
      "Decision Making",
      "Stress Management",
      "Performance Tracking",
      "Mental Discipline"
    ],
    isPopular: false
  },
  {
    id: 6,
    title: "Cryptocurrency Trading",
    description: "Navigate the volatile crypto markets with professional strategies",
    instructor: "Alex Kim",
    duration: "6 weeks",
    level: "Intermediate",
    price: 397,
    originalPrice: 497,
    rating: 4.6,
    students: 743,
    lessons: 28,
    category: "Cryptocurrency",
    image: "/api/placeholder/400/250",
    features: [
      "Crypto market analysis",
      "DeFi strategies",
      "Exchange platforms",
      "Security best practices",
      "Tax implications"
    ],
    curriculum: [
      "Crypto Market Basics",
      "Technical Analysis",
      "DeFi Strategies",
      "Exchange Platforms",
      "Security Practices",
      "Tax Considerations"
    ],
    isPopular: true
  }
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === "all" || course.level.toLowerCase() === selectedLevel.toLowerCase();
    const matchesCategory = selectedCategory === "all" || course.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesPrice = selectedPrice === "all" || 
                        (selectedPrice === "free" && course.price === 0) ||
                        (selectedPrice === "under-300" && course.price < 300) ||
                        (selectedPrice === "300-600" && course.price >= 300 && course.price < 600) ||
                        (selectedPrice === "over-600" && course.price >= 600);
    
    return matchesSearch && matchesLevel && matchesCategory && matchesPrice;
  });

  const getLevelBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-300';
      case 'intermediate': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
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
              <Link to="/courses" className="text-blue-600 font-semibold">
                Courses
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Trading Education Hub
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
            Master the art of trading with our comprehensive courses. From beginner fundamentals 
            to advanced automation, we've got everything you need to succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4">
              <Play className="mr-2 h-5 w-5" />
              Start Learning Today
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
              <Download className="mr-2 h-5 w-5" />
              Download Syllabus
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">6,000+</div>
              <div className="text-slate-600">Students Enrolled</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
              <div className="text-slate-600">Expert Instructors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-slate-600">Course Hours</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">4.8</div>
              <div className="text-slate-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-slate-600" />
              <span className="font-semibold text-slate-800">Filters:</span>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="trading basics">Trading Basics</SelectItem>
                  <SelectItem value="technical analysis">Technical Analysis</SelectItem>
                  <SelectItem value="automation">Automation</SelectItem>
                  <SelectItem value="risk management">Risk Management</SelectItem>
                  <SelectItem value="psychology">Psychology</SelectItem>
                  <SelectItem value="cryptocurrency">Cryptocurrency</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="under-300">Under $300</SelectItem>
                  <SelectItem value="300-600">$300 - $600</SelectItem>
                  <SelectItem value="over-600">Over $600</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Available Courses
            </h2>
            <p className="text-lg text-slate-600">
              {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <Card key={course.id} className={`hover:shadow-xl transition-shadow border-2 ${course.isPopular ? 'border-yellow-300 bg-yellow-50' : ''}`}>
                {course.isPopular && (
                  <div className="absolute -top-3 left-4">
                    <Badge className="bg-yellow-500 text-white px-3 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="relative mb-4">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-blue-600" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge className={getLevelBadgeColor(course.level)}>
                        {course.level}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl text-slate-800 mb-2">{course.title}</CardTitle>
                  <p className="text-slate-600 text-sm mb-4">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{course.rating}</span>
                      <span>({course.students})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Play className="h-4 w-4" />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Curriculum Preview */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-800 mb-3">What You'll Learn:</h4>
                    <ul className="space-y-1">
                      {course.curriculum.slice(0, 3).map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                      {course.curriculum.length > 3 && (
                        <li className="text-sm text-blue-600 font-medium">
                          +{course.curriculum.length - 3} more topics
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-800 mb-3">Course Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-slate-800">${course.price}</div>
                        {course.originalPrice > course.price && (
                          <div className="text-sm text-slate-500 line-through">${course.originalPrice}</div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-600">{course.category}</div>
                        <div className="text-xs text-slate-500">{course.duration}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Play className="mr-2 h-4 w-4" />
                        Enroll Now
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Structured Learning Paths
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Follow our carefully designed learning paths to build your trading skills systematically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Beginner Path</h3>
              <p className="text-slate-600 mb-6">
                Start your trading journey with fundamentals and build a solid foundation.
              </p>
              <ul className="text-sm text-slate-600 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Forex Trading Fundamentals
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Risk Management Mastery
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Trading Psychology & Mindset
                </li>
              </ul>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Start Beginner Path
              </Button>
            </Card>

            <Card className="text-center p-8 border-2 border-blue-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Intermediate Path</h3>
              <p className="text-slate-600 mb-6">
                Develop advanced skills and learn professional trading strategies.
              </p>
              <ul className="text-sm text-slate-600 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Advanced Technical Analysis
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Cryptocurrency Trading
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Portfolio Management
                </li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Start Intermediate Path
              </Button>
            </Card>

            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Advanced Path</h3>
              <p className="text-slate-600 mb-6">
                Master automation and build professional trading systems.
              </p>
              <ul className="text-sm text-slate-600 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Expert Advisor Development
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Algorithmic Trading
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Advanced Risk Management
                </li>
              </ul>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Start Advanced Path
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Trading Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of successful traders who have transformed their financial future 
            with our comprehensive education programs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4">
              <BookOpen className="mr-2 h-5 w-5" />
              Browse All Courses
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
              <Users className="mr-2 h-5 w-5" />
              Join Community
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

export default Courses;
