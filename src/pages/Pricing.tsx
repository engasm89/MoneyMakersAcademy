import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  TrendingUp, 
  CheckCircle,
  Star,
  Users,
  BookOpen,
  Bot,
  BarChart3,
  Shield,
  Zap,
  Award,
  ArrowRight,
  DollarSign,
  Clock,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const coursePricing = [
    {
      name: "Forex Trading Fundamentals",
      description: "Master the basics of forex trading from currency pairs to market analysis",
      monthlyPrice: 97,
      annualPrice: 797,
      originalPrice: 297,
      level: "Beginner",
      duration: "6 weeks",
      lessons: 24,
      features: [
        "Live trading sessions",
        "Downloadable resources",
        "Certificate of completion",
        "Lifetime access",
        "Mobile app access",
        "Email support"
      ],
      isPopular: false
    },
    {
      name: "Advanced Technical Analysis",
      description: "Deep dive into advanced chart patterns, indicators, and market structure",
      monthlyPrice: 147,
      annualPrice: 1197,
      originalPrice: 497,
      level: "Intermediate",
      duration: "8 weeks",
      lessons: 32,
      features: [
        "Advanced charting techniques",
        "Custom indicator development",
        "Market structure analysis",
        "Live Q&A sessions",
        "Trading journal templates",
        "Priority support"
      ],
      isPopular: true
    },
    {
      name: "Expert Advisor Development",
      description: "Learn to build and program automated trading systems for MT4/MT5",
      monthlyPrice: 297,
      annualPrice: 2397,
      originalPrice: 997,
      level: "Advanced",
      duration: "12 weeks",
      lessons: 48,
      features: [
        "MQL4/MQL5 programming",
        "Strategy development",
        "Backtesting and optimization",
        "Risk management coding",
        "Live deployment support",
        "Dedicated mentor"
      ],
      isPopular: false
    }
  ];

  const eaPricing = [
    {
      name: "Conservative Trend EA",
      description: "Low-risk trend following strategy with strict risk management",
      price: 299,
      originalPrice: 499,
      category: "Trend Following",
      riskLevel: "Conservative",
      features: [
        "Proven backtesting results",
        "Real-time performance tracking",
        "Risk management controls",
        "Easy installation",
        "Documentation & support",
        "Free updates for 1 year"
      ],
      isPopular: false
    },
    {
      name: "Balanced Mean Reversion EA",
      description: "Medium-risk mean reversion strategy with dynamic position sizing",
      price: 499,
      originalPrice: 799,
      category: "Mean Reversion",
      riskLevel: "Balanced",
      features: [
        "Multi-timeframe analysis",
        "Dynamic position sizing",
        "Advanced risk controls",
        "Performance dashboard",
        "Priority support",
        "Free updates for 2 years"
      ],
      isPopular: true
    },
    {
      name: "Aggressive Grid Hybrid EA",
      description: "High-risk grid trading with trend confirmation filters",
      price: 799,
      originalPrice: 1299,
      category: "Grid Trading",
      riskLevel: "Aggressive",
      features: [
        "High-frequency strategies",
        "Advanced grid management",
        "Trend confirmation filters",
        "Custom risk parameters",
        "Dedicated support",
        "Lifetime updates"
      ],
      isPopular: false
    }
  ];

  const managedAccountPricing = [
    {
      name: "Conservative",
      description: "Capital preservation with steady growth",
      minDeposit: 10000,
      performanceFee: "25%",
      managementFee: "0%",
      targetReturn: "2-5% monthly",
      maxDrawdown: "8-12%",
      features: [
        "Conservative position sizing",
        "Multiple currency pairs",
        "Daily risk monitoring",
        "Monthly performance reports",
        "Email support",
        "Transparent reporting"
      ],
      isPopular: false
    },
    {
      name: "Balanced",
      description: "Balanced risk-reward with consistent returns",
      minDeposit: 25000,
      performanceFee: "30%",
      managementFee: "0%",
      targetReturn: "5-10% monthly",
      maxDrawdown: "15-20%",
      features: [
        "Dynamic position sizing",
        "Advanced risk management",
        "Real-time monitoring",
        "Weekly performance updates",
        "Priority support",
        "Custom risk parameters"
      ],
      isPopular: true
    },
    {
      name: "Aggressive",
      description: "High-growth potential for experienced investors",
      minDeposit: 50000,
      performanceFee: "35%",
      managementFee: "0%",
      targetReturn: "10-20% monthly",
      maxDrawdown: "25-35%",
      features: [
        "Aggressive position sizing",
        "High-frequency strategies",
        "24/7 monitoring",
        "Daily performance updates",
        "Dedicated account manager",
        "Custom strategy development"
      ],
      isPopular: false
    }
  ];

  const getPrice = (monthlyPrice: number, annualPrice: number) => {
    return isAnnual ? annualPrice : monthlyPrice;
  };

  const getSavings = (monthlyPrice: number, annualPrice: number) => {
    const monthlyTotal = monthlyPrice * 12;
    const savings = monthlyTotal - annualPrice;
    return Math.round(savings);
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
              <Link to="/pricing" className="text-blue-600 font-semibold">
                Pricing
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
            Choose the plan that fits your trading goals. No hidden fees, no surprises. 
            All plans include our comprehensive support and community access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4">
              <DollarSign className="mr-2 h-5 w-5" />
              View All Plans
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
              <Users className="mr-2 h-5 w-5" />
              Join Community
            </Button>
          </div>
        </div>
      </section>

      {/* Course Pricing */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Course Pricing
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Comprehensive trading education with flexible payment options.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-lg ${!isAnnual ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>
                Monthly
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-blue-600"
              />
              <span className={`text-lg ${isAnnual ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>
                Annual
              </span>
              {isAnnual && (
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  Save up to 40%
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {coursePricing.map((course, index) => (
              <Card key={index} className={`relative hover:shadow-xl transition-shadow ${course.isPopular ? 'border-2 border-blue-500 shadow-lg' : ''}`}>
                {course.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl text-slate-800 mb-2">{course.name}</CardTitle>
                  <p className="text-slate-600 mb-4">{course.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      ${getPrice(course.monthlyPrice, course.annualPrice)}
                      {isAnnual ? '/year' : '/month'}
                    </div>
                    <div className="text-sm text-slate-500 line-through">
                      ${course.originalPrice}
                    </div>
                    {isAnnual && (
                      <div className="text-sm text-green-600 font-semibold">
                        Save ${getSavings(course.monthlyPrice, course.annualPrice)}/year
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>

                  <Badge variant="outline" className="w-fit mx-auto">
                    {course.level}
                  </Badge>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {course.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${course.isPopular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-600 hover:bg-slate-700'}`}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* EA Pricing */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Expert Advisor Pricing
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Professional trading automation with one-time purchase and lifetime updates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {eaPricing.map((ea, index) => (
              <Card key={index} className={`relative hover:shadow-xl transition-shadow ${ea.isPopular ? 'border-2 border-blue-500 shadow-lg' : ''}`}>
                {ea.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl text-slate-800 mb-2">{ea.name}</CardTitle>
                  <p className="text-slate-600 mb-4">{ea.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      ${ea.price}
                    </div>
                    <div className="text-sm text-slate-500 line-through">
                      ${ea.originalPrice}
                    </div>
                    <div className="text-sm text-slate-500">
                      One-time purchase
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 text-sm text-slate-500 mb-4">
                    <Badge variant="outline">{ea.category}</Badge>
                    <Badge variant="outline">{ea.riskLevel}</Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {ea.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="space-y-3">
                    <Button 
                      className={`w-full ${ea.isPopular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-600 hover:bg-slate-700'}`}
                    >
                      <Bot className="mr-2 h-4 w-4" />
                      Buy Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Star className="mr-2 h-4 w-4" />
                      Try Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Managed Account Pricing */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Managed Account Pricing
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Professional account management with performance-based fees only.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {managedAccountPricing.map((tier, index) => (
              <Card key={index} className={`relative hover:shadow-xl transition-shadow ${tier.isPopular ? 'border-2 border-blue-500 shadow-lg' : ''}`}>
                {tier.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl text-slate-800 mb-2">{tier.name}</CardTitle>
                  <p className="text-slate-600 mb-4">{tier.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      ${tier.minDeposit.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-500">
                      Minimum deposit
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="font-bold text-green-600">{tier.targetReturn}</div>
                      <div className="text-xs text-slate-600">Target Return</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="font-bold text-red-600">{tier.maxDrawdown}</div>
                      <div className="text-xs text-slate-600">Max Drawdown</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-800 mb-3">Fee Structure:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Performance Fee:</span>
                        <span className="font-semibold">{tier.performanceFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Management Fee:</span>
                        <span className="font-semibold">{tier.managementFee}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${tier.isPopular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-600 hover:bg-slate-700'}`}
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Start Application
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Pricing FAQ
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Common questions about our pricing and payment options.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-3">Do you offer refunds?</h3>
                <p className="text-slate-600">
                  Yes! We offer a 30-day money-back guarantee on all courses and EAs. 
                  If you're not satisfied, we'll refund your purchase.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-3">Can I change plans later?</h3>
                <p className="text-slate-600">
                  Absolutely! You can upgrade or downgrade your plan at any time. 
                  Changes take effect on your next billing cycle.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-3">Are there any hidden fees?</h3>
                <p className="text-slate-600">
                  No hidden fees! All prices are clearly displayed and include 
                  everything listed in the features. No surprise charges.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-3">Do you offer discounts?</h3>
                <p className="text-slate-600">
                  Yes! We offer discounts for students, military personnel, and bulk purchases. 
                  Contact us for more information.
                </p>
              </Card>
            </div>
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
            Choose the plan that fits your goals and start learning today. 
            Join thousands of successful traders who have transformed their financial future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4">
              <BookOpen className="mr-2 h-5 w-5" />
              Start Learning Today
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

export default Pricing;
