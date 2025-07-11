import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  TrendingUp, 
  MapPin, 
  DollarSign,
  Users,
  Calendar,
  Star,
  Eye,
  Heart,
  Share2,
  ArrowRight,
  Target,
  Clock,
  Award,
  Globe,
  Building2,
  Zap
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "@/components/common/project-card";
import { staggerContainer } from "@/lib/animations";
import type { Project } from "@shared/schema";

export default function Projects() {
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [roiFilter, setRoiFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");

  // Mock statistics
  const stats = [
    { label: "Total Projects", value: "24", icon: <Building2 className="w-5 h-5" />, color: "text-blue-400" },
    { label: "Active Investments", value: "18", icon: <TrendingUp className="w-5 h-5" />, color: "text-green-400" },
    { label: "Total Investors", value: "2,847", icon: <Users className="w-5 h-5" />, color: "text-yellow-400" },
    { label: "Avg ROI", value: "18.5%", icon: <Target className="w-5 h-5" />, color: "text-purple-400" },
  ];

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || project.status.toLowerCase() === statusFilter;
      
      const matchesLocation = locationFilter === "all"; // Add location logic when available
      
      const matchesROI = roiFilter === "all" || 
        (roiFilter === "10-12" && Number(project.roi) >= 10 && Number(project.roi) <= 12) ||
        (roiFilter === "12-15" && Number(project.roi) >= 12 && Number(project.roi) <= 15) ||
        (roiFilter === "15+" && Number(project.roi) >= 15);

      return matchesSearch && matchesStatus && matchesLocation && matchesROI;
    }).sort((a, b) => {
      switch (sortBy) {
        case "roi-high":
          return Number(b.roi) - Number(a.roi);
        case "roi-low":
          return Number(a.roi) - Number(b.roi);
        case "funding-high":
          return ((b.currentAmount ?? 0) / b.targetAmount) - ((a.currentAmount ?? 0) / a.targetAmount);
        case "funding-low":
          return ((a.currentAmount ?? 0) / a.targetAmount) - ((b.currentAmount ?? 0) / b.targetAmount);
        default:
          return 0;
      }
    });
  }, [projects, searchTerm, statusFilter, locationFilter, roiFilter, sortBy]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-cyan mx-auto mb-4"></div>
          <p className="text-gray-400">Loading projects...</p>
        </div>
      </div>
    );
  }

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
            Investment Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover premium real estate opportunities across global markets. 
            Each project is carefully vetted and Sharia-compliant.
          </p>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {stats.map((stat, index) => (
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

        {/* Advanced Filters */}
        <motion.div
          className="glass-card p-6 rounded-2xl border border-primary/20 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search projects by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-card border-gray-600 focus:border-neon-cyan bg-background/50"
              />
            </div>
            
            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-48 glass-card border-gray-600 bg-background/50">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="funding">Funding</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full lg:w-48 glass-card border-gray-600 bg-background/50">
                <MapPin className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="dubai">Dubai</SelectItem>
                <SelectItem value="singapore">Singapore</SelectItem>
                <SelectItem value="london">London</SelectItem>
              </SelectContent>
            </Select>

            {/* ROI Filter */}
            <Select value={roiFilter} onValueChange={setRoiFilter}>
              <SelectTrigger className="w-full lg:w-48 glass-card border-gray-600 bg-background/50">
                <TrendingUp className="w-4 h-4 mr-2" />
                <SelectValue placeholder="ROI Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All ROI</SelectItem>
                <SelectItem value="10-12">10-12%</SelectItem>
                <SelectItem value="12-15">12-15%</SelectItem>
                <SelectItem value="15+">15%+</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48 glass-card border-gray-600 bg-background/50">
                <Zap className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="roi-high">Highest ROI</SelectItem>
                <SelectItem value="roi-low">Lowest ROI</SelectItem>
                <SelectItem value="funding-high">Most Funded</SelectItem>
                <SelectItem value="funding-low">Least Funded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-primary/20">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">View Mode:</span>
              <div className="flex gap-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8 p-0"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8 p-0"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="text-sm text-gray-400">
              {filteredProjects.length} of {projects.length} projects
            </div>
          </div>
        </motion.div>

        {/* Results Summary */}
        {searchTerm || statusFilter !== "all" || locationFilter !== "all" || roiFilter !== "all" ? (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-400">Filters:</span>
              {searchTerm && (
                <Badge variant="secondary" className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30">
                  Search: "{searchTerm}"
                </Badge>
              )}
              {statusFilter !== "all" && (
                <Badge variant="secondary" className="bg-electric-violet/20 text-electric-violet border-electric-violet/30">
                  Status: {statusFilter}
                </Badge>
              )}
              {locationFilter !== "all" && (
                <Badge variant="secondary" className="bg-light-mint/20 text-light-mint border-light-mint/30">
                  Location: {locationFilter}
                </Badge>
              )}
              {roiFilter !== "all" && (
                <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                  ROI: {roiFilter}
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setLocationFilter("all");
                  setRoiFilter("all");
                }}
                className="text-gray-400 hover:text-white"
              >
                Clear All
              </Button>
            </div>
          </motion.div>
        ) : null}

        {/* Projects Grid/List */}
        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 ? (
            <motion.div
              key="no-results"
              className="text-center py-20"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
            >
              <div className="glass-card p-12 rounded-2xl border border-primary/20 max-w-md mx-auto">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
                <p className="text-gray-400 mb-4">
                  Try adjusting your search criteria or filters to find more projects.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setLocationFilter("all");
                    setRoiFilter("all");
                  }}
                  className="bg-gradient-to-r from-neon-cyan to-electric-violet"
                >
                  Clear Filters
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="projects-grid"
              className={viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
              }
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  delay={index * 0.1}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More */}
        {filteredProjects.length > 0 && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button className="glass-card px-8 py-4 rounded-xl font-semibold border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-navy transition-all duration-300 group">
              Load More Projects
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}

        {/* Quick Stats Footer */}
        <motion.div
          className="mt-20 pt-8 border-t border-primary/20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-cyan mb-2">100%</div>
              <div className="text-gray-400">Halal Certified</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-electric-violet mb-2">24/7</div>
              <div className="text-gray-400">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-light-mint mb-2">0%</div>
              <div className="text-gray-400">Hidden Fees</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
