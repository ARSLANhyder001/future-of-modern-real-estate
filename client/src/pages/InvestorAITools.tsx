import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Utility for currency formatting
const formatPKR = (value: number) =>
  value.toLocaleString("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 });

// Enhanced property suggestion logic with more detailed recommendations
const getPropertySuggestion = (budget: number): { suggestion: string; properties: Array<{ name: string; price: string; location: string; type: string; roi: string }> } => {
  if (budget < 2000000) {
    return {
      suggestion: "Consider 1-bed apartments or small commercial shops in emerging areas.",
      properties: [
        { name: "Emerald Heights 1BR", price: "1.8M PKR", location: "Bahria Town Phase 8", type: "Apartment", roi: "12-15%" },
        { name: "City Center Shop", price: "1.5M PKR", location: "Gulberg III", type: "Commercial", roi: "18-22%" },
        { name: "Green Valley Plot", price: "1.2M PKR", location: "DHA Phase 6", type: "Plot", roi: "25-30%" }
      ]
    };
  } else if (budget < 10000000) {
    return {
      suggestion: "Look for 2-3 bed apartments, small houses, or plots in developing societies.",
      properties: [
        { name: "Luxury 2BR Apartment", price: "8.5M PKR", location: "DHA Phase 5", type: "Apartment", roi: "15-18%" },
        { name: "Modern Townhouse", price: "7.2M PKR", location: "Bahria Town Phase 7", type: "House", roi: "20-25%" },
        { name: "Commercial Office", price: "9.8M PKR", location: "Gulberg II", type: "Commercial", roi: "22-28%" }
      ]
    };
  } else if (budget < 50000000) {
    return {
      suggestion: "Explore luxury apartments, 1-kanal houses, or commercial properties in prime locations.",
      properties: [
        { name: "Premium 3BR Villa", price: "35M PKR", location: "DHA Phase 8", type: "Villa", roi: "18-22%" },
        { name: "Luxury Penthouse", price: "42M PKR", location: "Gulberg I", type: "Penthouse", roi: "25-30%" },
        { name: "Commercial Plaza", price: "28M PKR", location: "Bahria Town Phase 6", type: "Commercial", roi: "30-35%" }
      ]
    };
  } else {
    return {
      suggestion: "You can invest in high-end villas, multi-kanal plots, or premium commercial plazas.",
      properties: [
        { name: "Executive Villa", price: "85M PKR", location: "DHA Phase 9", type: "Villa", roi: "20-25%" },
        { name: "Luxury Farmhouse", price: "120M PKR", location: "Bahria Orchard", type: "Farmhouse", roi: "30-40%" },
        { name: "Premium Mall Space", price: "95M PKR", location: "Gulberg I", type: "Commercial", roi: "35-45%" }
      ]
    };
  }
};

// Market analysis data
const marketData = {
  currentTrend: "Bullish",
  avgROI: 18.5,
  marketGrowth: 12.3,
  hotAreas: ["DHA Phase 8", "Bahria Town Phase 7", "Gulberg III"],
  riskFactors: ["Interest Rate Changes", "Economic Policy", "Market Volatility"]
};

// Investment comparison data
const investmentOptions = [
  { name: "Real Estate", roi: 18, risk: "Medium", liquidity: "Low", minInvestment: 2000000 },
  { name: "Stock Market", roi: 12, risk: "High", liquidity: "High", minInvestment: 50000 },
  { name: "Gold", roi: 8, risk: "Low", liquidity: "Medium", minInvestment: 100000 },
  { name: "Savings Account", roi: 3, risk: "Very Low", liquidity: "Very High", minInvestment: 1000 }
];

const InvestorAITools: React.FC = () => {
  // Enhanced state management
  const [investment, setInvestment] = useState<string>("");
  const [propertyBudget, setPropertyBudget] = useState<string>("");
  const [analysis, setAnalysis] = useState<string>("");
  const [propertySuggestion, setPropertySuggestion] = useState<string>("");
  const [propertyRecommendations, setPropertyRecommendations] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("analyzer");
  const [timeframe, setTimeframe] = useState<string>("1");
  const [showComparison, setShowComparison] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);

  // Real-time ROI calculation
  useEffect(() => {
    if (investment && !isNaN(Number(investment)) && Number(investment) > 0) {
      const amount = Number(investment);
      const annualROI = amount * 0.18;
      const monthlyROI = annualROI / 12;
      const fiveYearROI = annualROI * 5;
      
      setAnalysis(`📊 Investment Analysis:
• Annual ROI: ${formatPKR(annualROI)} (18%)
• Monthly Return: ${formatPKR(monthlyROI)}
• 5-Year Projection: ${formatPKR(fiveYearROI)}
• Total Value After 5 Years: ${formatPKR(amount + fiveYearROI)}`);
    }
  }, [investment]);

  const handleAnalyze = () => {
    if (!investment || isNaN(Number(investment)) || Number(investment) <= 0) {
      setNotification({ type: "error", message: "Please enter a valid investment amount." });
      return;
    }
    setNotification({ type: "success", message: "Analysis completed successfully!" });
  };

  const handlePropertySearch = () => {
    if (!propertyBudget || Number(propertyBudget) <= 0) {
      setNotification({ type: "error", message: "Please enter a valid budget." });
      return;
    }
    const budget = Number(propertyBudget);
    const result = getPropertySuggestion(budget);
    setPropertySuggestion(result.suggestion);
    setPropertyRecommendations(result.properties);
    setNotification({ type: "success", message: "Property recommendations generated!" });
  };

  // Risk assessment with enhanced logic
  const getRiskAssessment = (amount: number) => {
    if (amount > 50000000) return { level: "Very High", color: "text-red-600 bg-red-100/80 border-red-400", description: "High-value investments require careful planning" };
    if (amount > 20000000) return { level: "High", color: "text-orange-600 bg-orange-100/80 border-orange-400", description: "Consider diversification strategies" };
    if (amount > 5000000) return { level: "Medium", color: "text-yellow-600 bg-yellow-100/80 border-yellow-400", description: "Moderate risk with good potential returns" };
    if (amount > 1000000) return { level: "Low", color: "text-green-600 bg-green-100/80 border-green-400", description: "Conservative investment with steady returns" };
    return { level: "Very Low", color: "text-blue-600 bg-blue-100/80 border-blue-400", description: "Safe investment for beginners" };
  };

  const riskAssessment = getRiskAssessment(Number(investment) || 0);

  // Calculate projected returns for different timeframes
  const calculateProjectedReturns = (amount: number, years: number) => {
    const annualReturn = amount * 0.18;
    return Array.from({ length: years }, (_, i) => ({
      year: i + 1,
      investment: amount,
      return: annualReturn * (i + 1),
      total: amount + (annualReturn * (i + 1))
    }));
  };

  const projectedReturns = calculateProjectedReturns(Number(investment) || 0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-card text-foreground px-2 py-6 md:px-8 lg:px-24 font-sans">
      {/* Header */}
      <motion.div 
        className="mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight bg-gradient-to-r from-primary via-electric-violet to-neon-cyan bg-clip-text text-transparent drop-shadow-lg">
          🤖 SAIR AI Tools for Smart Investors
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
          Unlock smarter investment decisions with our suite of AI-powered tools designed for the modern investor.
        </p>
      </motion.div>

      {/* Notification System */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
              notification.type === "success" 
                ? "bg-green-500 text-white" 
                : "bg-red-500 text-white"
            }`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Tabs */}
      <div className="flex justify-center mb-8">
        <div className="glass-card p-2 rounded-xl shadow-xl border border-primary/30 bg-background/80">
          <div className="flex space-x-2">
            {[
              { id: "analyzer", label: "Investment Analyzer", icon: "📊" },
              { id: "property", label: "Property Finder", icon: "🏠" },
              { id: "market", label: "Market Analysis", icon: "📈" },
              { id: "comparison", label: "Compare Investments", icon: "⚖️" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedTab === tab.id
                    ? "bg-gradient-to-r from-primary to-neon-cyan text-white shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {selectedTab === "analyzer" && (
          <motion.div
            key="analyzer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* Investment Analyzer */}
            <div className="bg-card rounded-2xl shadow-xl p-7 flex flex-col items-center hover:shadow-2xl transition-all border border-primary/20">
              <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">📊 Investment Analyzer</h2>
              <input
                type="number"
                min="0"
                aria-label="Investment amount in PKR"
                className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-3 bg-background text-foreground text-lg transition-all focus:border-neon-cyan focus:ring-neon-cyan"
                placeholder="Enter amount (PKR)"
                value={investment}
                onChange={e => setInvestment(e.target.value)}
              />
              <button
                className="w-full bg-gradient-to-r from-primary via-electric-violet to-neon-cyan text-white font-semibold py-2 rounded-lg hover:scale-105 hover:from-neon-cyan hover:to-electric-violet transition-all shadow-md mb-2 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                onClick={handleAnalyze}
              >
                Analyze Investment
              </button>
              {analysis && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 text-sm text-foreground bg-muted rounded-lg p-4 w-full whitespace-pre-line"
                >
                  {analysis}
                </motion.div>
              )}
            </div>

            {/* Risk Meter */}
            <div className="bg-card rounded-2xl shadow-xl p-7 flex flex-col items-center justify-center hover:shadow-2xl transition-all border border-primary/20">
              <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">🛡️ Risk Assessment</h2>
              <div className="w-full flex flex-col items-center">
                <motion.span 
                  className={`text-lg font-semibold px-6 py-3 rounded-full shadow-inner border-2 ${riskAssessment.color} transition-colors duration-300 mb-2 text-center`}
                  style={{minWidth: 160}}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Risk Level: {riskAssessment.level}
                </motion.span>
                <span className="text-xs text-muted-foreground text-center">{riskAssessment.description}</span>
              </div>
            </div>

            {/* Projected Returns Chart */}
            <div className="bg-card rounded-2xl shadow-xl p-7 flex flex-col items-center hover:shadow-2xl transition-all border border-primary/20">
              <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">📈 5-Year Projection</h2>
              <div className="w-full space-y-2">
                {projectedReturns.map((projection, index) => (
                  <motion.div
                    key={projection.year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-muted rounded-lg p-3 text-sm"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Year {projection.year}</span>
                      <span className="text-primary font-bold">{formatPKR(projection.total)}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Return: {formatPKR(projection.return)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {selectedTab === "property" && (
          <motion.div
            key="property"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {/* Property Finder */}
            <div className="bg-card rounded-2xl shadow-xl p-7 flex flex-col items-center hover:shadow-2xl transition-all border border-primary/20">
              <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">🏠 Property Finder</h2>
              <input
                type="number"
                min="0"
                aria-label="Budget in PKR"
                className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-3 bg-background text-foreground text-lg transition-all focus:border-neon-cyan focus:ring-neon-cyan"
                placeholder="Enter your budget (PKR)"
                value={propertyBudget}
                onChange={e => setPropertyBudget(e.target.value)}
              />
              <button
                className="w-full bg-gradient-to-r from-primary via-electric-violet to-neon-cyan text-white font-semibold py-2 rounded-lg hover:scale-105 hover:from-neon-cyan hover:to-electric-violet transition-all shadow-md mb-2 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                onClick={handlePropertySearch}
              >
                Find Properties
              </button>
              {propertySuggestion && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 text-sm text-foreground bg-muted rounded-lg p-4 w-full"
                >
                  {propertySuggestion}
                </motion.div>
              )}
            </div>

            {/* Property Recommendations */}
            <div className="bg-card rounded-2xl shadow-xl p-7 hover:shadow-2xl transition-all border border-primary/20">
              <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">💡 Recommendations</h2>
              <div className="space-y-4">
                {propertyRecommendations.map((property, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-muted rounded-lg p-4 hover:bg-muted/80 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-primary">{property.name}</h3>
                      <span className="text-sm font-bold text-neon-cyan">{property.price}</span>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>📍 {property.location}</div>
                      <div>🏢 {property.type}</div>
                      <div className="text-primary font-semibold">📈 ROI: {property.roi}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {selectedTab === "market" && (
          <motion.div
            key="market"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* Market Trend */}
            <div className="bg-card rounded-2xl shadow-xl p-7 flex flex-col items-center hover:shadow-2xl transition-all border border-primary/20">
              <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">📈 Market Trend</h2>
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${
                  marketData.currentTrend === "Bullish" ? "text-green-500" : "text-red-500"
                }`}>
                  {marketData.currentTrend}
                </div>
                <div className="text-sm text-muted-foreground">
                  Current market sentiment
                </div>
              </div>
            </div>

            {/* Average ROI */}
            <div className="bg-card rounded-2xl shadow-xl p-7 flex flex-col items-center hover:shadow-2xl transition-all border border-primary/20">
              <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">💰 Average ROI</h2>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 text-neon-cyan">
                  {marketData.avgROI}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Annual return on investment
                </div>
              </div>
            </div>

            {/* Market Growth */}
            <div className="bg-card rounded-2xl shadow-xl p-7 flex flex-col items-center hover:shadow-2xl transition-all border border-primary/20">
              <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">📊 Market Growth</h2>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 text-electric-violet">
                  +{marketData.marketGrowth}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Year-over-year growth
                </div>
              </div>
            </div>

            {/* Hot Areas */}
            <div className="bg-card rounded-2xl shadow-xl p-7 hover:shadow-2xl transition-all border border-primary/20 md:col-span-2">
              <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">🔥 Hot Investment Areas</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {marketData.hotAreas.map((area, index) => (
                  <motion.div
                    key={area}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-muted rounded-lg p-4 text-center hover:bg-muted/80 transition-colors"
                  >
                    <div className="text-lg font-semibold text-primary">{area}</div>
                    <div className="text-sm text-muted-foreground">High demand area</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Risk Factors */}
            <div className="bg-card rounded-2xl shadow-xl p-7 hover:shadow-2xl transition-all border border-primary/20">
              <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">⚠️ Risk Factors</h2>
              <div className="space-y-3">
                {marketData.riskFactors.map((factor, index) => (
                  <motion.div
                    key={factor}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    {factor}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {selectedTab === "comparison" && (
          <motion.div
            key="comparison"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Investment Comparison Table */}
            <div className="bg-card rounded-2xl shadow-xl p-7 hover:shadow-2xl transition-all border border-primary/20">
              <h2 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">⚖️ Investment Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-muted">
                      <th className="text-left p-3 font-semibold">Investment Type</th>
                      <th className="text-left p-3 font-semibold">Expected ROI</th>
                      <th className="text-left p-3 font-semibold">Risk Level</th>
                      <th className="text-left p-3 font-semibold">Liquidity</th>
                      <th className="text-left p-3 font-semibold">Min Investment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investmentOptions.map((option, index) => (
                      <motion.tr
                        key={option.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-muted/50 hover:bg-muted/50 transition-colors"
                      >
                        <td className="p-3 font-medium">{option.name}</td>
                        <td className="p-3 text-neon-cyan font-semibold">{option.roi}%</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            option.risk === "Very Low" ? "bg-green-100 text-green-700" :
                            option.risk === "Low" ? "bg-blue-100 text-blue-700" :
                            option.risk === "Medium" ? "bg-yellow-100 text-yellow-700" :
                            "bg-red-100 text-red-700"
                          }`}>
                            {option.risk}
                          </span>
                        </td>
                        <td className="p-3 text-sm">{option.liquidity}</td>
                        <td className="p-3 text-sm">{formatPKR(option.minInvestment)}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Investment Calculator */}
            <div className="bg-card rounded-2xl shadow-xl p-7 hover:shadow-2xl transition-all border border-primary/20">
              <h2 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">🧮 Investment Calculator</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Investment Amount</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                    placeholder="Enter amount"
                    value={investment}
                    onChange={e => setInvestment(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Time Period (Years)</label>
                  <select
                    className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                    value={timeframe}
                    onChange={e => setTimeframe(e.target.value)}
                  >
                    <option value="1">1 Year</option>
                    <option value="3">3 Years</option>
                    <option value="5">5 Years</option>
                    <option value="10">10 Years</option>
                  </select>
                </div>
              </div>
              
              {investment && Number(investment) > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {investmentOptions.map((option, index) => {
                    const amount = Number(investment);
                    const years = Number(timeframe);
                    const totalReturn = amount * (option.roi / 100) * years;
                    const totalValue = amount + totalReturn;
                    
                    return (
                      <div key={option.name} className="bg-muted rounded-lg p-4 text-center">
                        <div className="text-sm font-medium text-primary mb-2">{option.name}</div>
                        <div className="text-lg font-bold text-neon-cyan">{formatPKR(totalValue)}</div>
                        <div className="text-xs text-muted-foreground">Total after {years} year{years > 1 ? 's' : ''}</div>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Actions */}
      <motion.div 
        className="mt-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="glass-card p-6 rounded-2xl shadow-xl border border-primary/30 bg-background/80">
          <h3 className="text-2xl font-bold mb-4 text-primary">🚀 Ready to Invest?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-gradient-to-r from-primary to-neon-cyan text-white font-semibold px-6 py-3 rounded-lg hover:scale-105 transition-all shadow-lg">
              Get Expert Consultation
            </button>
            <button className="bg-gradient-to-r from-electric-violet to-primary text-white font-semibold px-6 py-3 rounded-lg hover:scale-105 transition-all shadow-lg">
              View Available Properties
            </button>
            <button className="bg-gradient-to-r from-neon-cyan to-electric-violet text-white font-semibold px-6 py-3 rounded-lg hover:scale-105 transition-all shadow-lg">
              Download Investment Guide
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InvestorAITools;
