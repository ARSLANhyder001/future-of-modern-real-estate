import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  MessageCircle, 
  Search, 
  BookOpen, 
  GraduationCap, 
  Shield, 
  TrendingUp, 
  Users, 
  Globe, 
  Calculator,
  ArrowRight,
  Star,
  Clock,
  Target,
  Award,
  Zap,
  CheckCircle,
  Play,
  Download,
  Share2,
  Heart
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { faqData } from "@/lib/mock-data";
import GlowingButton from "@/components/common/glowing-button";

// Type definitions
interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

// Enhanced FAQ data with categories
const enhancedFaqData: FAQItem[] = [
  ...faqData.map(item => ({ ...item, category: undefined })),
  {
    id: 5,
    category: "investment",
    question: "How do I start investing with SAIR REIT?",
    answer: "Getting started is simple! Create an account, complete KYC verification, browse available projects, and invest with as little as $1,000. Our platform guides you through every step with educational resources and expert support."
  },
  {
    id: 6,
    category: "investment",
    question: "What types of properties does SAIR REIT invest in?",
    answer: "We invest in premium real estate including residential apartments, commercial properties, retail spaces, and mixed-use developments across Dubai, Singapore, London, and other global markets."
  },
  {
    id: 7,
    category: "security",
    question: "How secure is my investment?",
    answer: "Your investments are protected by blockchain technology, smart contracts, and comprehensive insurance. We maintain strict security protocols and regular audits to ensure the safety of your funds."
  },
  {
    id: 8,
    category: "returns",
    question: "What returns can I expect?",
    answer: "Historical returns average 18.5% annually, combining rental income and property appreciation. Returns vary by project and market conditions, with detailed projections provided for each investment opportunity."
  },
  {
    id: 9,
    category: "technology",
    question: "How does the AI technology work?",
    answer: "Our AI platform analyzes market trends, property performance, and economic indicators to identify the best investment opportunities. It also provides real-time portfolio insights and automated risk management."
  },
  {
    id: 10,
    category: "compliance",
    question: "What regulatory compliance do you maintain?",
    answer: "SAIR REIT operates under strict regulatory oversight, maintaining compliance with international financial regulations, Sharia law requirements, and local real estate laws in all markets we operate."
  }
];

// Educational content
const educationalContent = {
  guides: [
    {
      id: 1,
      title: "Getting Started with REIT Investing",
      description: "Learn the basics of real estate investment trusts and how to build your first portfolio.",
      duration: "15 min read",
      level: "Beginner",
      icon: <BookOpen className="w-6 h-6" />,
      color: "text-blue-400"
    },
    {
      id: 2,
      title: "Understanding Sharia-Compliant Finance",
      description: "Deep dive into Islamic finance principles and how they apply to real estate investment.",
      duration: "20 min read",
      level: "Intermediate",
      icon: <Shield className="w-6 h-6" />,
      color: "text-green-400"
    },
    {
      id: 3,
      title: "Risk Management Strategies",
      description: "Master the art of managing investment risks in real estate markets.",
      duration: "25 min read",
      level: "Advanced",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-purple-400"
    },
    {
      id: 4,
      title: "AI in Real Estate Investment",
      description: "Discover how artificial intelligence is revolutionizing property investment decisions.",
      duration: "18 min read",
      level: "Intermediate",
      icon: <Zap className="w-6 h-6" />,
      color: "text-yellow-400"
    }
  ],
  videos: [
    {
      id: 1,
      title: "Platform Walkthrough",
      duration: "8:32",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
      views: "2.4K"
    },
    {
      id: 2,
      title: "Investment Analysis Tools",
      duration: "12:15",
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
      views: "1.8K"
    },
    {
      id: 3,
      title: "Portfolio Management",
      duration: "10:45",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
      views: "3.1K"
    }
  ]
};

