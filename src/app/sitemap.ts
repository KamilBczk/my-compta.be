import { MetadataRoute } from 'next';
import { getAllOffices } from '@/utils/offices';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://my-compta.be';
  const currentDate = new Date().toISOString();
  
  // Définir les langues supportées
  const languages = ['fr', 'en'];
  
  // Récupérer tous les bureaux
  const offices = getAllOffices();
  
  // Définir toutes les pages
  const pages = [
    {
      path: '',
      priority: 1.0,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/my-compta',
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/contact',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/service/accounting',
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/service/business-setup',
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/service/taxation',
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/service/consulting',
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    },
  ];

  // Générer les entrées de sitemap pour toutes les versions de langues
  const sitemapEntries: MetadataRoute.Sitemap = [];

  languages.forEach((lang) => {
    pages.forEach((page) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${page.path}`,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    });
  });

  // Ajouter les pages de bureaux
  languages.forEach((lang) => {
    offices.forEach((office) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/office/${office.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.9,
      });
    });
  });

  return sitemapEntries;
}
