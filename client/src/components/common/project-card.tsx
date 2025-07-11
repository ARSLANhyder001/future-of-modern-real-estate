import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  TrendingUp, 
  MapPin, 
  Users, 
  Calendar, 
  DollarSign, 
  Eye, 
  Heart, 
  Share2,
  ArrowRight,
  Star,
  Clock,
  Target
} from "lucide-react";
import { useState } from "react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

export default function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const progressPercentage = ((project.currentAmount || 0) / project.targetAmount) * 100;
  
  const statusColors = {
    ACTIVE: { bg: "bg-light-mint", text: "text-navy", border: "border-light-mint" },
    FUNDING: { bg: "bg-electric-violet", text: "text-white", border: "border-electric-violet" },
    COMPLETE: { bg: "bg-neon-cyan", text: "text-navy", border: "border-neon-cyan" },
    // Default fallback for any other status
    DEFAULT: { bg: "bg-gray-500", text: "text-white", border: "border-gray-500" },
  };

  const statusConfig = statusColors[project.status as keyof typeof statusColors] || statusColors.DEFAULT;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Mock data for enhanced features
  const projectStats = {
    investors: Math.floor(Math.random() * 150) + 50,
    daysLeft: Math.floor(Math.random() * 30) + 5,
    rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
    views: Math.floor(Math.random() * 5000) + 1000,
  };

  const getROIColor = (roi: number) => {
    if (roi >= 20) return "text-green-400";
    if (roi >= 15) return "text-yellow-400";
    return "text-blue-400";
  };

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ y: -8 }}
    >
      <Card className="glass-card overflow-hidden border border-primary/20 hover:border-neon-cyan/50 transition-all duration-300 bg-background/80 backdrop-blur-sm">
        {/* Image Section */}
        <div className="relative h-56 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
             style={{ backgroundImage: `url(${project.imageUrl})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent"></div>
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <Badge className={`${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} font-semibold px-3 py-1`}>
              {project.status}
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <motion.button
              className="glass-card p-2 rounded-full border border-white/20 hover:border-neon-cyan/50 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'text-red-400 fill-red-400' : 'text-white'}`} />
            </motion.button>
            <motion.button
              className="glass-card p-2 rounded-full border border-white/20 hover:border-neon-cyan/50 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 className="w-4 h-4 text-white" />
            </motion.button>
          </div>

          {/* Quick Stats Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex justify-between items-center text-white text-sm">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{formatNumber(projectStats.investors)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{projectStats.daysLeft}d left</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>{projectStats.rating}</span>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Title and Location */}
          <div className="mb-4">
            <h3 className="font-orbitron font-bold text-xl mb-2 text-neon-cyan group-hover:text-electric-violet transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
              <MapPin className="w-4 h-4" />
              <span>Dubai, UAE</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-4 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* ROI and Progress */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-light-mint" />
                <span className={`text-2xl font-bold ${getROIColor(Number(project.roi))}`}>
                  {project.roi}% ROI
                </span>
              </div>
              <span className="text-sm text-gray-400 font-medium">
                {Math.round(progressPercentage)}% Funded
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="relative">
              <Progress 
                value={progressPercentage} 
                className="h-3 bg-muted/50"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-electric-violet/20 rounded-full"></div>
            </div>
          </div>

          {/* Investment Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="glass-card p-3 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-light-mint" />
                <span className="text-xs text-gray-400">Min Investment</span>
              </div>
              <span className="text-lg font-bold text-white">{formatCurrency(project.minInvestment)}</span>
            </div>
            <div className="glass-card p-3 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-electric-violet" />
                <span className="text-xs text-gray-400">Target</span>
              </div>
              <span className="text-lg font-bold text-white">{formatCurrency(project.targetAmount)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-gradient-to-r from-neon-cyan to-electric-violet hover:from-electric-violet hover:to-neon-cyan text-white font-semibold group/btn"
              onClick={() => setShowDetails(!showDetails)}
            >
              <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
              View Details
            </Button>
            <Button 
              variant="outline" 
              className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-navy font-semibold group/btn"
            >
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-4 pt-4 border-t border-primary/20">
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>🔥 {formatNumber(projectStats.views)} views today</span>
              <span>⭐ {projectStats.rating} rating</span>
            </div>
          </div>
        </CardContent>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-electric-violet/10 to-light-mint/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </Card>

      {/* Detailed View Modal (simplified) */}
      {showDetails && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowDetails(false)}
        >
          <motion.div
            className="glass-card max-w-2xl w-full p-6 rounded-2xl border border-neon-cyan/30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-orbitron font-bold text-2xl mb-4 text-neon-cyan">{project.title}</h2>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-sm text-gray-400">ROI</span>
                <div className="text-xl font-bold text-light-mint">{project.roi}%</div>
              </div>
              <div>
                <span className="text-sm text-gray-400">Min Investment</span>
                <div className="text-xl font-bold text-white">{formatCurrency(project.minInvestment)}</div>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-neon-cyan to-electric-violet">
              Invest Now
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
