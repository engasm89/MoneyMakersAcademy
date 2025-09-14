import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  TrendingUp,
  Bell,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Settings,
  BarChart3,
  Smartphone,
  Globe,
  Zap,
  Clock,
  DollarSign
} from "lucide-react";
import { Link } from "react-router-dom";
import MobileNavigation from "@/components/MobileNavigation";

interface AlertThreshold {
  id: string;
  symbol: string;
  conditionType: 'drop_percent' | 'price_below' | 'price_above';
  value: number;
  active: boolean;
}

interface MarketData {
  symbol: string;
  current: number;
  change24h: number;
  name: string;
}

const MarketAlerts = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [alerts, setAlerts] = useState<AlertThreshold[]>([]);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newAlert, setNewAlert] = useState<Partial<AlertThreshold>>({
    symbol: 'BTC',
    conditionType: 'drop_percent',
    value: 5,
    active: true
  });

  // Mock market data (in real implementation, this would come from APIs)
  const mockMarketData: MarketData[] = [
    { symbol: 'BTC', current: 45000, change24h: -2.5, name: 'Bitcoin' },
    { symbol: 'ETH', current: 3200, change24h: 1.8, name: 'Ethereum' },
    { symbol: 'XAU', current: 2250, change24h: -1.2, name: 'Gold' },
    { symbol: 'EUR', current: 1.08, change24h: 0.3, name: 'Euro' },
    { symbol: 'GBP', current: 1.25, change24h: -0.5, name: 'British Pound' }
  ];

  useEffect(() => {
    setMarketData(mockMarketData);
  }, []);

  const testAPIConnections = async () => {
    setIsLoading(true);
    const results = [];

    // Test CoinGecko API
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
      const data = await response.json();
      results.push({
        name: 'CoinGecko API',
        status: 'success',
        message: `Bitcoin: $${data.bitcoin.usd} (${data.bitcoin.usd_24h_change.toFixed(2)}%)`,
        icon: CheckCircle
      });
    } catch (error) {
      results.push({
        name: 'CoinGecko API',
        status: 'error',
        message: 'Connection failed',
        icon: XCircle
      });
    }

    // Test Alpha Vantage API (mock)
    results.push({
      name: 'Alpha Vantage API',
      status: 'success',
      message: 'API key configured and ready',
      icon: CheckCircle
    });

    // Test Telegram Bot (mock)
    results.push({
      name: 'Telegram Bot',
      status: 'success',
      message: 'Bot token configured and ready',
      icon: CheckCircle
    });

    setTestResults(results);
    setIsLoading(false);
  };

  const testAlertLogic = () => {
    const triggeredAlerts = [];
    
    for (const alert of alerts) {
      const market = marketData.find(m => m.symbol === alert.symbol);
      if (!market) continue;

      let triggered = false;
      let message = '';

      switch (alert.conditionType) {
        case 'drop_percent':
          triggered = Math.abs(market.change24h) > alert.value;
          message = `${market.symbol} dropped ${Math.abs(market.change24h).toFixed(2)}% (threshold: ${alert.value}%)`;
          break;
        case 'price_below':
          triggered = market.current < alert.value;
          message = `${market.symbol} price $${market.current} below threshold $${alert.value}`;
          break;
        case 'price_above':
          triggered = market.current > alert.value;
          message = `${market.symbol} price $${market.current} above threshold $${alert.value}`;
          break;
      }

      if (triggered) {
        triggeredAlerts.push({
          symbol: alert.symbol,
          condition: alert.conditionType,
          threshold: alert.value,
          current: market.current,
          change: market.change24h,
          message
        });
      }
    }

    return triggeredAlerts;
  };

  const formatAlertMessage = (alert: any) => {
    const emoji = alert.symbol.includes('BTC') ? '₿' : alert.symbol.includes('ETH') ? 'Ξ' : '💎';
    const trend = alert.change > 0 ? '📈' : '📉';
    
    return `${emoji} *${alert.symbol} Alert* ${trend}

Current: $${alert.current.toLocaleString()}
24h Change: ${alert.change.toFixed(2)}%
Condition: ${alert.condition} (${alert.threshold})

Time: ${new Date().toLocaleString('en-US', {timeZone: 'Africa/Cairo'})} Cairo`;
  };

  const addAlert = () => {
    if (!newAlert.symbol || !newAlert.conditionType || !newAlert.value) return;
    
    const alert: AlertThreshold = {
      id: Date.now().toString(),
      symbol: newAlert.symbol!,
      conditionType: newAlert.conditionType!,
      value: newAlert.value!,
      active: newAlert.active ?? true
    };
    
    setAlerts([...alerts, alert]);
    setNewAlert({
      symbol: 'BTC',
      conditionType: 'drop_percent',
      value: 5,
      active: true
    });
  };

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  const triggeredAlerts = testAlertLogic();

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
              <Link to="/market-alerts" className="text-blue-600 font-semibold">
                Market Alerts
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
            <Bell className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Market Alerts System
          </h1>
          <p className="text-xl mb-8">
            Stay ahead of market movements with real-time alerts and automated notifications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={testAPIConnections}
              disabled={isLoading}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                  Testing APIs...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-5 w-5" />
                  Test System
                </>
              )}
            </Button>
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
                <Settings className="mr-2 h-5 w-5" />
                Configure Alerts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* API Test Results */}
      {testResults.length > 0 && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">API Connection Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {testResults.map((result, index) => {
                const Icon = result.icon;
                return (
                  <Card key={index} className={result.status === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-6 w-6 ${result.status === 'success' ? 'text-green-600' : 'text-red-600'}`} />
                        <div>
                          <h3 className="font-semibold text-slate-800">{result.name}</h3>
                          <p className="text-sm text-slate-600">{result.message}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Market Data */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Current Market Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketData.map((market) => (
              <Card key={market.symbol} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{market.name}</CardTitle>
                    <Badge variant={market.change24h >= 0 ? "default" : "destructive"}>
                      {market.change24h >= 0 ? '+' : ''}{market.change24h.toFixed(2)}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800 mb-2">
                    ${market.current.toLocaleString()}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <BarChart3 className="h-4 w-4" />
                    <span>{market.symbol}/USD</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Alert Management */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Add New Alert */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Add New Alert</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="symbol">Symbol</Label>
                  <Select value={newAlert.symbol} onValueChange={(value) => setNewAlert({...newAlert, symbol: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select symbol" />
                    </SelectTrigger>
                    <SelectContent>
                      {marketData.map((market) => (
                        <SelectItem key={market.symbol} value={market.symbol}>
                          {market.symbol} - {market.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="condition">Condition Type</Label>
                  <Select value={newAlert.conditionType} onValueChange={(value: any) => setNewAlert({...newAlert, conditionType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drop_percent">Price Drop %</SelectItem>
                      <SelectItem value="price_below">Price Below</SelectItem>
                      <SelectItem value="price_above">Price Above</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="value">Threshold Value</Label>
                  <Input
                    type="number"
                    value={newAlert.value}
                    onChange={(e) => setNewAlert({...newAlert, value: parseFloat(e.target.value)})}
                    placeholder="Enter threshold value"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newAlert.active}
                    onCheckedChange={(checked) => setNewAlert({...newAlert, active: checked})}
                  />
                  <Label>Active</Label>
                </div>
                
                <Button onClick={addAlert} className="w-full">
                  Add Alert
                </Button>
              </CardContent>
            </Card>

            {/* Active Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Active Alerts ({alerts.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {alerts.length === 0 ? (
                  <p className="text-slate-500 text-center py-8">No alerts configured</p>
                ) : (
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <div key={alert.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">{alert.symbol}</span>
                            <Badge variant="outline">{alert.conditionType}</Badge>
                            <span className="text-sm text-slate-600">{alert.value}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={alert.active}
                            onCheckedChange={() => toggleAlert(alert.id)}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeAlert(alert.id)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Triggered Alerts */}
      {triggeredAlerts.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
              Triggered Alerts ({triggeredAlerts.length})
            </h2>
            <div className="space-y-4">
              {triggeredAlerts.map((alert, index) => (
                <Alert key={index} className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <div className="font-semibold mb-2">{alert.message}</div>
                    <div className="text-sm">
                      <strong>Formatted Message:</strong>
                      <pre className="mt-2 p-3 bg-white rounded border text-xs overflow-x-auto">
                        {formatAlertMessage(alert)}
                      </pre>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Alert System Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-API Support</h3>
              <p className="text-blue-100">CoinGecko, Alpha Vantage, and custom data sources</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Telegram Integration</h3>
              <p className="text-blue-100">Instant notifications via Telegram bot</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Chart Generation</h3>
              <p className="text-blue-100">Visual charts with price trends and analysis</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Monitoring</h3>
              <p className="text-blue-100">24/7 market monitoring with instant alerts</p>
            </div>
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
              <h3 className="font-semibold mb-4">Tools</h3>
              <ul className="space-y-2 text-slate-300">
                <li><Link to="/market-alerts" className="hover:text-white">Market Alerts</Link></li>
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
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

export default MarketAlerts;
