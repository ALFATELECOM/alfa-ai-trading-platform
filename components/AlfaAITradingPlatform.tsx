import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Clock, RefreshCw, Settings, HelpCircle, FileText, Users, PieChart, Menu, X, User, LogOut, Bell, Eye, EyeOff, Wifi, WifiOff, Activity, DollarSign, Zap, AlertCircle, CheckCircle } from 'lucide-react';

const AlfaAITradingPlatform = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [apiLogin, setApiLogin] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Login state
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  // User data
  const [currentUser] = useState({
    name: 'Kumar',
    email: 'alfasystemes@gmail.com',
    phone: '9703877760',
    id: '877760'
  });

  // Stock selection state
  const [stockSelectionMode, setStockSelectionMode] = useState('automatic');
  const [selectedStocks, setSelectedStocks] = useState([
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2456.75, change: 1.23, volume: 1234567, selected: true, sector: 'Energy' },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3567.80, change: -0.45, volume: 987654, selected: true, sector: 'IT' },
    { symbol: 'INFY', name: 'Infosys Limited', price: 1678.90, change: 2.11, volume: 876543, selected: false, sector: 'IT' },
    { symbol: 'HDFC', name: 'HDFC Bank', price: 1456.30, change: 0.67, volume: 765432, selected: true, sector: 'Banking' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 987.45, change: -1.23, volume: 654321, selected: false, sector: 'Banking' },
    { symbol: 'SBIN', name: 'State Bank of India', price: 567.20, change: 1.89, volume: 543210, selected: true, sector: 'Banking' },
    { symbol: 'ITC', name: 'ITC Limited', price: 345.80, change: -0.78, volume: 321098, selected: true, sector: 'FMCG' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 789.65, change: 0.34, volume: 432109, selected: false, sector: 'Telecom' }
  ]);

  // Enhanced strategies with proper state management
  const [strategies, setStrategies] = useState([
    { id: 1, name: 'BREAKOUT 5M', type: 'Momentum', riskLevel: 'Medium', winRate: 78.5, description: 'Price breakout strategy on 5-minute timeframe', active: true, config: { timeframe: '5m', threshold: 0.5 } },
    { id: 2, name: 'RSI DIVERGENCE', type: 'Technical', riskLevel: 'Low', winRate: 82.3, description: 'RSI divergence detection strategy', active: true, config: { rsiPeriod: 14, divergenceThreshold: 5 } },
    { id: 3, name: 'MOVING AVERAGE CROSSOVER', type: 'Trend', riskLevel: 'Low', winRate: 75.2, description: 'EMA crossover signals', active: false, config: { fastEMA: 9, slowEMA: 21 } },
    { id: 4, name: 'BOLLINGER BANDS SQUEEZE', type: 'Volatility', riskLevel: 'Medium', winRate: 71.8, description: 'Bollinger Bands squeeze and expansion', active: true, config: { period: 20, stdDev: 2 } },
    { id: 5, name: 'MACD HISTOGRAM', type: 'Momentum', riskLevel: 'Medium', winRate: 69.4, description: 'MACD histogram divergence', active: false, config: { fast: 12, slow: 26, signal: 9 } },
    { id: 6, name: 'STOCHASTIC RSI', type: 'Momentum', riskLevel: 'High', winRate: 73.1, description: 'Stochastic RSI overbought/oversold', active: true, config: { kPeriod: 14, dPeriod: 3 } },
    { id: 7, name: 'FIBONACCI RETRACEMENT', type: 'Support/Resistance', riskLevel: 'Medium', winRate: 76.9, description: 'Fibonacci retracement levels', active: false, config: { retracementLevel: 0.618 } },
    { id: 8, name: 'SUPPORT RESISTANCE', type: 'Price Action', riskLevel: 'Low', winRate: 79.2, description: 'Dynamic support and resistance levels', active: true, config: { lookback: 20, strength: 3 } },
    { id: 9, name: 'VOLUME WEIGHTED AVERAGE', type: 'Volume', riskLevel: 'Medium', winRate: 72.6, description: 'VWAP strategy with volume analysis', active: false, config: { period: 14 } },
    { id: 10, name: 'ICHIMOKU CLOUD', type: 'Trend', riskLevel: 'High', winRate: 74.8, description: 'Ichimoku Kinko Hyo complete strategy', active: true, config: { tenkan: 9, kijun: 26, senkou: 52 } },
    { id: 11, name: 'PRICE ACTION PATTERNS', type: 'Pattern', riskLevel: 'Medium', winRate: 77.3, description: 'Candlestick pattern recognition', active: false, config: { patterns: ['doji', 'hammer', 'engulfing'] } },
    { id: 12, name: 'MEAN REVERSION', type: 'Statistical', riskLevel: 'High', winRate: 68.7, description: 'Statistical mean reversion strategy', active: false, config: { zscore: 2, lookback: 50 } }
  ]);

  // API integration state
  const [zerodhaApi, setZerodhaApi] = useState({
    isConnected: apiLogin,
    apiKey: 'kitefront_12345',
    accessToken: '',
    clientId: 'DH1234',
    status: apiLogin ? 'Connected' : 'Disconnected'
  });

  const [brokerApis, setBrokerApis] = useState([
    { name: 'Zerodha', status: 'Connected', color: 'green', logo: 'Z', apiKey: 'kitefront_12345', lastSync: '2 mins ago' },
    { name: 'Upstox', status: 'Disconnected', color: 'red', logo: 'U', apiKey: '', lastSync: 'Never' },
    { name: 'Angel Broking', status: 'Connected', color: 'green', logo: 'A', apiKey: 'angel_789012', lastSync: '5 mins ago' },
    { name: 'Fyers', status: 'Pending', color: 'yellow', logo: 'F', apiKey: '', lastSync: 'Connecting...' },
    { name: 'Alice Blue', status: 'Disconnected', color: 'red', logo: 'AB', apiKey: '', lastSync: 'Never' },
    { name: 'Kotak Securities', status: 'Connected', color: 'green', logo: 'K', apiKey: 'kotak_345678', lastSync: '1 min ago' }
  ]);

  const [dashboardData, setDashboardData] = useState([
    {
      id: 1,
      symbol: 'BANKNIFTY[O]',
      lotSize: 35,
      maxQty: 300,
      quantity: 1,
      currentQty: 35,
      strategy: 'BREAKOUT 5M',
      orderType: 'MARKET',
      productType: 'MIS',
      trading: true
    },
    {
      id: 2,
      symbol: 'NIFTY[O]',
      lotSize: 75,
      maxQty: 750,
      quantity: 1,
      currentQty: 75,
      strategy: 'RSI DIVERGENCE',
      orderType: 'MARKET',
      productType: 'MIS',
      trading: true
    }
  ]);

  const [signalsData, setSignalsData] = useState([
    { sno: 1, time: '02/07/2025 10:18:29', type: 'LX', symbol: 'BANKNIFTY31JUL25568000PE', price: 570.00, strategy: 'BREAKOUT 5M', tradeType: 'MT_4' },
    { sno: 2, time: '02/07/2025 10:05:29', type: 'LX', symbol: 'BANKNIFTY31JUL25568000PE', price: 567.15, strategy: 'RSI DIVERGENCE', tradeType: 'MT_4' },
    { sno: 3, time: '02/07/2025 10:01:52', type: 'LE', symbol: 'NIFTY03JUL25257000PE', price: 190.35, strategy: 'BOLLINGER BANDS', tradeType: 'MT_4' },
    { sno: 4, time: '02/07/2025 10:01:35', type: 'LX', symbol: 'RELIANCE', price: 2456.75, strategy: 'MOVING AVERAGE CROSSOVER', tradeType: 'MT_4' },
    { sno: 5, time: '02/07/2025 09:43:33', type: 'LE', symbol: 'TCS', price: 3567.80, strategy: 'MACD SIGNAL', tradeType: 'MT_4' }
  ]);

  const [tradeHistoryData] = useState([
    {
      sno: 1,
      entryTime: '02/07/2025 09:40:52',
      exitTime: '02/07/2025 10:05:28',
      symbol: 'BANKNIFTY31JUL25568000PE[O]',
      strategy: 'BREAKOUT 5M',
      entryType: 'BUY ENTRY',
      qty: 35,
      entryPrice: 537.75,
      exitPrice: 567.15,
      total: '1029.00'
    },
    {
      sno: 2,
      entryTime: '02/07/2025 09:25:08',
      exitTime: '02/07/2025 09:37:54',
      symbol: 'BANKNIFTY31JUL25569000PE[O]',
      strategy: 'BREAKOUT 5M',
      entryType: 'BUY ENTRY',
      qty: 35,
      entryPrice: 535.25,
      exitPrice: 556.85,
      total: '756.00'
    },
    {
      sno: 3,
      entryTime: '02/07/2025 09:43:33',
      exitTime: '02/07/2025 10:01:35',
      symbol: 'NIFTY03JUL25257000PE[O]',
      strategy: 'RSI DIVERGENCE',
      entryType: 'BUY ENTRY',
      qty: 75,
      entryPrice: 170.65,
      exitPrice: 182.10,
      total: '858.75'
    }
  ]);

  const [portfolioStats] = useState({
    totalPL: 4275.50,
    todayPL: 1245.25,
    totalTrades: 156,
    winRate: 78.5,
    activeBrokers: 3,
    activeStrategies: 6
  });

  // Update API status when toggle changes
  useEffect(() => {
    setZerodhaApi(prev => ({
      ...prev,
      isConnected: apiLogin,
      status: apiLogin ? 'Connected' : 'Disconnected'
    }));
    
    setBrokerApis(prev => prev.map(broker => 
      broker.name === 'Zerodha' 
        ? { ...broker, status: apiLogin ? 'Connected' : 'Disconnected', color: apiLogin ? 'green' : 'red', lastSync: apiLogin ? 'Just now' : 'Disconnected' }
        : broker
    ));
  }, [apiLogin]);

  // Auto-update signals when API is connected
  useEffect(() => {
    if (!apiLogin) return;
    
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const strategyNames = strategies.filter(s => s.active).map(s => s.name);
        const stockSymbols = [...selectedStocks.filter(s => s.selected).map(s => s.symbol), 'BANKNIFTY31JUL25568000PE', 'NIFTY03JUL25257000PE'];
        
        const newSignal = {
          sno: signalsData.length + 1,
          time: new Date().toLocaleString('en-GB').replace(',', ''),
          type: Math.random() > 0.5 ? 'LX' : 'LE',
          symbol: stockSymbols[Math.floor(Math.random() * stockSymbols.length)],
          price: (Math.random() * 500 + 200).toFixed(2),
          strategy: strategyNames[Math.floor(Math.random() * strategyNames.length)] || 'BREAKOUT 5M',
          tradeType: 'MT_4'
        };
        setSignalsData(prev => [newSignal, ...prev.slice(0, 9)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [signalsData.length, selectedStocks, strategies, apiLogin]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    
    // Check for exact demo credentials
    if (loginData.username.toLowerCase() === 'demo' && loginData.password === 'password') {
      setIsLoggedIn(true);
      return;
    }
    
    // Allow any non-empty credentials for demo
    if (loginData.username.trim() && loginData.password.trim()) {
      setIsLoggedIn(true);
      return;
    }
    
    setLoginError('Please enter valid credentials or use demo/password');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ username: '', password: '' });
    setLoginError('');
  };

  const skipLogin = () => {
    setIsLoggedIn(true);
  };

  const fillDemoCredentials = () => {
    setLoginData({ username: 'demo', password: 'password' });
    setLoginError('');
  };

  const connectZerodhaApi = () => {
    if (zerodhaApi.apiKey && zerodhaApi.clientId) {
      setZerodhaApi(prev => ({
        ...prev,
        isConnected: true,
        status: 'Connected',
        accessToken: 'sample_access_token_' + Date.now()
      }));
      
      setBrokerApis(prev => prev.map(broker => 
        broker.name === 'Zerodha' 
          ? { ...broker, status: 'Connected', color: 'green', lastSync: 'Just now' }
          : broker
      ));
      
      setApiLogin(true);
    } else {
      alert('Please enter valid API Key and Client ID');
    }
  };

  const disconnectZerodhaApi = () => {
    setZerodhaApi(prev => ({
      ...prev,
      isConnected: false,
      status: 'Disconnected',
      accessToken: ''
    }));
    
    setBrokerApis(prev => prev.map(broker => 
      broker.name === 'Zerodha' 
        ? { ...broker, status: 'Disconnected', color: 'red', lastSync: 'Disconnected' }
        : broker
    ));
    
    setApiLogin(false);
  };

  const toggleBrokerConnection = (brokerName) => {
    setBrokerApis(prev => prev.map(broker => {
      if (broker.name === brokerName) {
        const newStatus = broker.status === 'Connected' ? 'Disconnected' : 'Connected';
        return {
          ...broker,
          status: newStatus,
          color: newStatus === 'Connected' ? 'green' : 'red',
          lastSync: newStatus === 'Connected' ? 'Just now' : 'Disconnected'
        };
      }
      return broker;
    }));
  };

  const toggleStrategy = (strategyId) => {
    setStrategies(prev => prev.map(strategy => 
      strategy.id === strategyId 
        ? { ...strategy, active: !strategy.active }
        : strategy
    ));
  };

  const configureStrategy = (strategyId) => {
    const strategy = strategies.find(s => s.id === strategyId);
    if (strategy) {
      const configString = Object.entries(strategy.config)
        .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
        .join('\n');
      
      alert(`Strategy Configuration for ${strategy.name}:\n\n${configString}\n\nNote: This is a demo. In production, this would open a detailed configuration panel.`);
    }
  };

  const updateQuantity = (id, newQuantity) => {
    setDashboardData(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const toggleTrading = (id) => {
    setDashboardData(prev => prev.map(item => 
      item.id === id ? { ...item, trading: !item.trading } : item
    ));
  };

  const selectAllStocks = () => {
    setSelectedStocks(prev => prev.map(stock => ({ ...stock, selected: true })));
  };

  const clearAllStocks = () => {
    setSelectedStocks(prev => prev.map(stock => ({ ...stock, selected: false })));
  };

  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">AA</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">ALFA AI TRADING</h1>
          <p className="text-gray-600 mt-2">Advanced Algorithmic Trading Platform</p>
        </div>

        {loginError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            {loginError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={loginData.username}
              onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter username or use 'demo'"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={loginData.password}
                onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                placeholder="Enter password or use 'password'"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="px-4 py-3 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg transition-all"
              title="Fill demo credentials"
            >
              <CheckCircle className="w-5 h-5" />
            </button>
          </div>
        </form>

        <div className="mt-4">
          <button
            onClick={skipLogin}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-all font-medium"
          >
            Skip Login (Demo Mode)
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Demo Credentials:</p>
          <div className="mt-2 text-xs bg-gray-100 p-3 rounded-lg">
            <p><strong>Username:</strong> demo</p>
            <p><strong>Password:</strong> password</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">✓ Click green checkmark to auto-fill or use Skip Login</p>
        </div>
      </div>
    </div>
  );

  if (!isLoggedIn) return <LoginScreen />;

  const renderDashboard = () => (
    <div className="p-6 space-y-6">
      {/* API Status Alert */}
      {!apiLogin && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg flex items-center">
          <AlertCircle className="w-4 h-4 mr-2" />
          <span>API is disconnected. Trading signals and live data are paused.</span>
          <button 
            onClick={() => setApiLogin(true)}
            className="ml-auto text-yellow-800 hover:text-yellow-900 underline"
          >
            Connect API
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total P&L</p>
              <p className="text-2xl font-bold text-green-600">₹{portfolioStats.totalPL.toFixed(2)}</p>
              <p className="text-xs text-green-600">+{portfolioStats.winRate}% Win Rate</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Strategies</p>
              <p className="text-2xl font-bold text-blue-600">{strategies.filter(s => s.active).length}</p>
              <p className="text-xs text-blue-600">Running Live</p>
            </div>
            <Zap className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Connected Brokers</p>
              <p className="text-2xl font-bold text-purple-600">{brokerApis.filter(b => b.status === 'Connected').length}</p>
              <p className="text-xs text-purple-600">APIs Active</p>
            </div>
            <Wifi className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Selected Stocks</p>
              <p className="text-2xl font-bold text-orange-600">{selectedStocks.filter(s => s.selected).length}</p>
              <p className="text-xs text-orange-600">In Portfolio</p>
            </div>
            <BarChart3 className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">🚀 Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setStrategies(prev => prev.map(s => s.riskLevel === 'Low' ? { ...s, active: true } : s))}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg text-sm font-medium"
          >
            🟢 Enable Safe Strategies
          </button>
          <button 
            onClick={() => setStrategies(prev => prev.map(s => ({ ...s, active: false })))}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg text-sm font-medium"
          >
            🔴 Stop All Trading
          </button>
          <button 
            onClick={() => setSelectedStocks(prev => prev.map(stock => stock.sector === 'Banking' ? { ...stock, selected: true } : stock))}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-medium"
          >
            🏦 Select Banking Stocks
          </button>
          <button 
            onClick={() => setSelectedStocks(prev => prev.map(stock => stock.sector === 'IT' ? { ...stock, selected: true } : stock))}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg text-sm font-medium"
          >
            💻 Select IT Stocks
          </button>
        </div>
      </div>

      {/* Active Strategies Overview */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">⚡ Active Trading Strategies</h3>
            <button 
              onClick={() => setActiveTab('strategies')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Manage All →
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {strategies.filter(s => s.active).slice(0, 6).map((strategy) => (
              <div key={strategy.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{strategy.name}</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={strategy.active}
                      onChange={() => toggleStrategy(strategy.id)}
                    />
                    <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Win Rate</span>
                    <span className="font-medium text-green-600">{strategy.winRate}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Risk</span>
                    <span className={`font-medium ${
                      strategy.riskLevel === 'Low' ? 'text-green-600' : 
                      strategy.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {strategy.riskLevel}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">{strategy.type}</div>
                </div>
              </div>
            ))}
          </div>
          {strategies.filter(s => s.active).length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">No active strategies</div>
              <button 
                onClick={() => setActiveTab('strategies')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Configure Strategies
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stock Portfolio Customization */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">📈 Stock Portfolio</h3>
            <button 
              onClick={() => setActiveTab('stockSelection')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Customize →
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Portfolio Allocation</span>
              <span className="font-medium">{selectedStocks.filter(s => s.selected).length} / {selectedStocks.length} stocks</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(selectedStocks.filter(s => s.selected).length / selectedStocks.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {['Banking', 'IT', 'Energy', 'FMCG'].map(sector => {
              const sectorStocks = selectedStocks.filter(s => s.sector === sector);
              const selectedSectorStocks = sectorStocks.filter(s => s.selected);
              return (
                <div key={sector} className="text-center">
                  <div className="text-lg font-bold text-blue-600">{selectedSectorStocks.length}</div>
                  <div className="text-xs text-gray-600">{sector}</div>
                  <button 
                    onClick={() => setSelectedStocks(prev => prev.map(stock => 
                      stock.sector === sector ? { ...stock, selected: !stock.selected } : stock
                    ))}
                    className="text-xs text-blue-600 hover:text-blue-700 mt-1"
                  >
                    Toggle
                  </button>
                </div>
              );
            })}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Selected Stocks:</div>
            <div className="flex flex-wrap gap-2">
              {selectedStocks.filter(s => s.selected).map((stock) => (
                <div key={stock.symbol} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  {stock.symbol}
                  <button 
                    onClick={() => setSelectedStocks(prev => prev.map(s => 
                      s.symbol === stock.symbol ? { ...s, selected: false } : s
                    ))}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </div>
              ))}
              {selectedStocks.filter(s => s.selected).length === 0 && (
                <div className="text-gray-500 text-sm">No stocks selected</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Position Management */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">⚙️ Position Management</h2>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="text-left py-3 px-4 font-medium">#</th>
                  <th className="text-left py-3 px-4 font-medium">Symbol</th>
                  <th className="text-left py-3 px-4 font-medium">Lot Size</th>
                  <th className="text-left py-3 px-4 font-medium">Max Qty</th>
                  <th className="text-left py-3 px-4 font-medium">Quantity</th>
                  <th className="text-left py-3 px-4 font-medium">Strategy</th>
                  <th className="text-left py-3 px-4 font-medium">Order Type</th>
                  <th className="text-left py-3 px-4 font-medium">Trading</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4">{item.id}</td>
                    <td className="py-4 px-4 font-medium">{item.symbol}</td>
                    <td className="py-4 px-4">{item.lotSize}</td>
                    <td className="py-4 px-4">{item.maxQty}</td>
                    <td className="py-4 px-4">
                      <input 
                        type="number" 
                        value={item.quantity} 
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                        min="1"
                        max={Math.floor(item.maxQty / item.lotSize)}
                      />
                    </td>
                    <td className="py-4 px-4">
                      <select 
                        className="px-3 py-1 border border-gray-300 rounded bg-white"
                        value={item.strategy}
                        onChange={(e) => setDashboardData(prev => prev.map(d => 
                          d.id === item.id ? { ...d, strategy: e.target.value } : d
                        ))}
                      >
                        {strategies.filter(s => s.active).map(strategy => (
                          <option key={strategy.name} value={strategy.name}>{strategy.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-4 px-4">
                      <select 
                        className="px-3 py-1 border border-gray-300 rounded bg-white"
                        value={item.orderType}
                        onChange={(e) => setDashboardData(prev => prev.map(d => 
                          d.id === item.id ? { ...d, orderType: e.target.value } : d
                        ))}
                      >
                        <option value="MARKET">MARKET</option>
                        <option value="LIMIT">LIMIT</option>
                        <option value="SL">STOP LOSS</option>
                        <option value="SL-M">SL-MARKET</option>
                      </select>
                    </td>
                    <td className="py-4 px-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={item.trading}
                          onChange={() => toggleTrading(item.id)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => alert(`Modifying position for ${item.symbol}`)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => setDashboardData(prev => prev.filter(d => d.id !== item.id))}
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <button 
              onClick={() => {
                const newPosition = {
                  id: dashboardData.length + 1,
                  symbol: 'NEW_SYMBOL',
                  lotSize: 50,
                  maxQty: 500,
                  quantity: 1,
                  currentQty: 50,
                  strategy: strategies.filter(s => s.active)[0]?.name || 'BREAKOUT 5M',
                  orderType: 'MARKET',
                  productType: 'MIS',
                  trading: false
                };
                setDashboardData(prev => [...prev, newPosition]);
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              Add New Position
            </button>
            <button 
              onClick={() => alert('Positions updated successfully!')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Update All Positions
            </button>
            <button 
              onClick={() => setDashboardData(prev => prev.map(d => ({ ...d, trading: false })))}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
            >
              Stop All Trading
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">📊 Recent Activity</h3>
            <button 
              onClick={() => setActiveTab('signals')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All →
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {signalsData.slice(0, 5).map((signal) => (
              <div key={signal.sno} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${signal.type === 'LX' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                  <div>
                    <div className="font-medium text-sm">{signal.symbol}</div>
                    <div className="text-xs text-gray-600">{signal.strategy}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-sm">₹{signal.price}</div>
                  <div className="text-xs text-gray-600">{signal.time.split(' ')[1]}</div>
                </div>
              </div>
            ))}
            {signalsData.length === 0 && (
              <div className="text-center text-gray-500 py-4">No recent signals</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStockSelection = () => (
    <div className="p-6 space-y-6">
      {/* Selection Mode */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Stock Selection Mode</h3>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="selectionMode"
                value="automatic"
                checked={stockSelectionMode === 'automatic'}
                onChange={(e) => setStockSelectionMode(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <div>
                <span className="font-medium">🤖 AI Selection</span>
                <p className="text-sm text-gray-600">Algorithm selects best performing stocks</p>
              </div>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="selectionMode"
                value="manual"
                checked={stockSelectionMode === 'manual'}
                onChange={(e) => setStockSelectionMode(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <div>
                <span className="font-medium">👤 Manual Selection</span>
                <p className="text-sm text-gray-600">Choose individual stocks manually</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* AI Selection Settings */}
      {stockSelectionMode === 'automatic' && (
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">🤖 AI Selection Criteria</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Market Cap</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option>Large Cap (₹20,000+ Cr)</option>
                  <option>Mid Cap (₹5,000-20,000 Cr)</option>
                  <option>Small Cap (₹500-5,000 Cr)</option>
                  <option>All Market Caps</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sector Focus</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option>All Sectors</option>
                  <option>Banking & Finance</option>
                  <option>Information Technology</option>
                  <option>Energy & Oil</option>
                  <option>FMCG</option>
                  <option>Telecom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Risk Tolerance</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option>Conservative (Low Risk)</option>
                  <option>Balanced (Medium Risk)</option>
                  <option>Aggressive (High Risk)</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
                🔍 Run AI Stock Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Selection or Results */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {stockSelectionMode === 'manual' ? '👤 Manual Stock Selection' : '🤖 AI Selected Stocks'}
            </h3>
            <div className="text-sm text-gray-600">
              {selectedStocks.filter(s => s.selected).length} of {selectedStocks.length} selected
            </div>
          </div>
        </div>

        {/* Search and Filters for Manual Mode */}
        {stockSelectionMode === 'manual' && (
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-wrap gap-4 mb-4">
              <input
                type="text"
                placeholder="Search stocks (e.g., RELIANCE, TCS, INFY)"
                className="flex-1 min-w-64 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <select className="px-4 py-2 border border-gray-300 rounded-lg">
                <option>All Sectors</option>
                <option>Banking</option>
                <option>IT</option>
                <option>Energy</option>
                <option>FMCG</option>
                <option>Telecom</option>
              </select>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                🔍 Search
              </button>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={selectAllStocks}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                ✅ Select All
              </button>
              <button 
                onClick={clearAllStocks}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                ❌ Clear All
              </button>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg">
                🏆 Select Top Performers
              </button>
            </div>
          </div>
        )}

        {/* Stock List Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="text-left py-3 px-4 font-medium">
                  {stockSelectionMode === 'manual' ? 'Select' : 'AI Score'}
                </th>
                <th className="text-left py-3 px-4 font-medium">Symbol</th>
                <th className="text-left py-3 px-4 font-medium">Company</th>
                <th className="text-left py-3 px-4 font-medium">Price</th>
                <th className="text-left py-3 px-4 font-medium">Change</th>
                <th className="text-left py-3 px-4 font-medium">Volume</th>
                <th className="text-left py-3 px-4 font-medium">Sector</th>
                {stockSelectionMode === 'automatic' && (
                  <th className="text-left py-3 px-4 font-medium">AI Ranking</th>
                )}
              </tr>
            </thead>
            <tbody>
              {selectedStocks.map((stock, index) => (
                <tr key={stock.symbol} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    {stockSelectionMode === 'manual' ? (
                      <input
                        type="checkbox"
                        checked={stock.selected}
                        onChange={(e) => {
                          const updated = [...selectedStocks];
                          updated[index].selected = e.target.checked;
                          setSelectedStocks(updated);
                        }}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${stock.selected ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span className="text-sm font-bold text-blue-600">
                          {Math.floor(Math.random() * 40 + 60)}%
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 font-bold text-blue-600">{stock.symbol}</td>
                  <td className="py-3 px-4">{stock.name}</td>
                  <td className="py-3 px-4 font-medium">₹{stock.price.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`font-medium ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-3 px-4">{stock.volume.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                      {stock.sector}
                    </span>
                  </td>
                  {stockSelectionMode === 'automatic' && (
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < (stock.selected ? 4 : 2) ? 'bg-yellow-400' : 'bg-gray-300'
                            }`}
                          ></div>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="p-6">
          <div className="flex space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
              Apply Selection
            </button>
            <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
              Save as Preset
            </button>
            {stockSelectionMode === 'automatic' && (
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                🔄 Refresh AI Selection
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Selection Summary */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">📈 Current Trading Universe</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{selectedStocks.filter(s => s.selected).length}</div>
              <div className="text-sm text-gray-600">Selected Stocks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                ₹{selectedStocks.filter(s => s.selected).reduce((sum, stock) => sum + stock.price, 0).toFixed(0)}
              </div>
              <div className="text-sm text-gray-600">Total Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {stockSelectionMode === 'automatic' ? 'AI' : 'Manual'}
              </div>
              <div className="text-sm text-gray-600">Selection Mode</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {strategies.filter(s => s.active).length}
              </div>
              <div className="text-sm text-gray-600">Active Strategies</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Selected Stocks:</div>
            <div className="flex flex-wrap gap-2">
              {selectedStocks.filter(s => s.selected).map((stock) => (
                <div key={stock.symbol} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {stock.symbol}
                  <span className={`ml-1 ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change >= 0 ? '↗' : '↘'}
                  </span>
                </div>
              ))}
              {selectedStocks.filter(s => s.selected).length === 0 && (
                <div className="text-gray-500 text-sm">No stocks selected</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStrategies = () => (
    <div className="p-6 space-y-6">
      {/* Strategy Summary */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Strategy Overview</h3>
          <div className="text-sm text-gray-600">
            {strategies.filter(s => s.active).length} of {strategies.length} strategies active
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{strategies.filter(s => s.active).length}</div>
            <div className="text-sm text-gray-600">Active Strategies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {(strategies.filter(s => s.active).reduce((sum, s) => sum + s.winRate, 0) / strategies.filter(s => s.active).length || 0).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Avg Win Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {strategies.filter(s => s.active && s.riskLevel === 'Low').length}
            </div>
            <div className="text-sm text-gray-600">Low Risk Active</div>
          </div>
        </div>
      </div>

      {/* Strategy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strategies.map((strategy) => (
          <div key={strategy.id} className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{strategy.name}</h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={strategy.active}
                  onChange={() => toggleStrategy(strategy.id)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Type</span>
                <span className="text-sm font-medium">{strategy.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Risk Level</span>
                <span className={`text-sm font-medium ${
                  strategy.riskLevel === 'Low' ? 'text-green-600' : 
                  strategy.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {strategy.riskLevel}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Win Rate</span>
                <span className="text-sm font-bold text-green-600">{strategy.winRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className={`text-sm font-medium ${strategy.active ? 'text-green-600' : 'text-gray-400'}`}>
                  {strategy.active ? 'Running' : 'Stopped'}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {strategy.description}
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <button 
                onClick={() => configureStrategy(strategy.id)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Configure Strategy
              </button>
              {strategy.active && (
                <div className="text-center">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                    Live Trading
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => setStrategies(prev => prev.map(s => ({ ...s, active: true })))}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Enable All Strategies
          </button>
          <button 
            onClick={() => setStrategies(prev => prev.map(s => ({ ...s, active: false })))}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Disable All Strategies
          </button>
          <button 
            onClick={() => setStrategies(prev => prev.map(s => s.riskLevel === 'Low' ? { ...s, active: true } : { ...s, active: false }))}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
          >
            Enable Low Risk Only
          </button>
          <button 
            onClick={() => setStrategies(prev => prev.map(s => s.winRate > 75 ? { ...s, active: true } : { ...s, active: false }))}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Enable High Win Rate (>75%)
          </button>
        </div>
      </div>
    </div>
  );

  const renderApiIntegration = () => (
    <div className="p-6 space-y-6">
      {/* Zerodha API Setup */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Zerodha API Configuration</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
              <input
                type="text"
                value={zerodhaApi.apiKey}
                onChange={(e) => setZerodhaApi(prev => ({ ...prev, apiKey: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your Zerodha API Key"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client ID</label>
              <input
                type="text"
                value={zerodhaApi.clientId}
                onChange={(e) => setZerodhaApi(prev => ({ ...prev, clientId: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your Client ID"
              />
            </div>
          </div>
          
          <div className="mt-6 flex items-center space-x-4">
            <button
              onClick={zerodhaApi.isConnected ? disconnectZerodhaApi : connectZerodhaApi}
              className={`px-6 py-2 rounded-lg transition-colors ${
                zerodhaApi.isConnected 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {zerodhaApi.isConnected ? 'Disconnect API' : 'Connect API'}
            </button>
            
            <div className={`flex items-center space-x-2 ${
              zerodhaApi.isConnected ? 'text-green-600' : 'text-red-600'
            }`}>
              {zerodhaApi.isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              <span className="text-sm font-medium">{zerodhaApi.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* All Broker APIs */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Broker API Connections</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brokerApis.map((broker) => (
              <div key={broker.name} className="border border-gray-200 rounded-lg p-4">
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center text-white font-bold text-xl
                    ${broker.color === 'green' ? 'bg-green-500' : broker.color === 'red' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                    {broker.logo}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{broker.name}</h3>
                  
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-3
                    ${broker.color === 'green' ? 'bg-green-100 text-green-800' : 
                      broker.color === 'red' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    <div className={`w-2 h-2 rounded-full mr-2
                      ${broker.color === 'green' ? 'bg-green-500' : broker.color === 'red' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                    {broker.status}
                  </div>
                  
                  {broker.apiKey && (
                    <div className="text-xs text-gray-500 mb-2">
                      API: {broker.apiKey}
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500 mb-4">
                    Last Sync: {broker.lastSync}
                  </div>
                  
                  <button 
                    onClick={() => toggleBrokerConnection(broker.name)}
                    className={`w-full py-2 px-4 rounded-lg transition-colors text-sm
                      ${broker.status === 'Connected' ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                  >
                    {broker.status === 'Connected' ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSignals = () => (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Live Trading Signals</h2>
            <div className={`flex items-center space-x-2 ${apiLogin ? 'text-green-600' : 'text-red-600'}`}>
              {apiLogin ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              <span className="text-sm font-medium">{apiLogin ? 'Live' : 'Offline'}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {!apiLogin && (
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
              API is disconnected. Enable API connection to see live signals.
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="text-left py-3 px-4 font-medium">S.No.</th>
                  <th className="text-left py-3 px-4 font-medium">Time</th>
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-4 font-medium">Symbol</th>
                  <th className="text-left py-3 px-4 font-medium">Price</th>
                  <th className="text-left py-3 px-4 font-medium">Strategy</th>
                </tr>
              </thead>
              <tbody>
                {signalsData.map((signal) => (
                  <tr key={signal.sno} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">{signal.sno}</td>
                    <td className="py-3 px-4">{signal.time}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        signal.type === 'LX' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {signal.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium">{signal.symbol}</td>
                    <td className="py-3 px-4">₹{signal.price}</td>
                    <td className="py-3 px-4">{signal.strategy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTradeHistory = () => (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Trade History</h2>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="text-left py-3 px-4 font-medium">S.No.</th>
                  <th className="text-left py-3 px-4 font-medium">Entry Time</th>
                  <th className="text-left py-3 px-4 font-medium">Exit Time</th>
                  <th className="text-left py-3 px-4 font-medium">Symbol</th>
                  <th className="text-left py-3 px-4 font-medium">Strategy</th>
                  <th className="text-left py-3 px-4 font-medium">Entry Price</th>
                  <th className="text-left py-3 px-4 font-medium">Exit Price</th>
                  <th className="text-left py-3 px-4 font-medium">P&L</th>
                </tr>
              </thead>
              <tbody>
                {tradeHistoryData.map((trade) => (
                  <tr key={trade.sno} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">{trade.sno}</td>
                    <td className="py-3 px-4">{trade.entryTime}</td>
                    <td className="py-3 px-4">{trade.exitTime}</td>
                    <td className="py-3 px-4 font-medium">{trade.symbol}</td>
                    <td className="py-3 px-4">{trade.strategy}</td>
                    <td className="py-3 px-4">₹{trade.entryPrice}</td>
                    <td className="py-3 px-4">₹{trade.exitPrice}</td>
                    <td className="py-3 px-4 font-bold text-green-600">+₹{trade.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 text-right">
            <div className="text-xl font-bold text-green-600">Total P&L: ₹3,356.25</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AA</span>
                  </div>
                </div>
                <span className="text-xl font-bold">ALFA AI TRADING</span>
              </div>
              
              <div className="hidden md:block">
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  ADVANCED ALGORITHMIC TRADING PLATFORM
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full">
                <div className={`w-2 h-2 rounded-full ${apiLogin ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className="text-sm">API</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={apiLogin} 
                    onChange={(e) => setApiLogin(e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-8 h-4 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
              <button className="p-2 hover:bg-white/10 rounded-lg">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg">
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-white/10 rounded-lg"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-30 w-64 bg-white shadow-lg h-screen transition-transform duration-300`}>
          <nav className="p-4 space-y-1">
            <button
              onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            
            <button
              onClick={() => { setActiveTab('stockSelection'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                activeTab === 'stockSelection' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Activity className="w-5 h-5" />
              <span>Stock Selection</span>
            </button>
            
            <button
              onClick={() => { setActiveTab('strategies'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                activeTab === 'strategies' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Zap className="w-5 h-5" />
              <span>Trading Strategies</span>
            </button>
            
            <button
              onClick={() => { setActiveTab('signals'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                activeTab === 'signals' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span>Live Signals</span>
            </button>
            
            <button
              onClick={() => { setActiveTab('apiIntegration'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                activeTab === 'apiIntegration' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>API Integration</span>
            </button>
            
            <button 
              onClick={() => { setActiveTab('tradeHistory'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                activeTab === 'tradeHistory' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Trade History</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <HelpCircle className="w-5 h-5" />
              <span>Help Center</span>
            </button>
          </nav>
        </aside>

        {/* Mobile overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'stockSelection' && renderStockSelection()}
          {activeTab === 'strategies' && renderStrategies()}
          {activeTab === 'signals' && renderSignals()}
          {activeTab === 'apiIntegration' && renderApiIntegration()}
          {activeTab === 'tradeHistory' && renderTradeHistory()}
        </main>
      </div>
    </div>
  );
};

export default AlfaAITradingPlatform;