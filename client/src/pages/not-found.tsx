import { motion } from "framer-motion";
import { Link } from "wouter";
import { Home, ArrowLeft, Search, MapPin, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GlowingButton from "@/components/common/glowing-button";
import SEOMeta from "@/components/common/seo-meta";

export default function NotFound() {
  const popularPages = [
    { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { href: "/projects", label: "Investment Projects", icon: <MapPin className="w-4 h-4" /> },
    { href: "/dashboard", label: "Investor Dashboard", icon: <TrendingUp className="w-4 h-4" /> },
    { href: "/faq", label: "FAQ & Support", icon: <Search className="w-4 h-4" /> },
  ];

  return (
    <>
      <SEOMeta 
        title="Page Not Found - SAIR REIT"
        description="The page you're looking for doesn't exist. Explore our investment opportunities and find your perfect halal investment."
        type="website"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-navy via-background to-card flex items-center justify-center p-6">
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass-card border-neon-cyan/20">
            <CardContent className="p-12 text-center">
              {/* 404 Animation */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative">
                  <motion.h1 
                    className="font-orbitron font-black text-8xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-electric-violet to-light-mint"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    404
                  </motion.h1>
                  
                  {/* Floating elements */}
                  <motion.div
                    className="absolute top-4 left-4 w-4 h-4 bg-neon-cyan rounded-full"
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: 0.5
                    }}
                  />
                  <motion.div
                    className="absolute top-8 right-8 w-3 h-3 bg-electric-violet rounded-full"
                    animate={{ 
                      y: [0, -8, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity,
                      delay: 1
                    }}
                  />
                  <motion.div
                    className="absolute bottom-4 right-4 w-2 h-2 bg-light-mint rounded-full"
                    animate={{ 
                      y: [0, -6, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 1.8, 
                      repeat: Infinity,
                      delay: 1.5
                    }}
                  />
                </div>
              </motion.div>

              {/* Error Message */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-4">
                  Oops! Page Not Found
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  The page you're looking for seems to have wandered off into the digital realm. 
                  Don't worry, we've got plenty of amazing investment opportunities waiting for you!
                </p>
              </motion.div>

              {/* Popular Pages */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="font-semibold text-white mb-4">Popular Pages</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {popularPages.map((page, index) => (
                    <Link key={page.href} href={page.href}>
                      <motion.button
                        className="glass-card p-3 rounded-lg border border-neon-cyan/20 hover:border-neon-cyan/40 transition-all duration-300 group w-full"
                        whileHover={{ scale: 1.05, y: -2 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <div className="text-neon-cyan group-hover:text-electric-violet transition-colors mb-1">
                          {page.icon}
                        </div>
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                          {page.label}
                        </span>
                      </motion.button>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Button
                  onClick={() => window.history.back()}
                  variant="outline"
                  className="border-electric-violet text-electric-violet hover:bg-electric-violet/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
                
                <Link href="/">
                  <GlowingButton className="bg-gradient-to-r from-neon-cyan to-electric-violet text-white font-semibold">
                    <Home className="w-4 h-4 mr-2" />
                    Go Home
                  </GlowingButton>
                </Link>
              </motion.div>

              {/* Help Section */}
              <motion.div
                className="mt-12 p-6 bg-gradient-to-r from-neon-cyan/10 to-electric-violet/10 rounded-xl border border-neon-cyan/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <h4 className="font-semibold text-white mb-2">Need Help?</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Can't find what you're looking for? Our support team is here to help!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => window.open('mailto:support@sairreit.com', '_blank')}
                    variant="outline"
                    size="sm"
                    className="border-light-mint text-light-mint hover:bg-light-mint/10"
                  >
                    Contact Support
                  </Button>
                  <Link href="/faq">
                    <Button variant="outline" size="sm" className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10">
                      View FAQ
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
}
