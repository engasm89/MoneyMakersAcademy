import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  Star,
  Quote,
  ArrowRight,
  Filter,
  Search,
  Target,
  DollarSign,
  BarChart3,
  Clock,
  Award,
  CheckCircle,
  Play,
  Download
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock success stories data
const mockStories = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Former Accountant",
    location: "Toronto, Canada",
    avatar: "/api/placeholder/80/80",
    story: "After 15 years in accounting, I was burned out and looking for a change. I started with the Forex Trading Fundamentals course and within 6 months, I was making more from trading than my salary. Now I trade full-time and have achieved financial freedom.",
    results: {
      initialInvestment: 5000,
      currentPortfolio: 125000,
      monthlyIncome: 8500,
      timeToSuccess: "6 months",
      winRate: 78
    },
    courses: ["Forex Trading Fundamentals", "Risk Management Mastery", "Trading Psychology"],
    tools: ["Conservative Trend EA", "Custom Risk Management EA"],
    isFeatured: true,
    isVerified: true,
    rating: 5,
    testimonial: "Money Makers Academy didn't just teach me to trade - they gave me my life back. The structured approach and community support made all the difference."
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Software Engineer",
    location: "San Francisco, USA",
    avatar: "/api/placeholder/80/80",
    story: "As a software engineer, I was fascinated by algorithmic trading. The Expert Advisor Development course helped me combine my programming skills with trading knowledge. I now run multiple EAs and have built a profitable trading system.",
    results: {
      initialInvestment: 10000,
      currentPortfolio: 85000,
      monthlyIncome: 6200,
      timeToSuccess: "8 months",
      winRate: 72
    },
    courses: ["Expert Advisor Development", "Advanced Technical Analysis"],
    tools: ["Custom Grid EA", "Multi-timeframe EA"],
    isFeatured: false,
    isVerified: true,
    rating: 5,
    testimonial: "The EA development course was exactly what I needed. The instructors are world-class and the community is incredibly supportive."
  },
  {
    id: 3,
    name: "David Rodriguez",
    role: "Business Owner",
    location: "Madrid, Spain",
    avatar: "/api/placeholder/80/80",
    story: "Running a business taught me about risk management, but I wanted to apply those skills to trading. The comprehensive approach at Money Makers Academy helped me build a diversified trading portfolio that generates consistent returns.",
    results: {
      initialInvestment: 25000,
      currentPortfolio: 180000,
      monthlyIncome: 12000,
      timeToSuccess: "10 months",
      winRate: 75
    },
    courses: ["Forex Trading Fundamentals", "Advanced Technical Analysis", "Risk Management Mastery"],
    tools: ["Balanced Mean Reversion EA", "Portfolio Management System"],
    isFeatured: true,
    isVerified: true,
    rating: 5,
    testimonial: "The risk management principles I learned here are now applied to both my business and trading. It's been transformative."
  },
  {
    id: 4,
    name: "Lisa Wang",
    role: "Marketing Manager",
    location: "Singapore",
    avatar: "/api/placeholder/80/80",
    story: "I was looking for a side income stream and discovered forex trading. The beginner-friendly approach and step-by-step guidance helped me build confidence. Now I trade part-time while maintaining my marketing career.",
    results: {
      initialInvestment: 3000,
      currentPortfolio: 28000,
      monthlyIncome: 2200,
      timeToSuccess: "4 months",
      winRate: 69
    },
    courses: ["Forex Trading Fundamentals", "Trading Psychology & Mindset"],
    tools: ["Conservative Trend EA"],
    isFeatured: false,
    isVerified: true,
    rating: 5,
    testimonial: "Perfect for beginners! The courses are well-structured and the community is amazing. I've learned so much in just a few months."
  },
  {
    id: 5,
    name: "Dr. James Thompson",
    role: "Psychologist",
    location: "London, UK",
    avatar: "/api/placeholder/80/80",
    story: "My background in psychology gave me insights into trading psychology, but I needed the technical skills. The comprehensive education at Money Makers Academy helped me become a well-rounded trader.",
    results: {
      initialInvestment: 15000,
      currentPortfolio: 95000,
      monthlyIncome: 7800,
      timeToSuccess: "7 months",
      winRate: 81
    },
    courses: ["Trading Psychology & Mindset", "Advanced Technical Analysis", "Risk Management Mastery"],
    tools: ["Custom Psychology-based EA"],
    isFeatured: false,
    isVerified: true,
    rating: 5,
    testimonial: "The psychological aspects of trading are often overlooked. This academy addresses both the technical and mental sides of trading."
  },
  {
    id: 6,
    name: "Alex Kim",
    role: "Student",
    location: "Seoul, South Korea",
    avatar: "/api/placeholder/80/80",
    story: "As a university student, I was looking for ways to make money while studying. The flexible learning schedule and comprehensive courses allowed me to learn trading alongside my studies. Now I'm financially independent.",
    results: {
      initialInvestment: 1000,
      currentPortfolio: 15000,
      monthlyIncome: 1200,
      timeToSuccess: "5 months",
      winRate: 71
    },
    courses: ["Forex Trading Fundamentals", "Cryptocurrency Trading"],
    tools: ["Conservative Trend EA"],
    isFeatured: false,
    isVerified: true,
    rating: 5,
    testimonial: "Being a student, I needed flexible learning options. The self-paced courses and community support were perfect for my schedule."
  }
];

