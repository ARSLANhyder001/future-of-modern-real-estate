import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, AlertCircle, Bell, Eye, DollarSign, Calendar, Target, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatsGrid from "@/components/common/stats-grid";
import DashboardWidget from "@/components/common/dashboard-widget";
import InteractiveCharts from "@/components/common/interactive-charts";
import { mockRecentTransactions } from "@/lib/mock-data";
import type { DashboardStats } from "@/lib/mock-data";
import type { Project } from "@shared/schema";
import LoadingSpinner, { DashboardLoading } from "@/components/common/loading-spinner";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [notificationCount, setNotificationCount] = useState(3);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Set document title for SEO
  useEffect(() => {
    document.title = "Investor Dashboard | SAIR REIT";
  }, []);

  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  // Interactive charts data (memoized for performance)
  const portfolioData = [
    { name: 'Dubai Marina', value: 35, color: '#22d3ee' },
    { name: 'Singapore Hub', value: 25, color: '#9333ea' },
    { name: 'London Tech', value: 20, color: '#10b981' },
    { name: 'Other Projects', value: 20, color: '#64748b' },
  ];

  const performanceData = [
    { month: 'Jan', returns: 8.2, investment: 45000 },
    { month: 'Feb', returns: 9.1, investment: 52000 },
    { month: 'Mar', returns: 10.5, investment: 58000 },
    { month: 'Apr', returns: 11.8, investment: 64000 },
    { month: 'May', returns: 12.3, investment: 71000 },
    { month: 'Jun', returns: 13.1, investment: 78000 },
  ];

  const projectData = projects.map((project) => ({
    name: project.title ? project.title.split(' ').slice(0, 2).join(' ') : 'Project',
    funded: project.currentAmount || 0,
    target: project.targetAmount || 0,
    roi: project.roi ? parseFloat(project.roi) : 0,
  }));

  const quickActions = [
    { icon: Eye, label: "View Portfolio", action: () => window.location.href = '/projects' },
    { icon: DollarSign, label: "Invest Now", action: () => window.location.href = '/projects' },
    { icon: Calendar, label: "Schedule Call", action: () => window.open('mailto:contact@sairreit.com', '_blank') },
    { icon: Target, label: "Set Goals", action: () => window.location.href = '/investor-ai-tools' },
  ];

  const achievements = [
    { icon: Award, title: "Top Performer", description: "Consistent returns above market average", color: "text-light-mint" },
    { icon: TrendingUp, title: "Growth Champion", description: "Portfolio growth of 35% this year", color: "text-neon-cyan" },
    { icon: Target, title: "Goal Achiever", description: "Reached 3 out of 5 investment goals", color: "text-electric-violet" },
  ];

  if (isLoading || !stats) {
    return <DashboardLoading />;
  }

  return (
    <>
      {/* Skip to content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 bg-neon-cyan text-navy px-4 py-2 rounded z-50">
        Skip to main content
      </a>
      
      <div className="min-h-screen bg-gradient-to-br from-navy via-background to-card py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <motion.div
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 lg:mb-0">
              <motion.h1 
                className="font-orbitron font-bold text-4xl md:text-5xl glow-text mb-4" 
                id="main-content" 
                tabIndex={-1} 
                aria-label="Investor Dashboard"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Investor Dashboard
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Track your investments and monitor real-time performance
              </motion.p>
            </div>
            
            {/* Enhanced Notification System */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button
                className="relative p-3 glass-card rounded-xl hover:scale-105 transition-all duration-300 group"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                aria-label="Notifications"
              >
                <Bell className="w-8 h-8 text-neon-cyan group-hover:text-electric-violet transition-colors" />
                {notificationCount > 0 && (
                  <motion.span 
                    className="absolute -top-1 -right-1 w-6 h-6 bg-electric-violet rounded-full flex items-center justify-center text-xs font-bold text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    {notificationCount}
                  </motion.span>
                )}
              </button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    className="absolute right-0 top-full mt-2 w-80 glass-card rounded-xl p-4 z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="font-semibold text-white mb-3">Recent Notifications</h4>
                    <div className="space-y-3">
                      <div className="p-3 border border-neon-cyan/20 rounded-lg">
                        <p className="text-sm text-gray-300">New dividend payment processed</p>
                        <p className="text-xs text-neon-cyan">2 minutes ago</p>
                      </div>
                      <div className="p-3 border border-electric-violet/20 rounded-lg">
                        <p className="text-sm text-gray-300">Portfolio value increased by 2.3%</p>
                        <p className="text-xs text-electric-violet">1 hour ago</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="font-orbitron font-bold text-2xl mb-6 text-white">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.label}
                  className="glass-card p-4 rounded-xl hover:scale-105 transition-all duration-300 group border border-transparent hover:border-neon-cyan/30"
                  onClick={action.action}
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <action.icon className="w-8 h-8 text-neon-cyan group-hover:text-electric-violet transition-colors mx-auto mb-2" />
                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors text-center">
                    {action.label}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <StatsGrid stats={stats} />

          {/* Tab Navigation */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex space-x-1 glass-card p-1 rounded-xl w-fit">
              {["overview", "analytics", "performance"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 capitalize ${
                    activeTab === tab
                      ? "bg-neon-cyan text-navy shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Interactive Charts Section */}
                <div className="mb-12">
                  <motion.h2
                    className="font-orbitron font-bold text-2xl mb-8 text-center text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Analytics & Performance
                  </motion.h2>
                  <InteractiveCharts 
                    portfolioData={portfolioData}
                    performanceData={performanceData}
                    projectData={projectData}
                  />
                </div>

                {/* Performance Metrics Summary */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <motion.div 
                    className="glass-card p-6 rounded-xl hover:scale-105 transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="font-orbitron font-bold text-xl mb-6 text-white flex items-center">
                      <TrendingUp className="w-6 h-6 text-light-mint mr-3" />
                      Performance Metrics
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Total Return</span>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-light-mint" />
                          <span className="font-semibold text-light-mint">+24.5%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Average ROI</span>
                        <span className="font-semibold text-white">{stats.avgROI || '0.0'}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Risk Score</span>
                        <Badge className="bg-light-mint text-navy">Low</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Diversification</span>
                        <Badge className="bg-neon-cyan text-navy">Excellent</Badge>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="glass-card p-6 rounded-xl hover:scale-105 transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="font-orbitron font-bold text-xl mb-6 text-white flex items-center">
                      <Target className="w-6 h-6 text-electric-violet mr-3" />
                      Market Insights
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Market Trend</span>
                        <Badge className="bg-light-mint text-navy">Bullish</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Sector Performance</span>
                        <span className="font-semibold text-white">+18.2%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Next Dividend</span>
                        <span className="font-semibold text-neon-cyan">Dec 15, 2024</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Portfolio Score</span>
                        <span className="font-semibold text-electric-violet">9.2/10</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Achievements Section */}
                <motion.div
                  className="mb-12"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <h3 className="font-orbitron font-bold text-2xl mb-6 text-white">Your Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.title}
                        className="glass-card p-6 rounded-xl hover:scale-105 transition-all duration-300"
                        whileHover={{ y: -5, rotateY: 5 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                      >
                        <achievement.icon className={`w-12 h-12 ${achievement.color} mb-4`} />
                        <h4 className="font-semibold text-white mb-2">{achievement.title}</h4>
                        <p className="text-gray-300 text-sm">{achievement.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <InteractiveCharts 
                  portfolioData={portfolioData}
                  performanceData={performanceData}
                  projectData={projectData}
                />
              </motion.div>
            )}

            {activeTab === "performance" && (
              <motion.div
                key="performance"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <DashboardWidget transactions={mockRecentTransactions} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recent Transactions */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <DashboardWidget transactions={mockRecentTransactions} />
            </motion.div>
          )}

          {/* Enhanced Alerts & Notifications */}
          <motion.div
            className="mt-12 glass-card p-6 rounded-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <AlertCircle className="w-6 h-6 text-electric-violet" />
              <h3 className="font-orbitron font-bold text-xl text-white">
                Recent Alerts
              </h3>
            </div>
            <div className="space-y-4">
              <motion.div 
                className="p-4 border border-light-mint/20 rounded-lg hover:scale-105 transition-all duration-300"
                whileHover={{ x: 5 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Dubai Marina Tower - Dividend Payment
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Your monthly dividend of $625 has been processed and will arrive in 2-3 business days.
                    </p>
                  </div>
                  <Badge className="bg-light-mint text-navy">New</Badge>
                </div>
              </motion.div>
              
              <motion.div 
                className="p-4 border border-neon-cyan/20 rounded-lg hover:scale-105 transition-all duration-300"
                whileHover={{ x: 5 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      New Project Available - Miami Beach Resort
                    </h4>
                    <p className="text-gray-300 text-sm">
                      A new luxury resort project with 15.2% projected ROI is now available for investment.
                    </p>
                  </div>
                  <Badge className="bg-neon-cyan text-navy">Opportunity</Badge>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
