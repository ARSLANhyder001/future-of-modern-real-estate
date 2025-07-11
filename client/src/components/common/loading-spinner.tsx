import { motion } from 'framer-motion';
import { Loader2, Zap, Target, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'pulse' | 'dots' | 'bars';
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
};

const iconSizes = {
  sm: 16,
  md: 32,
  lg: 48,
  xl: 64
};

export default function LoadingSpinner({
  size = 'md',
  variant = 'default',
  text,
  className,
  fullScreen = false
}: LoadingSpinnerProps) {
  const renderSpinner = () => {
    switch (variant) {
      case 'pulse':
        return (
          <motion.div
            className={cn(
              'rounded-full bg-gradient-to-r from-neon-cyan via-electric-violet to-light-mint',
              sizeClasses[size]
            )}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        );

      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-neon-cyan rounded-full"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        );

      case 'bars':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-gradient-to-t from-neon-cyan to-electric-violet rounded-full"
                style={{ height: size === 'sm' ? '12px' : size === 'md' ? '16px' : size === 'lg' ? '20px' : '24px' }}
                animate={{
                  scaleY: [1, 2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        );

      default:
        return (
          <motion.div
            className="relative"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            <div className={cn(
              'rounded-full border-2 border-gray-600',
              sizeClasses[size]
            )}>
              <motion.div
                className={cn(
                  'absolute inset-0 rounded-full border-2 border-transparent border-t-neon-cyan',
                  sizeClasses[size]
                )}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            </div>
          </motion.div>
        );
    }
  };

  const content = (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      {renderSpinner()}
      {text && (
        <motion.p
          className="mt-4 text-neon-cyan font-orbitron text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-navy via-background to-card flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
}

// Specialized loading components for different contexts
export function DashboardLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy via-background to-card">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <LoadingSpinner size="xl" variant="pulse" text="Loading your dashboard..." />
        <motion.div
          className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-neon-cyan" />
            <span className="text-xs text-gray-400">Initializing</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-electric-violet" />
            <span className="text-xs text-gray-400">Loading Data</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-light-mint" />
            <span className="text-xs text-gray-400">Ready</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function PageLoading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <LoadingSpinner size="lg" variant="default" text="Loading..." />
    </div>
  );
}

export function ButtonLoading({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  return (
    <div className="flex items-center space-x-2">
      <LoadingSpinner size={size} variant="dots" />
      <span>Loading...</span>
    </div>
  );
} 