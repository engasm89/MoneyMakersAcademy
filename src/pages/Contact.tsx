import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  Users,
  BookOpen,
  Bot,
  BarChart3,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
    preferredContact: "",
    urgency: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Message sent successfully! We'll get back to you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      category: "",
      message: "",
      preferredContact: "",
      urgency: ""
    });
  };

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: "Email Support",
      description: "Get help via email",
      contact: "support@moneymakersacademy.com",
      responseTime: "Within 24 hours"
    },
    {
      icon: <Phone className="h-6 w-6 text-green-600" />,
      title: "Phone Support",
      description: "Speak with our team",
      contact: "+1 (555) 123-4567",
      responseTime: "Mon-Fri 9AM-6PM EST"
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-purple-600" />,
      title: "Live Chat",
      description: "Chat with us instantly",
      contact: "Available on website",
      responseTime: "Mon-Fri 9AM-6PM EST"
    },
    {
      icon: <Users className="h-6 w-6 text-yellow-600" />,
      title: "Community",
      description: "Get help from community",
      contact: "Join our Discord",
      responseTime: "24/7 community support"
    }
  ];

  const offices = [
    {
      city: "New York",
      address: "123 Wall Street, Suite 100",
      cityState: "New York, NY 10005",
      phone: "+1 (555) 123-4567",
      email: "ny@moneymakersacademy.com",
      hours: "Mon-Fri 9AM-6PM EST"
    },
    {
      city: "London",
      address: "45 Canary Wharf, Level 20",
      cityState: "London E14 5AB, UK",
      phone: "+44 20 7123 4567",
      email: "london@moneymakersacademy.com",
      hours: "Mon-Fri 9AM-6PM GMT"
    },
    {
      city: "Singapore",
      address: "88 Marina Bay Sands, Tower 1",
      cityState: "Singapore 018956",
      phone: "+65 6123 4567",
      email: "singapore@moneymakersacademy.com",
      hours: "Mon-Fri 9AM-6PM SGT"
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
              <Link to="/courses" className="text-slate-600 hover:text-blue-600 transition-colors">
                Courses
              </Link>
              <Link to="/community" className="text-slate-600 hover:text-blue-600 transition-colors">
                Community
              </Link>
              <Link to="/about" className="text-slate-600 hover:text-blue-600 transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
            Get in touch with our team. We're here to help you succeed in your trading journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4">
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Live Chat
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
              <Phone className="mr-2 h-5 w-5" />
              Call Us Now
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose the best way to reach us based on your needs and preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {method.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{method.title}</h3>
                <p className="text-slate-600 mb-3">{method.description}</p>
                <p className="text-sm font-semibold text-slate-800 mb-2">{method.contact}</p>
                <p className="text-xs text-slate-500">{method.responseTime}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">
                Send Us a Message
              </h2>
              <p className="text-xl text-slate-600">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Subject *</label>
                      <Input
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="Brief subject line"
                        required
                      />
                    </div>
                  </div>

                  {/* Category and Urgency */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Category *</label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="courses">Course Information</SelectItem>
                          <SelectItem value="ea-development">EA Development</SelectItem>
                          <SelectItem value="managed-accounts">Managed Accounts</SelectItem>
                          <SelectItem value="technical-support">Technical Support</SelectItem>
                          <SelectItem value="billing">Billing & Payments</SelectItem>
                          <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Urgency</label>
                      <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - General inquiry</SelectItem>
                          <SelectItem value="medium">Medium - Need response within 48 hours</SelectItem>
                          <SelectItem value="high">High - Need response within 24 hours</SelectItem>
                          <SelectItem value="urgent">Urgent - Need immediate response</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Please provide details about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Contact Method</label>
                    <Select value={formData.preferredContact} onValueChange={(value) => handleInputChange('preferredContact', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="How would you like us to respond?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone Call</SelectItem>
                        <SelectItem value="either">Either Email or Phone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 px-12 py-4">
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <p className="text-sm text-slate-500 mt-4">
                      We'll respond to your message within 24 hours during business days.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Our Offices
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Visit us at one of our global offices or reach out to our local teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{office.city}</h3>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-slate-800">{office.address}</p>
                    <p className="text-slate-600">{office.cityState}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">{office.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">{office.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">{office.hours}</span>
                  </div>
                </div>
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
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Quick answers to common questions. Can't find what you're looking for? Contact us!
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-3">How quickly do you respond?</h3>
                <p className="text-slate-600">
                  We typically respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please call our phone support line.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-3">Do you offer phone consultations?</h3>
                <p className="text-slate-600">
                  Yes! We offer free 30-minute phone consultations for new students and 
                  potential clients. Schedule yours through our contact form.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-3">What are your business hours?</h3>
                <p className="text-slate-600">
                  Our support team is available Monday-Friday, 9AM-6PM EST. 
                  Live chat and community support are available 24/7.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-3">Can I visit your offices?</h3>
                <p className="text-slate-600">
                  Absolutely! We welcome visitors to our offices in New York, London, and Singapore. 
                  Please contact us in advance to schedule your visit.
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
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Don't wait to start your trading journey. Contact us today and let's discuss 
            how we can help you achieve your financial goals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4">
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Live Chat
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
              <Phone className="mr-2 h-5 w-5" />
              Schedule Call
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

export default Contact;
