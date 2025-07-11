import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

export default function SEOMeta({
  title = 'SAIR REIT - Halal Real Estate Investment Trust',
  description = 'Invest in Sharia-compliant real estate with SAIR REIT. Get transparent, asset-backed returns with complete profit sharing. Join thousands of satisfied investors.',
  keywords = 'REIT, real estate investment, halal investment, sharia compliant, property investment, Pakistan real estate, Dubai real estate, Singapore real estate',
  image = '/og-image.jpg',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website',
  author = 'SAIR REIT',
  publishedTime,
  modifiedTime,
  section,
  tags = []
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updatePropertyTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);

    // Open Graph tags
    updatePropertyTag('og:title', title);
    updatePropertyTag('og:description', description);
    updatePropertyTag('og:image', image);
    updatePropertyTag('og:url', url);
    updatePropertyTag('og:type', type);
    updatePropertyTag('og:site_name', 'SAIR REIT');

    // Twitter Card tags
    updatePropertyTag('twitter:card', 'summary_large_image');
    updatePropertyTag('twitter:title', title);
    updatePropertyTag('twitter:description', description);
    updatePropertyTag('twitter:image', image);

    // Additional Open Graph tags for articles
    if (type === 'article') {
      if (publishedTime) updatePropertyTag('article:published_time', publishedTime);
      if (modifiedTime) updatePropertyTag('article:modified_time', modifiedTime);
      if (section) updatePropertyTag('article:section', section);
      if (author) updatePropertyTag('article:author', author);
      tags.forEach(tag => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'article:tag');
        meta.content = tag;
        document.head.appendChild(meta);
      });
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // Structured data for organization
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'SAIR REIT',
      url: 'https://sairreit.com',
      logo: 'https://sairreit.com/logo.png',
      description: 'Sharia-compliant Real Estate Investment Trust',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'PK',
        addressLocality: 'Lahore',
        addressRegion: 'Punjab'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+92-300-1234567',
        contactType: 'customer service',
        availableLanguage: ['English', 'Urdu']
      },
      sameAs: [
        'https://facebook.com/sairreit',
        'https://twitter.com/sairreit',
        'https://linkedin.com/company/sairreit'
      ]
    };

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

  }, [title, description, keywords, image, url, type, author, publishedTime, modifiedTime, section, tags]);

  return null; // This component doesn't render anything
}

// Predefined SEO configurations for different pages
export const SEOConfigs = {
  home: {
    title: 'SAIR REIT - Halal Real Estate Investment Trust',
    description: 'Invest in Sharia-compliant real estate with SAIR REIT. Get transparent, asset-backed returns with complete profit sharing. Join thousands of satisfied investors.',
    keywords: 'REIT, real estate investment, halal investment, sharia compliant, property investment, Pakistan real estate, Dubai real estate, Singapore real estate',
    type: 'website' as const
  },
  projects: {
    title: 'Investment Projects - SAIR REIT',
    description: 'Explore our diverse portfolio of real estate investment projects. From luxury apartments to commercial properties, find your perfect halal investment opportunity.',
    keywords: 'real estate projects, investment opportunities, property portfolio, halal investments, Dubai properties, Singapore properties',
    type: 'website' as const
  },
  dashboard: {
    title: 'Investor Dashboard - SAIR REIT',
    description: 'Track your investments, monitor performance, and manage your portfolio with our comprehensive investor dashboard.',
    keywords: 'investor dashboard, portfolio management, investment tracking, performance monitoring',
    type: 'website' as const
  },
  education: {
    title: 'Investment Education - SAIR REIT',
    description: 'Learn about halal investing, real estate markets, and investment strategies with our comprehensive educational resources.',
    keywords: 'investment education, halal investing, real estate education, investment strategies, financial literacy',
    type: 'website' as const
  },
  faq: {
    title: 'Frequently Asked Questions - SAIR REIT',
    description: 'Find answers to common questions about SAIR REIT investments, halal compliance, and real estate investment processes.',
    keywords: 'FAQ, frequently asked questions, investment FAQ, halal investment questions, REIT FAQ',
    type: 'website' as const
  },
  aiTools: {
    title: 'AI Investment Tools - SAIR REIT',
    description: 'Use our advanced AI-powered tools to analyze investments, find properties, and make informed investment decisions.',
    keywords: 'AI tools, investment analysis, property finder, market analysis, investment calculator',
    type: 'website' as const
  }
}; 