const categories = [
  { id: "all", label: "All Questions", icon: <Globe className="w-4 h-4" /> },
  { id: "investment", label: "Investment", icon: <TrendingUp className="w-4 h-4" /> },
  { id: "security", label: "Security", icon: <Shield className="w-4 h-4" /> },
  { id: "returns", label: "Returns", icon: <Target className="w-4 h-4" /> },
  { id: "technology", label: "Technology", icon: <Zap className="w-4 h-4" /> },
  { id: "compliance", label: "Compliance", icon: <Award className="w-4 h-4" /> }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("faq");

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Filter FAQ data based on search and category
  const filteredFaqData = useMemo(() => {
    return enhancedFaqData.filter(item => {
      const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen py-20 px-6 relative">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-electric-violet rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-light-mint rounded-full animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-orbitron font-bold text-4xl md:text-6xl mb-6 glow-text">
            Education Center
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Master the art of Sharia-compliant real estate investment with our comprehensive educational resources, 
            expert guides, and interactive tools.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { label: "Educational Guides", value: "25+", icon: <BookOpen className="w-5 h-5" />, color: "text-blue-400" },
            { label: "Video Tutorials", value: "15+", icon: <Play className="w-5 h-5" />, color: "text-green-400" },
            { label: "Expert Advisors", value: "12", icon: <Users className="w-5 h-5" />, color: "text-yellow-400" },
            { label: "Success Rate", value: "98%", icon: <Star className="w-5 h-5" />, color: "text-purple-400" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card p-4 rounded-xl border border-primary/20 hover:border-neon-cyan/50 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className={`flex items-center justify-center mb-2 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gray-400 text-center">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="glass-card p-2 rounded-xl shadow-xl border border-primary/30 bg-background/80">
            <div className="flex space-x-2">
              {[
                { id: "faq", label: "FAQ", icon: "❓" },
                { id: "guides", label: "Guides", icon: "📚" },
                { id: "videos", label: "Videos", icon: "🎥" },
                { id: "tools", label: "Tools", icon: "🛠️" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
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
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "faq" && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Search and Filters */}
              <motion.div
                className="glass-card p-6 rounded-2xl border border-primary/20 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                  <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search questions and answers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 glass-card border-gray-600 focus:border-neon-cyan bg-background/50"
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                        className="flex items-center gap-2"
                      >
                        {category.icon}
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* FAQ Results */}
              <AnimatePresence mode="wait">
                {filteredFaqData.length === 0 ? (
                  <motion.div
                    key="no-results"
                    className="text-center py-20"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                  >
                    <div className="glass-card p-12 rounded-2xl border border-primary/20 max-w-md mx-auto">
                      <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">No questions found</h3>
                      <p className="text-gray-400 mb-4">
                        Try adjusting your search criteria or browse all categories.
                      </p>
                      <Button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("all");
                        }}
                        className="bg-gradient-to-r from-neon-cyan to-electric-violet"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="faq-list"
                    className="space-y-6 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {filteredFaqData.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="glass-card rounded-xl overflow-hidden border border-primary/20 hover:border-neon-cyan/50 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        whileHover={{ y: -2 }}
                      >
                        <button
                          className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-800/30 transition-colors duration-200"
                          onClick={() => toggleItem(item.id)}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-semibold text-lg pr-4">{item.question}</span>
                              {item.category && (
                                <Badge variant="secondary" className="text-xs">
                                  {item.category}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <motion.div
                            animate={{ rotate: openItems.includes(item.id) ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-6 h-6 flex-shrink-0 text-neon-cyan" />
                          </motion.div>
                        </button>
                        
                        <AnimatePresence>
                          {openItems.includes(item.id) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-8 pb-6">
                                <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-primary/20">
                                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                    <Heart className="w-4 h-4 mr-2" />
                                    Helpful
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === "guides" && (
            <motion.div
              key="guides"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {educationalContent.guides.map((guide, index) => (
                  <motion.div
                    key={guide.id}
                    className="glass-card p-6 rounded-xl border border-primary/20 hover:border-neon-cyan/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className={`flex items-center gap-3 mb-4 ${guide.color}`}>
                      {guide.icon}
                      <Badge variant="secondary" className="text-xs">
                        {guide.level}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg text-white mb-2">{guide.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{guide.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {guide.duration}
                      </span>
                      <Button size="sm" className="bg-gradient-to-r from-neon-cyan to-electric-violet">
                        Read Guide
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "videos" && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {educationalContent.videos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    className="glass-card rounded-xl overflow-hidden border border-primary/20 hover:border-neon-cyan/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Button className="rounded-full w-12 h-12 p-0 bg-white/20 hover:bg-white/30">
                          <Play className="w-6 h-6 text-white ml-1" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-2">{video.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>{video.views} views</span>
                        <Button size="sm" variant="ghost">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "tools" && (
            <motion.div
              key="tools"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "ROI Calculator",
                    description: "Calculate potential returns on your investments",
                    icon: <Calculator className="w-8 h-8" />,
                    color: "text-blue-400"
                  },
                  {
                    title: "Portfolio Analyzer",
                    description: "Analyze your investment portfolio performance",
                    icon: <TrendingUp className="w-8 h-8" />,
                    color: "text-green-400"
                  },
                  {
                    title: "Risk Assessment",
                    description: "Evaluate investment risks and opportunities",
                    icon: <Shield className="w-8 h-8" />,
                    color: "text-yellow-400"
                  },
                  {
                    title: "Market Insights",
                    description: "Get real-time market data and trends",
                    icon: <Globe className="w-8 h-8" />,
                    color: "text-purple-400"
                  },
                  {
                    title: "Investment Planner",
                    description: "Plan your investment strategy",
                    icon: <Target className="w-8 h-8" />,
                    color: "text-red-400"
                  },
                  {
                    title: "Tax Calculator",
                    description: "Calculate tax implications of your investments",
                    icon: <Award className="w-8 h-8" />,
                    color: "text-cyan-400"
                  }
                ].map((tool, index) => (
                  <motion.div
                    key={tool.title}
                    className="glass-card p-6 rounded-xl border border-primary/20 hover:border-neon-cyan/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className={`flex items-center gap-3 mb-4 ${tool.color}`}>
                      {tool.icon}
                    </div>
                    <h3 className="font-semibold text-lg text-white mb-2">{tool.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{tool.description}</p>
                    <Button className="w-full bg-gradient-to-r from-neon-cyan to-electric-violet">
                      Launch Tool
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Section */}
        <motion.div
          className="glass-card p-8 rounded-2xl text-center mt-16 border border-primary/20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <MessageCircle className="w-16 h-16 text-neon-cyan mx-auto mb-6" />
          <h3 className="font-orbitron font-bold text-2xl mb-4 text-white">
            Need Personalized Guidance?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Our investment advisors are here to help. Get personalized answers to your questions 
            about Sharia-compliant real estate investing and portfolio optimization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlowingButton variant="primary" className="group">
              Schedule a Call
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </GlowingButton>
            <GlowingButton variant="outline">
              Email Support
            </GlowingButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
