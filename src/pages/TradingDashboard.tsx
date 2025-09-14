import ForexDashboard from "@/components/ForexDashboard";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const TradingDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Homepage
              </Link>
              <div className="h-6 w-px bg-slate-300"></div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                <span className="text-lg font-semibold text-slate-800">Trading Dashboard</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/trading" 
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                Trading Solutions
              </Link>
              <Link 
                to="/courses" 
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                Courses
              </Link>
              <Link 
                to="/community" 
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                Community
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <ForexDashboard />
    </div>
  );
};

export default TradingDashboard;
