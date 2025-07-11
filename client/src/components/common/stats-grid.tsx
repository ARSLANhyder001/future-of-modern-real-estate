import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Building2 } from "lucide-react";
import type { DashboardStats } from "@/lib/mock-data";

interface StatsGridProps {
  stats: DashboardStats;
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const statItems = [
    {
      title: "Total Invested",
      value: `$${(stats.totalInvested || 0).toLocaleString()}`,
      change: "+12.5% this month",
      icon: DollarSign,
      color: "neon-cyan",
      borderColor: "border-neon-cyan/30 hover:border-neon-cyan/60",
      iconBg: "text-neon-cyan",
      gradient: "from-neon-cyan/20 to-transparent",
      pulseColor: "bg-neon-cyan",
    },
    {
      title: "Monthly Returns",
      value: `$${(stats.monthlyReturns || 0).toLocaleString()}`,
      change: "+8.2% from last month",
      icon: TrendingUp,
      color: "electric-violet",
      borderColor: "border-electric-violet/30 hover:border-electric-violet/60",
      iconBg: "text-electric-violet",
      gradient: "from-electric-violet/20 to-transparent",
      pulseColor: "bg-electric-violet",
    },
    {
      title: "Active Projects",
      value: (stats.activeProjects || 0).toString(),
      change: "2 new this week",
      icon: Building2,
      color: "light-mint",
      borderColor: "border-light-mint/30 hover:border-light-mint/60",
      iconBg: "text-light-mint",
      gradient: "from-light-mint/20 to-transparent",
      pulseColor: "bg-light-mint",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {statItems.map((item, index) => (
        <motion.div
          key={item.title}
          className={`glass-card p-6 rounded-xl border transition-all duration-500 ${item.borderColor} relative overflow-hidden group`}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.1,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ 
            scale: 1.05, 
            y: -8,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Animated background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          {/* Pulse effect */}
          <div className={`absolute top-4 right-4 w-2 h-2 ${item.pulseColor} rounded-full animate-pulse opacity-60`} />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <motion.h3 
                className="font-semibold text-gray-300 group-hover:text-white transition-colors duration-300"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {item.title}
              </motion.h3>
              <motion.div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${item.color}/20 to-${item.color}/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <item.icon className={`w-6 h-6 ${item.iconBg} group-hover:scale-110 transition-transform duration-300`} />
              </motion.div>
            </div>
            
            <motion.p 
              className="text-3xl font-orbitron font-bold text-white mb-2 group-hover:text-4xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {item.value}
            </motion.p>
            
            <motion.p 
              className="text-light-mint text-sm group-hover:text-base transition-all duration-300"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              {item.change}
            </motion.p>
            
            {/* Progress indicator */}
            <motion.div 
              className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
            >
              <motion.div
                className={`h-full bg-gradient-to-r from-${item.color} to-${item.color}/60`}
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
              />
            </motion.div>
          </div>
          
          {/* Hover glow effect */}
          <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-${item.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
        </motion.div>
      ))}
    </div>
  );
}
