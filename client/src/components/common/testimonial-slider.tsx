import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Testimonial } from "@shared/schema";

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

export default function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentPage((prev) => {
        const maxPages = Math.ceil(testimonials.length / 3);
        return (prev + 1) % maxPages;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-light-mint" : "text-gray-600"}>
        ★
      </span>
    ));
  };

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No testimonials available at the moment.</p>
      </div>
    );
  }

  // Calculate which testimonials to show based on current page
  const startIndex = currentPage * 3;
  const endIndex = Math.min(startIndex + 3, testimonials.length);
  const visibleTestimonials = testimonials.slice(startIndex, endIndex);

  // Fill remaining slots with testimonials from the beginning if needed
  while (visibleTestimonials.length < 3) {
    const remainingCount = 3 - visibleTestimonials.length;
    const additionalTestimonials = testimonials.slice(0, remainingCount);
    visibleTestimonials.push(...additionalTestimonials);
  }

  const totalPages = Math.ceil(testimonials.length / 3);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {visibleTestimonials.slice(0, 3).map((testimonial, index) => (
          <motion.div
            key={`${currentPage}-${index}-${testimonial.id || index}`}
            className="glass-card p-8 rounded-xl hover:scale-105 transition-all duration-300 animate-float"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
          >
            <div className="flex items-center mb-6">
              <img
                src={testimonial.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100'}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mr-4 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100';
                }}
              />
              <div>
                <h4 className="font-semibold text-white">{testimonial.name}</h4>
                <p className="text-neon-cyan text-sm">
                  {testimonial.verified ? 'Verified Investor' : 'Investor'}
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">{testimonial.content}</p>
            <div className="flex">
              {renderStars(testimonial.rating)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentPage === index
                  ? 'bg-neon-cyan'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              onClick={() => setCurrentPage(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
