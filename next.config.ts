import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Redirection HTTPS automatique (uniquement pour le domaine de production)
  async redirects() {
    return [
      // Redirection HTTP vers HTTPS en production
      ...(process.env.NODE_ENV === 'production' ? [{
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
          {
            type: 'header',
            key: 'host',
            value: 'my-compta.be',
          },
        ],
        destination: 'https://my-compta.be/:path*',
        permanent: true,
      }] : []),
    ];
  },
  
  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ],
      },
    ];
  },
};

export default nextConfig;
