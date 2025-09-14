import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Shield, 
  BarChart3, 
  ArrowRight, 
  CheckCircle, 
  Users,
  TrendingUp,
  Clock,
  DollarSign,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";

const TradingSolutions = () => {
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
            Trading Solutions Hub
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
            Choose your trading journey: DIY Expert Advisors, Custom Development, 
            or Fully Managed Accounts. We have solutions for every trader.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4">
              Request a Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
              Browse EAs
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
              Start with Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Who Are These Solutions For?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Whether you're a beginner learning the ropes or an experienced trader 
              looking to scale, we have the right solution for your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Novice Traders */}
            <Card className="border-2 border-green-200 hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-800">Novice Traders</CardTitle>
                <p className="text-slate-600">Learning the fundamentals</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Ready-to-use Expert Advisors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Educational courses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Community support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Demo account testing</span>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Semi-Pro Traders */}
            <Card className="border-2 border-blue-200 hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-blue-800">Semi-Pro Traders</CardTitle>
                <p className="text-slate-600">Looking to optimize strategies</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Custom EA development</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Strategy optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Advanced courses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">1:1 coaching</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Custom Solutions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Capital-Rich Traders */}
            <Card className="border-2 border-purple-200 hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl text-purple-800">Capital-Rich Traders</CardTitle>
                <p className="text-slate-600">Time-poor, capital-rich</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Fully managed accounts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Transparent reporting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Risk-tiered options</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Performance tracking</span>
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Managed Accounts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions Comparison */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Compare Our Solutions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose the trading solution that best fits your experience level, 
              time availability, and capital requirements.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-slate-800">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold text-green-800">Expert Advisors</th>
                  <th className="px-6 py-4 text-center font-semibold text-blue-800">Custom EA Development</th>
                  <th className="px-6 py-4 text-center font-semibold text-purple-800">Managed Accounts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-800">Time Investment</td>
                  <td className="px-6 py-4 text-center">
                    <Badge className="bg-green-100 text-green-800">Low</Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge className="bg-blue-100 text-blue-800">Medium</Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge className="bg-purple-100 text-purple-800">Minimal</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-800">Capital Required</td>
                  <td className="px-6 py-4 text-center">$100+</td>
                  <td className="px-6 py-4 text-center">$1,000+</td>
                  <td className="px-6 py-4 text-center">$10,000+</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-800">Control Level</td>
                  <td className="px-6 py-4 text-center">
                    <Badge className="bg-green-100 text-green-800">Full</Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge className="bg-blue-100 text-blue-800">Full</Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge className="bg-purple-100 text-purple-800">Limited</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-800">Learning Curve</td>
                  <td className="px-6 py-4 text-center">
                    <Badge className="bg-green-100 text-green-800">Low</Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge className="bg-blue-100 text-blue-800">High</Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge className="bg-purple-100 text-purple-800">None</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-800">Setup Time</td>
                  <td className="px-6 py-4 text-center">
                    <Clock className="h-4 w-4 mx-auto text-green-600" />
                    <span className="text-sm">Minutes</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Clock className="h-4 w-4 mx-auto text-blue-600" />
                    <span className="text-sm">Weeks</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Clock className="h-4 w-4 mx-auto text-purple-600" />
                    <span className="text-sm">Days</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-800">Support Level</td>
                  <td className="px-6 py-4 text-center">
                    <Badge className="bg-green-100 text-green-800">Community</Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge className="bg-blue-100 text-blue-800">1:1</Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge className="bg-purple-100 text-purple-800">Dedicated</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
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
            Book a free strategy call to discuss your goals and find the perfect 
            trading solution for your needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4">
              Book Strategy Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
              View Trading Dashboard
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

export default TradingSolutions;
