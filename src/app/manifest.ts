import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'My Compta - Expert Comptable à Laeken',
    short_name: 'My Compta',
    description: 'Expert comptable à Laeken spécialisé en comptabilité, fiscalité et création d\'entreprise',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#025EAC',
    orientation: 'portrait',
    scope: '/',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    categories: ['business', 'finance', 'professional'],
    lang: 'fr-BE',
  };
}
