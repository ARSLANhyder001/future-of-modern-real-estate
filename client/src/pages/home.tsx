import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, TrendingUp, Shield, Eye, ArrowRight, Star, Zap, Target, Users, Award, Globe, Rocket } from "lucide-react";
import GlowingButton from "@/components/common/glowing-button";
import FeatureIconCard from "@/components/common/feature-icon-card";
import ProjectCard from "@/components/common/project-card";
import { customProjects } from "@/lib/custom-projects";
import TestimonialSlider from "@/components/common/testimonial-slider";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SEOMeta, { SEOConfigs } from "@/components/common/seo-meta";
import type { Project, Testimonial } from "@shared/schema";

export default function Home() {
  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const features = [
    {
      icon: <DollarSign className="w-8 h-8 text-white" />,
      title: "Halal Income",
      description: "Sharia-compliant investments ensuring your wealth grows through ethical means.",
      iconColor: "cyan" as const,
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      title: "Asset-Backed ROI",
      description: "Real estate assets providing tangible value and consistent returns.",
      iconColor: "violet" as const,
      gradient: "from-violet-500 to-purple-600",
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "Transparent Sharing",
      description: "Complete transparency in profit distribution and investment allocation.",
      iconColor: "mint" as const,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: <Eye className="w-8 h-8 text-white" />,
      title: "Real-Time Tracking",
      description: "Monitor your investments with live updates and detailed analytics.",
      iconColor: "cyan" as const,
      gradient: "from-blue-500 to-cyan-600",
    },
  ];

  const stats = [
    { label: "Total Investors", value: "2,847", icon: <Users className="w-6 h-6" />, color: "text-blue-400" },
    { label: "Properties Owned", value: "156", icon: <Globe className="w-6 h-6" />, color: "text-green-400" },
    { label: "Average ROI", value: "18.5%", icon: <TrendingUp className="w-6 h-6" />, color: "text-yellow-400" },
    { label: "Years Experience", value: "8+", icon: <Award className="w-6 h-6" />, color: "text-purple-400" },
  ];

  const achievements = [
    { title: "Best REIT Platform 2024", description: "Awarded by Financial Times", icon: <Star className="w-5 h-5" /> },
    { title: "100% Halal Certified", description: "Sharia compliance verified", icon: <Shield className="w-5 h-5" /> },
    { title: "24/7 Support", description: "Round-the-clock assistance", icon: <Zap className="w-5 h-5" /> },
    { title: "Zero Hidden Fees", description: "Complete transparency", icon: <Target className="w-5 h-5" /> },
  ];

  return (
    <>
      <SEOMeta {...SEOConfigs.home} />
      <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-electric-violet rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-light-mint rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-neon-cyan rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-electric-violet rounded-full animate-ping"></div>
      </div>

      {/* Hero Section */}
      <section className="hero-bg min-h-screen flex items-center justify-center px-6 relative">
        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-neon-cyan/20 to-electric-violet/20 rounded-full blur-xl"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-electric-violet/20 to-light-mint/20 rounded-full blur-xl"
          animate={{ 
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <motion.div
          className="max-w-6xl mx-auto text-center relative z-10"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-neon-cyan/20 to-electric-violet/20 px-4 py-2 rounded-full mb-8 border border-neon-cyan/30"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Rocket className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm font-medium text-neon-cyan">Next-Gen REIT Platform</span>
          </motion.div>

          <motion.h1
            className="font-orbitron font-black text-5xl md:text-7xl mb-6 glow-text leading-tight"
            variants={fadeInUp}
          >
            Invest in Real Assets.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-electric-violet to-light-mint animate-gradient">
              Level Up Your Wealth.
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Next-gen REIT for halal, asset-backed growth. Experience the future of digital real estate investment with AI-powered insights and blockchain transparency.
          </motion.p>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass-card p-4 rounded-xl border border-primary/20 hover:border-neon-cyan/50 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
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
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            variants={fadeInUp}
          >
            <GlowingButton variant="primary" size="lg" className="group">
              Explore Projects
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </GlowingButton>
            <GlowingButton variant="outline" size="lg">
              Create Account
            </GlowingButton>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-4 glow-text">
              Why Choose SAIR REIT?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the future of real estate investment with cutting-edge technology and ethical practices.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <FeatureIconCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  iconColor={feature.iconColor}
                  delay={index * 0.1}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-navy/50 to-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                className="glass-card p-6 rounded-xl border border-primary/20 text-center hover:border-neon-cyan/50 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-neon-cyan mb-3 flex justify-center">
                  {achievement.icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-400">{achievement.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Live Projects Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-navy/50 relative">
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-4 glow-text">
              Live Investment Projects
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover our curated selection of premium real estate opportunities.
            </p>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <ProjectCard
                  project={project}
                  delay={index * 0.1}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Custom Projects Section */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-center mb-10 glow-text">
              Featured Local Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {customProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ y: -10 }}
                >
                  <ProjectCard
                    project={project}
                    delay={index * 0.15}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 via-electric-violet/5 to-light-mint/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-4 glow-text">
              What Our Investors Say
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join thousands of satisfied investors who trust SAIR REIT for their wealth growth.
            </p>
          </motion.div>
          
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* Interactive CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 via-electric-violet/10 to-light-mint/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-neon-cyan/20 to-electric-violet/20 px-4 py-2 rounded-full mb-8 border border-neon-cyan/30"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Star className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm font-medium text-neon-cyan">Limited Time Offer</span>
          </motion.div>

          <motion.h2
            className="font-orbitron font-black text-4xl md:text-6xl mb-6 glow-text leading-tight"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Your Future is One
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-electric-violet to-light-mint animate-gradient">
              Halal Investment
            </span>
            <br />
            Away.
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join thousands of investors who are building wealth through ethical, transparent, and profitable real estate investments with AI-powered insights.
          </motion.p>

          {/* Feature Highlights */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {[
              { icon: <Shield className="w-6 h-6" />, text: "100% Halal Certified" },
              { icon: <TrendingUp className="w-6 h-6" />, text: "18.5% Average ROI" },
              { icon: <Users className="w-6 h-6" />, text: "2,847+ Happy Investors" }
            ].map((item, index) => (
              <motion.div
                key={item.text}
                className="glass-card p-4 rounded-xl border border-primary/20 flex items-center gap-3"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-neon-cyan">{item.icon}</div>
                <span className="text-white font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-4"
          >
            <GlowingButton
              variant="secondary"
              size="lg"
              className="font-orbitron font-bold text-xl animate-glow group"
            >
              Join Now - Start with $1,000
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </GlowingButton>
            
            <p className="text-sm text-gray-400">
              No hidden fees • Instant setup • 24/7 support
            </p>
          </motion.div>
        </div>
      </section>

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
      >
        <button className="glass-card p-4 rounded-full border border-neon-cyan/30 hover:border-neon-cyan/60 transition-all duration-300 hover:scale-110">
          <Rocket className="w-6 h-6 text-neon-cyan" />
        </button>
      </motion.div>
    </div>
    {/* End of main content */}
    </>
  );
}
