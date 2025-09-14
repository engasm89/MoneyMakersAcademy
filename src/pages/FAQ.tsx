import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  ChevronUp,
  TrendingUp,
  HelpCircle,
  MessageCircle,
  Mail,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";
import MobileNavigation from "@/components/MobileNavigation";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      category: "General",
      questions: [
        {
          question: "What is Money Makers Academy?",
          answer: "Money Makers Academy is a leading educational platform specializing in algorithmic trading, Expert Advisors (EAs), and automated trading solutions. We provide comprehensive courses, professional-grade trading tools, and managed account services to help traders succeed in the forex market."
        },
        {
          question: "Who can benefit from your services?",
          answer: "Our services are designed for traders of all levels - from beginners who want to learn algorithmic trading to experienced traders looking to automate their strategies. We also serve investors who prefer managed accounts and institutions seeking custom trading solutions."
        },
        {
          question: "Do you offer refunds?",
          answer: "Yes, we offer a 30-day money-back guarantee on all our courses and services. If you're not satisfied with your purchase, contact our support team within 30 days for a full refund."
        }
      ]
    },
    {
      category: "Expert Advisors",
      questions: [
        {
          question: "What is an Expert Advisor (EA)?",
          answer: "An Expert Advisor is an automated trading program that runs on MetaTrader 4 or 5 platforms. It can analyze market conditions, execute trades, and manage positions without human intervention, allowing for 24/7 trading."
        },
        {
          question: "How do I choose the right EA for my trading style?",
          answer: "Consider your risk tolerance, preferred trading timeframe, and market conditions. Our team can help you select an EA that matches your trading goals. We also offer custom EA development for specific requirements."
        },
        {
          question: "Can I test an EA before purchasing?",
          answer: "Yes, we provide demo versions of our EAs for testing. You can run them on demo accounts to evaluate performance before making a purchase decision."
        },
        {
          question: "Do you provide EA installation support?",
          answer: "Absolutely! We provide comprehensive installation guides, video tutorials, and direct support to help you set up your EA correctly on your trading platform."
        }
      ]
    },
    {
      category: "Managed Accounts",
      questions: [
        {
          question: "What is a managed account?",
          answer: "A managed account is a trading account where professional traders manage your funds using proven strategies. You retain ownership of your capital while benefiting from professional trading expertise."
        },
        {
          question: "What is the minimum investment for managed accounts?",
          answer: "Our minimum investment starts at $5,000 for managed accounts. Higher investment amounts may qualify for better terms and lower management fees."
        },
        {
          question: "How are profits shared?",
          answer: "Profit sharing varies by account size and strategy. Typically, we use a performance-based fee structure where we earn a percentage of profits generated, ensuring our success is aligned with yours."
        },
        {
          question: "Can I withdraw my funds anytime?",
          answer: "Yes, you can request withdrawals at any time. However, we recommend maintaining your investment for at least 3 months to allow strategies to perform optimally."
        }
      ]
    },
    {
      category: "Courses & Education",
      questions: [
        {
          question: "What courses do you offer?",
          answer: "We offer comprehensive courses covering algorithmic trading basics, EA development, risk management, backtesting, and advanced trading strategies. Our curriculum is designed for all skill levels."
        },
        {
          question: "Are the courses self-paced or live?",
          answer: "We offer both options. Most courses are self-paced with lifetime access, but we also provide live workshops, webinars, and one-on-one mentoring sessions."
        },
        {
          question: "Do I need programming experience for EA development courses?",
          answer: "While programming experience is helpful, our beginner courses start from the basics. We teach MQL4/MQL5 programming from scratch, making it accessible to traders without coding background."
        },
        {
          question: "Is there ongoing support after course completion?",
          answer: "Yes, all students get access to our community forum, monthly Q&A sessions, and can reach out to instructors for clarification on course materials."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "What trading platforms do you support?",
          answer: "We primarily work with MetaTrader 4 and MetaTrader 5 platforms. Our EAs are compatible with most major brokers that support these platforms."
        },
        {
          question: "Do you provide VPS hosting for EAs?",
          answer: "Yes, we offer VPS hosting services optimized for trading. Our VPS ensures 99.9% uptime and low latency connections to trading servers."
        },
        {
          question: "What if my EA stops working?",
          answer: "We provide lifetime updates and support for all our EAs. If you encounter any issues, our technical support team will help resolve them promptly."
        },
        {
          question: "Can you help optimize my existing trading strategy?",
          answer: "Yes, we offer strategy optimization services. Our team can analyze your current approach and suggest improvements or help automate it with an EA."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-slate-800">Money Makers Academy</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
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
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl mb-8">
            Find answers to common questions about our trading solutions, courses, and services
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqData.map((category, categoryIndex) => (
            <div key={category.category} className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 100 + itemIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <Card key={globalIndex} className="hover:shadow-md transition-shadow">
                      <CardHeader 
                        className="cursor-pointer"
                        onClick={() => toggleItem(globalIndex)}
                      >
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg text-slate-800">
                            {item.question}
                          </CardTitle>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-slate-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-slate-500" />
                          )}
                        </div>
                      </CardHeader>
                      {isOpen && (
                        <CardContent>
                          <p className="text-slate-600 leading-relaxed">
                            {item.answer}
                          </p>
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Our support team is here to help you succeed
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">Live Chat</h3>
              <p className="text-slate-600 mb-4">Get instant answers from our support team</p>
              <Button className="w-full">Start Chat</Button>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">Email Support</h3>
              <p className="text-slate-600 mb-4">Send us your questions anytime</p>
              <Link to="/contact">
                <Button variant="outline" className="w-full">Send Email</Button>
              </Link>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">Phone Support</h3>
              <p className="text-slate-600 mb-4">Speak directly with our experts</p>
              <Button variant="outline" className="w-full">Call Now</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">Money Makers Academy</span>
              </div>
              <p className="text-slate-300 mb-4">
                Empowering traders worldwide with algorithmic trading education and expert solutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Trading Solutions</h3>
              <ul className="space-y-2 text-slate-300">
                <li><Link to="/trading/expert-advisors" className="hover:text-white">Expert Advisors</Link></li>
                <li><Link to="/trading/custom-ea" className="hover:text-white">Custom EA Development</Link></li>
                <li><Link to="/trading/managed-accounts" className="hover:text-white">Managed Accounts</Link></li>
                <li><Link to="/trading-dashboard" className="hover:text-white">Trading Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Education</h3>
              <ul className="space-y-2 text-slate-300">
                <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link to="/community" className="hover:text-white">Community</Link></li>
                <li><Link to="/success" className="hover:text-white">Success Stories</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-300">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Money Makers Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FAQ;
