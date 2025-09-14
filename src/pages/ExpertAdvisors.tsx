import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bot, 
  TrendingUp, 
  Shield, 
  Download, 
  Eye, 
  ShoppingCart,
  Filter,
  Search,
  Star,
  BarChart3,
  Clock,
  DollarSign,
  Target,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock EA data
const mockEAs = [
  {
    id: 1,
    name: "Conservative Trend EA",
    description: "Low-risk trend following strategy with strict risk management",
    platform: "MT4/MT5",
    version: "2.1.3",
    category: "Trend Following",
    riskLevel: "Conservative",
    minDeposit: 100,
    leverage: "1:100",
    timeframe: "H1",
    instruments: ["EURUSD", "GBPUSD", "USDJPY"],
    performance: {
      mtd: 3.2,
      ytd: 18.5,
      maxDD: 8.2,
      winRate: 68,
      sharpe: 1.45
    },
    price: 299,
    lastUpdate: "2024-01-15",
    backtestPeriod: "2020-2024",
    forwardTest: true,
    rating: 4.8,
    reviews: 127
  },
  {
    id: 2,
    name: "Balanced Mean Reversion EA",
    description: "Medium-risk mean reversion strategy with dynamic position sizing",
    platform: "MT4/MT5",
    version: "1.8.2",
    category: "Mean Reversion",
    riskLevel: "Balanced",
    minDeposit: 500,
    leverage: "1:200",
    timeframe: "M15",
    instruments: ["XAUUSD", "EURUSD", "GBPUSD"],
    performance: {
      mtd: 5.8,
      ytd: 24.3,
      maxDD: 12.5,
      winRate: 72,
      sharpe: 1.78
    },
    price: 499,
    lastUpdate: "2024-01-12",
    backtestPeriod: "2019-2024",
    forwardTest: true,
    rating: 4.6,
    reviews: 89
  },
  {
    id: 3,
    name: "Aggressive Grid Hybrid EA",
    description: "High-risk grid trading with trend confirmation filters",
    platform: "MT4/MT5",
    version: "3.0.1",
    category: "Grid Trading",
    riskLevel: "Aggressive",
    minDeposit: 1000,
    leverage: "1:500",
    timeframe: "M5",
    instruments: ["EURUSD", "GBPUSD", "USDJPY", "AUDUSD"],
    performance: {
      mtd: 8.2,
      ytd: 35.7,
      maxDD: 18.3,
      winRate: 58,
      sharpe: 2.12
    },
    price: 799,
    lastUpdate: "2024-01-10",
    backtestPeriod: "2018-2024",
    forwardTest: true,
    rating: 4.4,
    reviews: 156
  }
];

const ExpertAdvisors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedRisk, setSelectedRisk] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredEAs = mockEAs.filter(ea => {
    const matchesSearch = ea.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ea.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = selectedPlatform === "all" || ea.platform.includes(selectedPlatform);
    const matchesRisk = selectedRisk === "all" || ea.riskLevel.toLowerCase() === selectedRisk.toLowerCase();
    const matchesCategory = selectedCategory === "all" || ea.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesPlatform && matchesRisk && matchesCategory;
  });

  const getRiskBadgeColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'conservative': return 'bg-green-100 text-green-800 border-green-300';
      case 'balanced': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'aggressive': return 'bg-red-100 text-red-800 border-red-300';
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
              <Link to="/courses" className="text-slate-600 hover:text-blue-600 transition-colors">
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
            Expert Advisors Store
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
            Battle-tested MT4/MT5 trading bots with proven backtests, 
            live performance, and comprehensive risk controls.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4">
              <Download className="mr-2 h-5 w-5" />
              Download Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
              <Eye className="mr-2 h-5 w-5" />
              View Live Results
            </Button>
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
                  placeholder="Search EAs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="MT4">MT4</SelectItem>
                  <SelectItem value="MT5">MT5</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedRisk} onValueChange={setSelectedRisk}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Strategy Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Strategies</SelectItem>
                  <SelectItem value="trend following">Trend Following</SelectItem>
                  <SelectItem value="mean reversion">Mean Reversion</SelectItem>
                  <SelectItem value="grid trading">Grid Trading</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* EA Cards Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Available Expert Advisors
            </h2>
            <p className="text-lg text-slate-600">
              {filteredEAs.length} EA{filteredEAs.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredEAs.map((ea) => (
              <Card key={ea.id} className="hover:shadow-xl transition-shadow border-2">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Bot className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-slate-800">{ea.name}</CardTitle>
                        <p className="text-sm text-slate-600">{ea.category}</p>
                      </div>
                    </div>
                    <Badge className={getRiskBadgeColor(ea.riskLevel)}>
                      {ea.riskLevel}
                    </Badge>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-4">{ea.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{ea.rating}</span>
                      <span>({ea.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>v{ea.version}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{ea.platform}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">+{ea.performance.ytd}%</div>
                      <div className="text-xs text-slate-600">YTD Return</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{ea.performance.maxDD}%</div>
                      <div className="text-xs text-slate-600">Max Drawdown</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">{ea.performance.winRate}%</div>
                      <div className="text-xs text-slate-600">Win Rate</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <div className="text-lg font-bold text-yellow-600">{ea.performance.sharpe}</div>
                      <div className="text-xs text-slate-600">Sharpe Ratio</div>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Min Deposit:</span>
                      <span className="font-semibold">${ea.minDeposit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Leverage:</span>
                      <span className="font-semibold">{ea.leverage}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Timeframe:</span>
                      <span className="font-semibold">{ea.timeframe}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Instruments:</span>
                      <span className="font-semibold">{ea.instruments.join(", ")}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-slate-800">${ea.price}</div>
                      <div className="text-sm text-slate-500">One-time purchase</div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Buy Now
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Eye className="mr-2 h-4 w-4" />
                        Details
                      </Button>
                    </div>
                    
                    <Button variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-50">
                      <Download className="mr-2 h-4 w-4" />
                      Try Demo Version
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Why Choose Our Expert Advisors?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our EAs are built with professional-grade risk management, 
              comprehensive testing, and ongoing support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Proven Performance</h3>
              <p className="text-slate-600 mb-4">
                Extensive backtesting over multiple market conditions with 
                verified forward testing results.
              </p>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Multi-year backtests
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Live performance tracking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Risk-adjusted returns
                </li>
              </ul>
            </Card>

            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Risk Management</h3>
              <p className="text-slate-600 mb-4">
                Built-in risk controls including stop loss, position sizing, 
                and maximum drawdown protection.
              </p>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Dynamic position sizing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Drawdown limits
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Time-based filters
                </li>
              </ul>
            </Card>

            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Download className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Easy Setup</h3>
              <p className="text-slate-600 mb-4">
                Simple installation with detailed documentation, 
                default settings, and ongoing updates.
              </p>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  One-click installation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Default settings
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Regular updates
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Need a Custom Expert Advisor?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Can't find the perfect EA for your strategy? We develop custom 
            Expert Advisors tailored to your specific trading requirements.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4">
              Request Custom EA
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
              View Custom EA Examples
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

export default ExpertAdvisors;
