import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Globe, 
  Award, 
  ArrowRight, 
  CheckCircle, 
  Star,
  BarChart3,
  Bot,
  Shield,
  BookOpen,
  MessageCircle,
  Download,
  Play
} from "lucide-react";
import { Link } from "react-router-dom";
import MobileNavigation from "@/components/MobileNavigation";

const Homepage = () => {
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            From Skills to Signals:<br />
            <span className="text-yellow-300">Learn, Automate, and Grow</span><br />
            with Algorithmic Trading
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
            We teach you to earn online—and we build & manage trading systems for you.
            Master freelancing, digital marketing, and algorithmic trading under one roof.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/trading">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4">
                Explore Trading Solutions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/courses">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
                Start Free Course
              </Button>
            </Link>
            <Link to="/contact">
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
                Book Strategy Call
              </Button>
            </Link>
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-blue-100">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>2,500+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <span>45+ Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <span>Verified Performance</span>
            </div>
          </div>
        </div>
      </section>

      {/* USP Strip */}
      <section className="py-4 bg-slate-800 text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm font-medium">
            <span className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-green-400" />
              Expert Advisors (MT4/MT5)
            </span>
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-400" />
              Managed Accounts
            </span>
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-purple-400" />
              Education
            </span>
            <span className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-yellow-400" />
              Community
            </span>
          </div>
        </div>
      </section>

      {/* Flagship Trading Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Our Trading Solutions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From ready-to-use Expert Advisors to fully managed accounts, 
              we provide comprehensive trading solutions for every level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Managed Accounts */}
            <Card className="border-2 border-green-200 hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-800">Managed Accounts</CardTitle>
                <p className="text-slate-600">Hands-off trading with transparent performance</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Conservative Tier:</span>
                    <span className="font-semibold text-green-600">2-5%/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Balanced Tier:</span>
                    <span className="font-semibold text-blue-600">5-10%/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Aggressive Tier:</span>
                    <span className="font-semibold text-red-600">10-20%/month</span>
                  </div>
                </div>
                <Link to="/trading/managed-accounts">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    View Managed Accounts
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Expert Advisors */}
            <Card className="border-2 border-blue-200 hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Bot className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-blue-800">Expert Advisors</CardTitle>
                <p className="text-slate-600">Battle-tested MT4/MT5 trading bots</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Proven Backtests</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Live Performance</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Risk Controls</span>
                  </div>
                </div>
                <Link to="/trading/expert-advisors">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Browse EAs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Custom EA Development */}
            <Card className="border-2 border-purple-200 hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl text-purple-800">Custom EA Development</CardTitle>
                <p className="text-slate-600">Bespoke trading solutions for your strategy</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Strategy Translation</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Risk Management</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Forward Testing</span>
                  </div>
                </div>
                <Link to="/trading/custom-ea">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Request Custom EA
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Performance Preview */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Verified Performance
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Transparent, audited results from our trading systems and managed accounts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">+24.5%</div>
              <div className="text-slate-600">YTD Return</div>
            </Card>
            <Card className="text-center p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">8.2%</div>
              <div className="text-slate-600">Max Drawdown</div>
            </Card>
            <Card className="text-center p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">1.85</div>
              <div className="text-slate-600">Sharpe Ratio</div>
            </Card>
            <Card className="text-center p-6">
              <div className="text-3xl font-bold text-yellow-600 mb-2">73%</div>
              <div className="text-slate-600">Win Rate</div>
            </Card>
          </div>

          <div className="text-center">
            <Link to="/trading/managed-accounts">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                See Full Performance Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Education Ecosystem */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Complete Education Ecosystem
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Learn first—then scale with automation. Master multiple income streams 
              from freelancing to algorithmic trading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Freelancing */}
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl text-green-800">Freelancing</CardTitle>
                </div>
                <p className="text-slate-600">
                  Master digital skills, client acquisition, and project management 
                  to build a sustainable freelance business.
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Digital Marketing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Client Acquisition</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Project Management</span>
                  </li>
                </ul>
                <Link to="/courses">
                  <Button variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-50">
                    Explore Freelancing Courses
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Trading & Investing */}
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl text-blue-800">Trading & Investing</CardTitle>
                </div>
                <p className="text-slate-600">
                  From Forex basics to advanced algorithmic trading strategies. 
                  Learn to trade manually and automate with Expert Advisors.
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Forex Fundamentals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Algorithmic Trading</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Risk Management</span>
                  </li>
                </ul>
                <Link to="/courses">
                  <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-50">
                    Explore Trading Courses
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Passive Income */}
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl text-purple-800">Passive Income</CardTitle>
                </div>
                <p className="text-slate-600">
                  Build automated income streams through e-commerce, POD, 
                  and business tools that work while you sleep.
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">E-commerce & POD</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Business Tools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Productivity</span>
                  </li>
                </ul>
                <Link to="/courses">
                  <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
                    Explore Passive Income
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community & Proof */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Join Our Global Community
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Connect with traders and entrepreneurs worldwide. Share signals, 
              strategies, and success stories in our active community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Community Stats */}
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">2,500+</div>
                  <div className="text-slate-300">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">45+</div>
                  <div className="text-slate-300">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                  <div className="text-slate-300">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">500+</div>
                  <div className="text-slate-300">Success Stories</div>
                </div>
              </div>

              <div className="space-y-4">
                <Link to="/community">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Join Telegram Community
                  </Button>
                </Link>
                <Link to="/community">
                  <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-slate-800">
                    <Users className="mr-2 h-5 w-5" />
                    Join Discord Server
                  </Button>
                </Link>
              </div>
            </div>

            {/* Testimonials */}
            <div className="space-y-6">
              <Card className="bg-slate-700 border-slate-600">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-200 mb-4">
                    "The managed account service has been incredible. I've seen consistent 
                    returns while learning the strategies behind the trades."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">JS</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">John Smith</div>
                      <div className="text-sm text-slate-400">Managed Account Client</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-700 border-slate-600">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-200 mb-4">
                    "The EA development course taught me everything I needed to create 
                    my own trading bots. The support is outstanding."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">MJ</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Maria Johnson</div>
                      <div className="text-sm text-slate-400">EA Development Student</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Get Started with Our EA Starter Pack
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Download our free starter pack including 3 proven strategies, 
            risk calculator, and installation guide. Perfect for beginners!
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bot className="h-6 w-6 text-black" />
                </div>
                <div className="font-semibold">3 Expert Advisors</div>
                <div className="text-sm text-blue-100">Conservative, Balanced, Aggressive</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div className="font-semibold">Risk Calculator</div>
                <div className="text-sm text-blue-100">Position sizing tool</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="font-semibold">Installation Guide</div>
                <div className="text-sm text-blue-100">Step-by-step setup</div>
              </div>
            </div>
            
            <Link to="/courses">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4">
                <Download className="mr-2 h-5 w-5" />
                Download Free Starter Pack
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-blue-200">
            Join 2,500+ traders who've downloaded our free resources
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

export default Homepage;

export default Homepage;
