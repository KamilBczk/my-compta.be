# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 multilingual website for My Compta, an accounting and consulting firm. The site supports French (default) and English, with automatic language detection and routing via middleware.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm start

# Lint and check code with Biome
npm run lint

# Format code with Biome
npm run format
```

## Architecture

### Internationalization (i18n)
- **Supported locales**: `fr` (default), `en`
- **Routing**: All pages use dynamic `[lang]` route segment (`/fr/...`, `/en/...`)
- **Middleware**: Automatically detects browser language via `Accept-Language` header and redirects root paths to localized versions (see `src/middleware.js:1`)
- **Translations**: Stored in JSON files at `src/dictionaries/fr.json` and `src/dictionaries/en.json`
- **Dictionary loading**: Use `getDictionary(locale)` from `src/dictionaries/getDictionary.ts:8` (server-only)
- **Translation helper**: Use `getTranslation(obj, lang)` from `src/utils/getTranslation.tsx:6` for objects with `fr` and `en` keys

### App Router Structure
```
src/app/
├── [lang]/                    # Dynamic language segment
│   ├── layout.tsx            # Main layout with Header/Footer
│   ├── page.tsx              # Homepage
│   ├── contact/              # Contact page
│   ├── office/[city]/        # Dynamic office pages
│   ├── service/              # Service pages (accounting, taxation, consulting, business-setup)
│   ├── my-compta/            # Company page
│   ├── mentions-legales/     # Legal notice page (French URLs for all languages)
│   ├── politique-de-confidentialite/  # Privacy policy (French URLs for all languages)
│   ├── legal-notice/         # Alternative English route (not linked in footer)
│   └── privacy-policy/       # Alternative English route (not linked in footer)
├── api/contact/              # Contact form API endpoint
├── sitemap.ts                # Sitemap generation
├── robots.ts                 # Robots.txt generation
└── manifest.ts               # PWA manifest generation
```

### Key Patterns

**Layout System**: The main layout (`src/app/[lang]/layout.tsx:36`) handles:
- Font loading (DM Sans with variable weights)
- SEO metadata generation via `generateMetadata`
- Structured data (JSON-LD) injection
- Analytics (Umami) script
- Conditional rendering of FooterCTA (hidden on contact page)
- Floating action button for all pages (WhatsApp: +32 496 80 47 52)
- Footer receives `lang` prop for dynamic URL generation

**Metadata Generation**: Use `generateSEOMetadata()` from `src/utils/generateMetadata.ts` for consistent SEO across pages. For legal/privacy pages, use custom metadata inline (see `mentions-legales/page.tsx` and `politique-de-confidentialite/page.tsx` for examples).

**Security Headers**: Configured in `next.config.ts:29` with HSTS, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy.

**HTTPS Redirection**: Automatic HTTP to HTTPS redirect in production for the `my-compta.be` domain (handled in both middleware and Next.js config).

**Contact Form**:
- API route at `src/app/api/contact/route.ts:5`
- Uses Resend for email delivery
- Supports two types: "callback" (callback request) and general contact
- Uses custom email template from `src/app/api/contact/template.ts`
- Requires `RESEND_API_KEY` and `CONTACT_EMAIL` environment variables

**Legal Pages**:
- URLs use French slugs for all languages: `/{lang}/mentions-legales` and `/{lang}/politique-de-confidentialite`
- Alternative English routes exist but are not linked in the footer
- Footer links are dynamic and always point to French slugs
- Content includes RGPD-compliant information (10-year data retention, Umami Analytics, etc.)
- Company info: MY COMPTA, BCE 0746.708.869, Gérant: Rabih Abou Farhat

### Component Organization
```
src/components/
├── navigation/          # Header and Footer components
├── sections/           # Page sections (hero, services, competences, career, footer-cta)
├── kago-ui/            # Reusable UI components (Container, etc.)
└── [other]/            # Individual components (contact, opening-hours, floating-action-button)
```

### Data Management
- **Office data**: Located at `src/data/offices.json` with office locations and details
- **Static assets**: Located in `src/assets/` directory
- **Utilities**: Helper functions in `src/utils/` for translations, metadata, images, and office data
- **Contact info**: Phone numbers vary by usage:
  - Main contact (footer, contact page, metadata): +32 02 31 83 402
  - WhatsApp floating button: +32 496 80 47 52 (kept as original for WhatsApp)

### Environment Variables
Required variables (see `.env`):
- `RESEND_API_KEY`: Resend API key for contact form emails
- `CONTACT_EMAIL`: Recipient email for contact form submissions
- `NODE_ENV`: Environment mode (development/production/acc)

### Tooling
- **Linter/Formatter**: Biome (not ESLint/Prettier)
  - Config: `biome.json`
  - Includes Next.js and React domain rules
  - Auto-organizes imports
  - 2-space indentation
- **TypeScript**: Strict mode enabled with path alias `@/*` mapping to `./src/*`
- **Styling**: TailwindCSS v4 with custom configuration

## Important Notes
- DO NOT push to remote unless explicitly requested
- When adding new pages, follow the `[lang]` routing pattern and ensure proper metadata generation
- All server-side dictionary access must use `getDictionary()` marked with "server-only"
- Middleware handles both language routing and HTTPS redirects
- The site uses custom pathname detection via `x-pathname` header (set in middleware) for conditional rendering
- Legal pages use French URL slugs across all languages (e.g., `/en/mentions-legales`)
- Client components (with `'use client'`) needed for interactive features like flip cards (`cta-images.tsx`)
