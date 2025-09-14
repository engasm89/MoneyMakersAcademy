import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Bot, 
  TrendingUp, 
  BarChart3, 
  Clock, 
  DollarSign, 
  Target,
  CheckCircle,
  ArrowRight,
  FileText,
  Code,
  Settings,
  Shield,
  Zap,
  Users,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";

const CustomEA = () => {
  const [formData, setFormData] = useState({
    // Basic Information
    name: "",
    email: "",
    phone: "",
    
    // Trading Strategy
    strategy: "",
    instruments: "",
    timeframes: "",
    entryRules: "",
    exitRules: "",
    filters: "",
    
    // Risk Management
    riskLevel: "",
    maxDrawdown: "",
    positionSizing: "",
    stopLoss: "",
    takeProfit: "",
    
    // Technical Requirements
    platform: "",
    broker: "",
    accountType: "",
    leverage: "",
    minDeposit: "",
    
    // Additional Features
    features: [] as string[],
    customRequirements: "",
    
    // Timeline & Budget
    timeline: "",
    budget: "",
    priority: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (feature: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      features: checked 
        ? [...prev.features, feature]
        : prev.features.filter(f => f !== feature)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Custom EA Request:", formData);
    // Here you would typically send the data to your backend
    alert("Custom EA request submitted successfully! We'll contact you within 24 hours.");
  };

  const pricingTiers = [
    {
      name: "Simple EA",
      price: "Starting at $1,500",
      duration: "2-3 weeks",
      features: [
        "Basic strategy implementation",
        "Standard risk management",
        "MT4/MT5 compatibility",
        "Basic documentation",
        "Email support"
      ],
      suitable: "Simple strategies with basic requirements"
    },
    {
      name: "Advanced EA",
      price: "Starting at $3,500",
      duration: "4-6 weeks",
      features: [
        "Complex strategy implementation",
        "Advanced risk management",
        "Multiple timeframe support",
        "Custom indicators integration",
        "Comprehensive documentation",
        "Priority support",
        "1 revision included"
      ],
      suitable: "Complex strategies with advanced features"
    },
    {
      name: "Portfolio EA",
      price: "Starting at $7,500",
      duration: "8-12 weeks",
      features: [
        "Multi-strategy portfolio",
        "Advanced portfolio management",
        "Risk correlation analysis",
        "Custom reporting dashboard",
        "Full documentation & training",
        "Dedicated support",
        "3 revisions included",
        "6 months maintenance"
      ],
      suitable: "Professional traders with multiple strategies"
    }
  ];

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
              <Link to="/trading/expert-advisors" className="text-slate-600 hover:text-blue-600 transition-colors">
                Expert Advisors
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Custom EA Development
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
            Transform your trading strategy into a robust Expert Advisor. 
            We translate your edge into automated trading systems with professional-grade risk management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4">
              <FileText className="mr-2 h-5 w-5" />
              Submit Your Strategy
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
              <Users className="mr-2 h-5 w-5" />
              View Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Our Development Process
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From strategy concept to live trading, we follow a proven process 
              to ensure your EA meets your exact requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">1. Discovery</h3>
              <p className="text-slate-600 text-sm">
                Strategy analysis, requirements gathering, and technical specification
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">2. Development</h3>
              <p className="text-slate-600 text-sm">
                Coding, testing, and implementation of your trading strategy
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">3. Testing</h3>
              <p className="text-slate-600 text-sm">
                Backtesting, forward testing, and optimization of parameters
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">4. Delivery</h3>
              <p className="text-slate-600 text-sm">
                Final delivery, documentation, and ongoing support
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Development Packages
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose the package that best fits your strategy complexity and requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`relative ${index === 1 ? 'border-2 border-blue-500 shadow-xl' : ''}`}>
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl text-slate-800">{tier.name}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{tier.price}</div>
                  <div className="text-slate-600 mb-4">
                    <Clock className="h-4 w-4 inline mr-1" />
                    {tier.duration}
                  </div>
                  <p className="text-sm text-slate-600">{tier.suitable}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${index === 1 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-600 hover:bg-slate-700'}`}
                  >
                    Choose {tier.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">
                Submit Your Strategy
              </h2>
              <p className="text-xl text-slate-600">
                Tell us about your trading strategy and we'll provide a detailed quote 
                and development timeline.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Trading Strategy */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Trading Strategy Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Strategy Description *</label>
                    <Textarea
                      value={formData.strategy}
                      onChange={(e) => handleInputChange('strategy', e.target.value)}
                      placeholder="Describe your trading strategy in detail..."
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Trading Instruments *</label>
                      <Input
                        value={formData.instruments}
                        onChange={(e) => handleInputChange('instruments', e.target.value)}
                        placeholder="EURUSD, GBPUSD, XAUUSD..."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Timeframes *</label>
                      <Input
                        value={formData.timeframes}
                        onChange={(e) => handleInputChange('timeframes', e.target.value)}
                        placeholder="M15, H1, H4, D1..."
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Entry Rules *</label>
                    <Textarea
                      value={formData.entryRules}
                      onChange={(e) => handleInputChange('entryRules', e.target.value)}
                      placeholder="Describe your entry conditions..."
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Exit Rules *</label>
                    <Textarea
                      value={formData.exitRules}
                      onChange={(e) => handleInputChange('exitRules', e.target.value)}
                      placeholder="Describe your exit conditions..."
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Additional Filters</label>
                    <Textarea
                      value={formData.filters}
                      onChange={(e) => handleInputChange('filters', e.target.value)}
                      placeholder="Any additional filters or conditions..."
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Risk Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-red-600" />
                    Risk Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Risk Level *</label>
                      <Select value={formData.riskLevel} onValueChange={(value) => handleInputChange('riskLevel', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select risk level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conservative">Conservative</SelectItem>
                          <SelectItem value="balanced">Balanced</SelectItem>
                          <SelectItem value="aggressive">Aggressive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Max Drawdown (%)</label>
                      <Input
                        value={formData.maxDrawdown}
                        onChange={(e) => handleInputChange('maxDrawdown', e.target.value)}
                        placeholder="10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Position Sizing Method</label>
                      <Select value={formData.positionSizing} onValueChange={(value) => handleInputChange('positionSizing', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">Fixed Lot Size</SelectItem>
                          <SelectItem value="percentage">Percentage of Balance</SelectItem>
                          <SelectItem value="atr">ATR-based</SelectItem>
                          <SelectItem value="kelly">Kelly Criterion</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Stop Loss Method</label>
                      <Select value={formData.stopLoss} onValueChange={(value) => handleInputChange('stopLoss', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">Fixed Pips</SelectItem>
                          <SelectItem value="atr">ATR-based</SelectItem>
                          <SelectItem value="support">Support/Resistance</SelectItem>
                          <SelectItem value="trailing">Trailing Stop</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Technical Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-purple-600" />
                    Technical Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Platform *</label>
                      <Select value={formData.platform} onValueChange={(value) => handleInputChange('platform', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mt4">MT4</SelectItem>
                          <SelectItem value="mt5">MT5</SelectItem>
                          <SelectItem value="both">Both MT4 & MT5</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Broker</label>
                      <Input
                        value={formData.broker}
                        onChange={(e) => handleInputChange('broker', e.target.value)}
                        placeholder="Your broker name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Account Type</label>
                      <Select value={formData.accountType} onValueChange={(value) => handleInputChange('accountType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cent">Cent</SelectItem>
                          <SelectItem value="micro">Micro</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="pro">Pro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Leverage</label>
                      <Input
                        value={formData.leverage}
                        onChange={(e) => handleInputChange('leverage', e.target.value)}
                        placeholder="1:100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Min Deposit ($)</label>
                      <Input
                        value={formData.minDeposit}
                        onChange={(e) => handleInputChange('minDeposit', e.target.value)}
                        placeholder="100"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    Additional Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">Select Additional Features</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Multi-timeframe analysis",
                        "News filter",
                        "Time-based trading",
                        "Correlation analysis",
                        "Custom indicators",
                        "Portfolio management",
                        "Risk monitoring dashboard",
                        "Automated reporting",
                        "Mobile notifications",
                        "VPS optimization"
                      ].map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox
                            id={feature}
                            checked={formData.features.includes(feature)}
                            onCheckedChange={(checked) => handleCheckboxChange(feature, checked as boolean)}
                          />
                          <label htmlFor={feature} className="text-sm text-slate-600">
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Custom Requirements</label>
                    <Textarea
                      value={formData.customRequirements}
                      onChange={(e) => handleInputChange('customRequirements', e.target.value)}
                      placeholder="Any other specific requirements or features..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Timeline & Budget */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    Timeline & Budget
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Timeline</label>
                      <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgent">Urgent (2-3 weeks)</SelectItem>
                          <SelectItem value="normal">Normal (4-6 weeks)</SelectItem>
                          <SelectItem value="flexible">Flexible (8+ weeks)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Budget Range</label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1500-3000">$1,500 - $3,000</SelectItem>
                          <SelectItem value="3000-5000">$3,000 - $5,000</SelectItem>
                          <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                          <SelectItem value="10000+">$10,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                      <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High Priority</SelectItem>
                          <SelectItem value="medium">Medium Priority</SelectItem>
                          <SelectItem value="low">Low Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="text-center">
                <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 px-12 py-4">
                  <FileText className="mr-2 h-5 w-5" />
                  Submit Custom EA Request
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-sm text-slate-500 mt-4">
                  We'll review your request and contact you within 24 hours with a detailed quote.
                </p>
              </div>
            </form>
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

export default CustomEA;