const SuccessStories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("all");

  const filteredStories = mockStories.filter(story => {
    const matchesSearch = story.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.story.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "featured" && story.isFeatured) ||
                         (selectedFilter === "verified" && story.isVerified);
    
    const matchesTimeframe = selectedTimeframe === "all" ||
                            (selectedTimeframe === "under-6-months" && parseInt(story.results.timeToSuccess) < 6) ||
                            (selectedTimeframe === "6-12-months" && parseInt(story.results.timeToSuccess) >= 6 && parseInt(story.results.timeToSuccess) <= 12) ||
                            (selectedTimeframe === "over-12-months" && parseInt(story.results.timeToSuccess) > 12);
    
    return matchesSearch && matchesFilter && matchesTimeframe;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateROI = (initial: number, current: number) => {
    return ((current - initial) / initial * 100).toFixed(1);
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
              <Link to="/community" className="text-slate-600 hover:text-blue-600 transition-colors">
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
            Success Stories
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
            Real people, real results. Discover how our students have transformed their financial 
            futures through trading education and automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4">
              <Trophy className="mr-2 h-5 w-5" />
              Start Your Success Story
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
              <Play className="mr-2 h-5 w-5" />
              Watch Video Testimonials
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">$2.5M+</div>
              <div className="text-slate-600">Total Portfolio Value</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
              <div className="text-slate-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">6.2</div>
              <div className="text-slate-600">Avg Months to Success</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">4.9</div>
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
                  placeholder="Search success stories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stories</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Time to Success" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Timeframes</SelectItem>
                  <SelectItem value="under-6-months">Under 6 Months</SelectItem>
                  <SelectItem value="6-12-months">6-12 Months</SelectItem>
                  <SelectItem value="over-12-months">Over 12 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Real Success Stories
            </h2>
            <p className="text-lg text-slate-600">
              {filteredStories.length} success story{filteredStories.length !== 1 ? 'ies' : ''} found
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredStories.map((story) => (
              <Card key={story.id} className={`hover:shadow-xl transition-shadow border-2 ${story.isFeatured ? 'border-yellow-300 bg-yellow-50' : ''}`}>
                {story.isFeatured && (
                  <div className="absolute -top-3 left-4">
                    <Badge className="bg-yellow-500 text-white px-3 py-1">Featured Story</Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                        <Users className="h-10 w-10 text-blue-600" />
                      </div>
                      {story.isVerified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-slate-800">{story.name}</h3>
                        <div className="flex">
                          {[...Array(story.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 mb-1">{story.role}</p>
                      <p className="text-sm text-slate-500">{story.location}</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-slate-700 italic border-l-4 border-blue-500 pl-4 mb-4">
                    "{story.testimonial}"
                  </blockquote>
                  
                  <p className="text-slate-600 text-sm">{story.story}</p>
                </CardHeader>
                
                <CardContent>
                  {/* Results */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">
                        {formatCurrency(story.results.currentPortfolio)}
                      </div>
                      <div className="text-xs text-slate-600">Current Portfolio</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">
                        {calculateROI(story.results.initialInvestment, story.results.currentPortfolio)}%
                      </div>
                      <div className="text-xs text-slate-600">ROI</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">
                        {formatCurrency(story.results.monthlyIncome)}
                      </div>
                      <div className="text-xs text-slate-600">Monthly Income</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <div className="text-lg font-bold text-yellow-600">
                        {story.results.timeToSuccess}
                      </div>
                      <div className="text-xs text-slate-600">Time to Success</div>
                    </div>
                  </div>

                  {/* Courses Taken */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-800 mb-3">Courses Taken:</h4>
                    <div className="flex flex-wrap gap-2">
                      {story.courses.map((course, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Tools Used */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-800 mb-3">Tools Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {story.tools.map((tool, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-300">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <Play className="mr-2 h-4 w-4" />
                      Watch Interview
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Users className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Video Testimonials
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Hear directly from our successful students about their journey and transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <Play className="h-16 w-16 text-blue-600" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-slate-800 mb-2">Sarah's Journey</h3>
                <p className="text-sm text-slate-600 mb-4">
                  From accountant to full-time trader in 6 months
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">5:32</span>
                  <Button size="sm" variant="outline">
                    <Play className="mr-2 h-3 w-3" />
                    Watch
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <Play className="h-16 w-16 text-green-600" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-slate-800 mb-2">Mike's EA Success</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Software engineer builds profitable trading system
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">7:15</span>
                  <Button size="sm" variant="outline">
                    <Play className="mr-2 h-3 w-3" />
                    Watch
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <Play className="h-16 w-16 text-purple-600" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-slate-800 mb-2">David's Portfolio</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Business owner diversifies with trading
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">6:48</span>
                  <Button size="sm" variant="outline">
                    <Play className="mr-2 h-3 w-3" />
                    Watch
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of successful traders who have transformed their financial future 
            with our comprehensive education and automation solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4">
              <Trophy className="mr-2 h-5 w-5" />
              Start Your Journey
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
              <Download className="mr-2 h-5 w-5" />
              Download Success Guide
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

export default SuccessStories;
