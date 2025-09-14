import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Menu, 
  X, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Bot, 
  BarChart3,
  Shield,
  MessageCircle,
  Home,
  Bell
} from "lucide-react";

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Trading Dashboard", href: "/trading-dashboard", icon: TrendingUp },
    { name: "Trading Solutions", href: "/trading", icon: Bot },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Market Alerts", href: "/market-alerts", icon: Bell },
    { name: "Community", href: "/community", icon: Users },
    { name: "About", href: "/about", icon: MessageCircle },
    { name: "Contact", href: "/contact", icon: MessageCircle },
    { name: "Pricing", href: "/pricing", icon: BarChart3 },
  ];

  const tradingSubItems = [
    { name: "Expert Advisors", href: "/trading/expert-advisors", icon: Bot },
    { name: "Custom EA Development", href: "/trading/custom-ea", icon: BarChart3 },
    { name: "Managed Accounts", href: "/trading/managed-accounts", icon: Shield },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-slate-800">Money Makers Academy</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-6">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isItemActive = isActive(item.href);
                
                return (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isItemActive
                          ? "bg-blue-100 text-blue-700"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                    
                    {/* Trading Solutions Submenu */}
                    {item.name === "Trading Solutions" && (
                      <div className="ml-8 mt-2 space-y-1">
                        {tradingSubItems.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubItemActive = isActive(subItem.href);
                          
                          return (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              onClick={() => setIsOpen(false)}
                              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                                isSubItemActive
                                  ? "bg-blue-50 text-blue-600"
                                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                              }`}
                            >
                              <SubIcon className="h-4 w-4" />
                              <span>{subItem.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t">
            <div className="space-y-3">
              <Link to="/courses">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Start Free Course
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="w-full">
                  Book Strategy Call
                </Button>
              </Link>
            </div>
            
            <div className="mt-4 text-xs text-slate-500 text-center">
              <p>© 2024 Money Makers Academy</p>
              <p className="mt-1">Empowering traders worldwide</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
