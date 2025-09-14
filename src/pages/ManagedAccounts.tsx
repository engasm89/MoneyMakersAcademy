import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Shield, 
  TrendingUp, 
  BarChart3, 
  Clock, 
  DollarSign, 
  Target,
  CheckCircle,
  ArrowRight,
  Users,
  Award,
  Eye,
  Download,
  AlertTriangle,
  FileText,
  Settings,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const ManagedAccounts = () => {
  const [selectedTier, setSelectedTier] = useState("");

  const riskTiers = [
    {
      name: "Conservative",
      color: "green",
      targetReturn: "2-5%",
      maxDrawdown: "8-12%",
      riskLevel: "Low",
      description: "Capital preservation with steady growth",
      features: [
        "Conservative position sizing",
        "Multiple currency pairs",
        "Daily risk monitoring",
        "Monthly performance reports",
        "Email support",
        "Minimum $10,000 deposit"
      ],
      performance: {
        ytd: 4.2,
        maxDD: 9.1,
        sharpe: 1.35,
        winRate: 71
      },
      fee: "25% of profits",
      minDeposit: 10000
    },
    {
      name: "Balanced",
      color: "blue",
      targetReturn: "5-10%",
      maxDrawdown: "15-20%",
      riskLevel: "Medium",
      description: "Balanced risk-reward with consistent returns",
      features: [
        "Dynamic position sizing",
        "Advanced risk management",
        "Real-time monitoring",
        "Weekly performance updates",
        "Priority support",
        "Minimum $25,000 deposit",
        "Custom risk parameters"
      ],
      performance: {
        ytd: 7.8,
        maxDD: 16.3,
        sharpe: 1.68,
        winRate: 69
      },
      fee: "30% of profits",
      minDeposit: 25000
    },
    {
      name: "Aggressive",
      color: "red",
      targetReturn: "10-20%",
      maxDrawdown: "25-35%",
      riskLevel: "High",
      description: "High-growth potential for experienced investors",
      features: [
        "Aggressive position sizing",
        "High-frequency strategies",
        "24/7 monitoring",
        "Daily performance updates",
        "Dedicated account manager",
        "Minimum $50,000 deposit",
        "Custom strategy development"
      ],
      performance: {
        ytd: 15.2,
        maxDD: 28.7,
        sharpe: 2.15,
        winRate: 62
      },
      fee: "35% of profits",
      minDeposit: 50000
    }
  ];

  const getTierColor = (color: string) => {
    switch (color) {
      case 'green': return 'border-green-200 bg-green-50';
      case 'blue': return 'border-blue-200 bg-blue-50';
      case 'red': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getTierBadgeColor = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-100 text-green-800 border-green-300';
      case 'blue': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'red': return 'bg-red-100 text-red-800 border-red-300';
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
            Managed Trading Accounts
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
            Hands-off trading with professional risk management. Choose your risk tier, 
            connect your account, and let our systems trade transparently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4">
              <Users className="mr-2 h-5 w-5" />
              Start Application
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
              <Eye className="mr-2 h-5 w-5" />
              View Live Performance
            </Button>
          </div>
        </div>
      </section>

      {/* Risk Tiers */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Choose Your Risk Tier
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Select the risk level that matches your investment goals and risk tolerance. 
              All tiers include transparent reporting and professional risk management.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {riskTiers.map((tier, index) => (
              <Card key={index} className={`relative ${getTierColor(tier.color)} hover:shadow-xl transition-shadow ${index === 1 ? 'ring-2 ring-blue-300' : ''}`}>
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    tier.color === 'green' ? 'bg-green-100' : 
                    tier.color === 'blue' ? 'bg-blue-100' : 'bg-red-100'
                  }`}>
                    <Shield className={`h-8 w-8 ${
                      tier.color === 'green' ? 'text-green-600' : 
                      tier.color === 'blue' ? 'text-blue-600' : 'text-red-600'
                    }`} />
                  </div>
                  <CardTitle className="text-2xl text-slate-800">{tier.name}</CardTitle>
                  <Badge className={getTierBadgeColor(tier.color)}>
                    {tier.riskLevel} Risk
                  </Badge>
                  <p className="text-slate-600 mt-2">{tier.description}</p>
                </CardHeader>
                
                <CardContent>
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-lg font-bold text-green-600">+{tier.performance.ytd}%</div>
                      <div className="text-xs text-slate-600">YTD Return</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-lg font-bold text-red-600">{tier.performance.maxDD}%</div>
                      <div className="text-xs text-slate-600">Max Drawdown</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-lg font-bold text-purple-600">{tier.performance.sharpe}</div>
                      <div className="text-xs text-slate-600">Sharpe Ratio</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{tier.performance.winRate}%</div>
                      <div className="text-xs text-slate-600">Win Rate</div>
                    </div>
                  </div>

                  {/* Target Returns */}
                  <div className="text-center mb-6">
                    <div className="text-2xl font-bold text-slate-800 mb-1">
                      {tier.targetReturn}% monthly
                    </div>
                    <div className="text-sm text-slate-600">
                      Target return • {tier.maxDrawdown}% max drawdown
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Fee & Deposit */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Performance Fee:</span>
                      <span className="font-semibold">{tier.fee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Min Deposit:</span>
                      <span className="font-semibold">${tier.minDeposit.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button 
                    className={`w-full ${
                      tier.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                      tier.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                      'bg-red-600 hover:bg-red-700'
                    }`}
                    onClick={() => setSelectedTier(tier.name)}
                  >
                    Choose {tier.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              How Managed Accounts Work
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Simple onboarding process with transparent reporting and professional risk management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">1. Application</h3>
              <p className="text-slate-600 text-sm">
                Complete KYC, risk assessment, and choose your preferred risk tier
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">2. Setup</h3>
              <p className="text-slate-600 text-sm">
                Connect your broker account and configure risk parameters
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">3. Trading</h3>
              <p className="text-slate-600 text-sm">
                Our systems trade automatically with real-time monitoring
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">4. Reporting</h3>
              <p className="text-slate-600 text-sm">
                Transparent reporting with detailed performance analytics
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">
                Start Your Application
              </h2>
              <p className="text-xl text-slate-600">
                Complete the form below to begin your managed account application. 
                We'll review your application and contact you within 24 hours.
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <form className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                        <Input placeholder="Your full name" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                        <Input type="email" placeholder="your@email.com" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                        <Input placeholder="+1 (555) 123-4567" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Country *</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Risk Tier Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Risk Tier Selection</h3>
                    <div className="space-y-3">
                      {riskTiers.map((tier, index) => (
                        <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-slate-50">
                          <input
                            type="radio"
                            id={`tier-${index}`}
                            name="riskTier"
                            value={tier.name}
                            className="h-4 w-4 text-blue-600"
                          />
                          <label htmlFor={`tier-${index}`} className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-semibold text-slate-800">{tier.name}</div>
                                <div className="text-sm text-slate-600">
                                  {tier.targetReturn}% monthly • {tier.maxDrawdown}% max drawdown
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-slate-800">${tier.minDeposit.toLocaleString()}</div>
                                <div className="text-sm text-slate-600">min deposit</div>
                              </div>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Investment Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Investment Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Investment Amount *</label>
                        <Input placeholder="50000" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Broker</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select broker" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ic-markets">IC Markets</SelectItem>
                            <SelectItem value="fxpro">FxPro</SelectItem>
                            <SelectItem value="xm">XM</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Risk Assessment */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Risk Assessment</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          What is your investment experience? *
                        </label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                            <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                            <SelectItem value="advanced">Advanced (3-5 years)</SelectItem>
                            <SelectItem value="expert">Expert (5+ years)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          What is your risk tolerance? *
                        </label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select risk tolerance" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="conservative">Conservative - Capital preservation</SelectItem>
                            <SelectItem value="moderate">Moderate - Balanced growth</SelectItem>
                            <SelectItem value="aggressive">Aggressive - High growth potential</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div>
                    <div className="flex items-start space-x-3">
                      <Checkbox id="terms" required />
                      <label htmlFor="terms" className="text-sm text-slate-600">
                        I agree to the <Link to="/legal/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and 
                        <Link to="/legal/risk-disclosure" className="text-blue-600 hover:underline"> Risk Disclosure</Link>. 
                        I understand that trading involves risk and I may lose some or all of my capital.
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 px-12 py-4">
                      <Users className="mr-2 h-5 w-5" />
                      Submit Application
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <p className="text-sm text-slate-500 mt-4">
                      We'll review your application and contact you within 24 hours.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Risk Warning */}
      <section className="py-12 bg-red-50 border-t border-red-200">
        <div className="container mx-auto px-6">
          <Card className="border-red-300 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Important Risk Warning</h3>
                  <p className="text-red-700 mb-4">
                    Trading foreign exchange and CFD instruments involves high risk and may not be suitable for all investors. 
                    You could lose some or all of your capital. Past performance is not indicative of future results. 
                    Please ensure you understand the risks involved and seek independent advice if necessary.
                  </p>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Managed accounts are subject to market risks</li>
                    <li>• No guarantee of profits or protection against losses</li>
                    <li>• Performance fees are charged on profits only</li>
                    <li>• Minimum investment periods may apply</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
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

export default ManagedAccounts;
