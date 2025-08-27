import { useEffect } from 'react';
import { ProjectWork } from '@/types/project';

interface MetaTagsProps {
  project?: ProjectWork;
  isEnglish?: boolean;
}

export const MetaTags: React.FC<MetaTagsProps> = ({ project, isEnglish = false }) => {
  useEffect(() => {
    if (project) {
      const title = isEnglish ? (project.title_en || project.title) : project.title;
      const description = isEnglish ? (project.description_en || project.description) : project.description;
      const url = `${window.location.origin}${isEnglish ? '/en' : ''}/project/${project.slug}`;
      const imageUrl = project.images?.[0] || `${window.location.origin}/placeholder.svg`;

      // Update page title
      document.title = `${title} | Portfolio`;

      // Update or create meta tags
      const updateMetaTag = (name: string, content: string, property?: boolean) => {
        const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
        let meta = document.querySelector(selector) as HTMLMetaElement;
        
        if (!meta) {
          meta = document.createElement('meta');
          if (property) {
            meta.setAttribute('property', name);
          } else {
            meta.setAttribute('name', name);
          }
          document.head.appendChild(meta);
        }
        
        meta.setAttribute('content', content);
      };

      // Basic meta tags
      updateMetaTag('description', description);
      updateMetaTag('keywords', project.technologies?.join(', ') || '');

      // Open Graph tags
      updateMetaTag('og:title', title, true);
      updateMetaTag('og:description', description, true);
      updateMetaTag('og:url', url, true);
      updateMetaTag('og:image', imageUrl, true);
      updateMetaTag('og:type', 'website', true);

      // Twitter Card tags
      updateMetaTag('twitter:card', 'summary_large_image');
      updateMetaTag('twitter:title', title);
      updateMetaTag('twitter:description', description);
      updateMetaTag('twitter:image', imageUrl);

      // Canonical URL
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', url);
    }

    // Cleanup function to reset to default when component unmounts
    return () => {
      document.title = 'Portfolio';
      
      // Remove project-specific meta tags
      const metasToRemove = [
        'meta[name="description"]',
        'meta[name="keywords"]',
        'meta[property="og:title"]',
        'meta[property="og:description"]',
        'meta[property="og:url"]',
        'meta[property="og:image"]',
        'meta[name="twitter:title"]',
        'meta[name="twitter:description"]',
        'meta[name="twitter:image"]'
      ];

      metasToRemove.forEach(selector => {
        const meta = document.querySelector(selector);
        if (meta) meta.remove();
      });
    };
  }, [project, isEnglish]);

  return null;
};

export default MetaTags;