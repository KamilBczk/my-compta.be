# Documentation - Section Témoignages (Testimonials)

## Vue d'ensemble

La section témoignages affiche une combinaison d'avis Google My Business et d'avis clients hardcodés dans un carrousel responsive avec défilement automatique.

## Caractéristiques

### Fonctionnalités principales

- **Source hybride** : 5 avis Google + 3 avis hardcodés
- **Bilingue** : Support complet FR/EN avec chargement dynamique selon la langue
- **Cache intelligent** : 48h de cache par langue en production
- **Carrousel responsive** : 1/2/3 cartes visibles selon la taille d'écran
- **Navigation** : Boutons gauche/droite + indicateurs (dots)
- **Auto-scroll** : Défilement automatique toutes les 5 secondes
- **Boucle infinie** : Navigation circulaire sans fin

### Design

- Cartes avec ombre et effet hover
- Étoiles jaunes pour les notes
- Avatar photo (Google) ou initiales (hardcoded)
- Responsive : mobile (1 carte), tablette (2 cartes), desktop (3 cartes)
- Flèches de navigation masquées si tous les avis sont visibles

## Architecture

### Fichiers impliqués

```
src/
├── components/sections/
│   └── testimonials.tsx              # Composant principal
├── data/
│   └── testimonials.ts               # Avis hardcodés + types
├── app/api/google-reviews/
│   └── route.ts                      # API endpoint Google Places
└── app/[lang]/
    └── page.tsx                      # Utilisation sur la homepage
```

### Flux de données

1. **Chargement initial** : Le composant `Testimonials` monte
2. **Requête API** : Appel à `/api/google-reviews?lang=fr` (ou `en`)
3. **Cache check** : L'API vérifie le cache (48h)
4. **Google Places** : Si cache expiré, appel à l'API Google
5. **Filtrage** : Sélection de 5 avis avec note ≥ 4
6. **Combinaison** : Fusion avec 3 avis hardcodés
7. **Déduplication** : Suppression des doublons par ID
8. **Affichage** : Rendu du carrousel

## Configuration

### Variables d'environnement

```env
# Requis pour Google Reviews
GOOGLE_PLACES_API_KEY=votre_cle_api
GOOGLE_PLACE_ID=votre_place_id

# Optionnel - désactiver le cache
DISABLE_CACHE=true
```

### Cache

Le cache est :
- **Activé par défaut** (48h) en production et development
- **Désactivé** uniquement si `DISABLE_CACHE=true`

Le cache est **en mémoire** : il se réinitialise au redémarrage du serveur.

## Google Places API - Configuration

### Étapes de configuration

Consultez le guide détaillé : `GOOGLE_REVIEWS_SETUP.md`

Résumé :
1. Créer un projet Google Cloud Console
2. Activer l'API Places
3. Créer une clé API avec restrictions
4. Trouver votre Place ID
5. Ajouter les credentials au `.env`

### Quotas et coûts

- **Gratuit** : 200€ de crédit mensuel
- **Coût** : ~0.017€ par requête API
- **Usage estimé** : ~1 requête/48h par langue = ~0.50€/mois
- **Cache** : Réduit drastiquement les coûts

## Personnalisation

### Ajouter des avis hardcodés

Éditez `src/data/testimonials.ts` :

```typescript
export const hardcodedTestimonials: { fr: Testimonial[]; en: Testimonial[] } = {
  fr: [
    {
      id: 'hc-4',                    // ID unique
      name: "Jean Dupont",
      company: "Ma Société SPRL",    // Optionnel
      role: "Gérant",                // Optionnel
      content: "Excellent service...",
      rating: 5,                     // 1-5 étoiles
      avatar: "JD",                  // Initiales (2 lettres max)
      source: "hardcoded"            // Ne pas changer
    }
  ],
  en: [
    // Version anglaise du même avis
  ]
};
```

### Modifier le ratio Google/Hardcodé

Dans `src/components/sections/testimonials.tsx` :

```typescript
const combined = [
  ...googleReviews.slice(0, 5),  // Nombre d'avis Google
  ...hardcoded.slice(0, 3),      // Nombre d'avis hardcodés
];
```

### Changer le filtre de notation Google

Dans `src/app/api/google-reviews/route.ts` :

```typescript
const filteredReviews = reviews
  .filter(review => review.rating >= 4)  // Changer le seuil ici
  .slice(0, 5);
```

### Ajuster la durée du cache

Dans `src/app/api/google-reviews/route.ts` :

```typescript
const CACHE_DURATION = 48 * 60 * 60 * 1000; // 48h en millisecondes
```

### Modifier la vitesse d'auto-scroll

Dans `src/components/sections/testimonials.tsx` :

```typescript
autoScrollInterval.current = setInterval(nextSlide, 5000); // ms
```

## Breakpoints responsive

- **Mobile** (`< 768px`) : 1 carte visible
- **Tablette** (`≥ 768px`) : 2 cartes visibles
- **Desktop** (`≥ 1024px`) : 3 cartes visibles

## Navigation

### Comportement des contrôles

- **Flèches** : Masquées si `testimonials.length ≤ visibleCards`
- **Dots** : Masqués si `testimonials.length ≤ visibleCards`
- **Nombre de dots** : `testimonials.length - visibleCards + 1`

Exemples :
- 3 avis sur desktop (3 visibles) : Pas de contrôles
- 8 avis sur desktop (3 visibles) : 6 dots (positions 0-5)
- 3 avis sur mobile (1 visible) : 3 dots

## Types TypeScript

```typescript
type Testimonial = {
  id: string;                        // ID unique
  name: string;                      // Nom du client
  company?: string;                  // Société (optionnel)
  role?: string;                     // Fonction (optionnel)
  content: string;                   // Texte de l'avis
  rating: number;                    // Note 1-5
  avatar: string;                    // Initiales ou URL
  source: 'google' | 'hardcoded';    // Source de l'avis
  time?: number;                     // Timestamp Unix (Google)
  profile_photo_url?: string;        // Photo de profil (Google)
};
```

## Dépannage

### Les avis Google ne s'affichent pas

1. Vérifiez la console du navigateur pour les erreurs
2. Vérifiez que `GOOGLE_PLACES_API_KEY` et `GOOGLE_PLACE_ID` sont définis
3. Vérifiez que l'API Places est activée dans Google Cloud Console
4. Vérifiez les restrictions de la clé API
5. Vérifiez les logs serveur : `[Google Reviews] ...`

### Le cache ne fonctionne pas

1. Vérifiez que `DISABLE_CACHE` n'est pas à `true` dans votre `.env`
2. Le cache est en mémoire : redémarrer le serveur le vide
3. Vérifiez les logs serveur pour voir si le cache HIT/MISS s'affiche

### Les contrôles de navigation sont absents

C'est normal si `testimonials.length ≤ visibleCards`. Par exemple :
- Sur desktop avec seulement 3 avis : tous visibles, pas de navigation

### Erreur "Type 'string' is not assignable to type 'hardcoded' | 'google'"

Assurez-vous que `hardcodedTestimonials` est typé :

```typescript
export const hardcodedTestimonials: { fr: Testimonial[]; en: Testimonial[] } = { ... }
```

## Performance

### Optimisations implémentées

- **Cache 48h** : Réduit les appels API Google
- **Filtre côté serveur** : Seulement les avis ≥ 4 étoiles
- **Déduplication** : Évite les doublons
- **Lazy loading** : Composant chargé uniquement sur la page d'accueil
- **Auto-scroll reset** : Interrompu lors de l'interaction utilisateur

### Métriques

- **Temps de chargement** : ~200ms (avec cache)
- **Temps de chargement** : ~1-2s (sans cache, appel Google)
- **Taille du bundle** : ~15KB (composant + données)

## Maintenance

### Logs de débogage

Les logs sont automatiquement générés :

**Côté serveur** (`/api/google-reviews`) :
```
[Google Reviews] Cache HIT for fr (age: 15 minutes)
[Google Reviews] Cache MISS for en, fetching from Google...
[Google Reviews] Cache DISABLED for fr, fetching from Google...
[Google Reviews] Fetched 5 reviews for fr
[Google Reviews] Fetched 5 reviews for en (cache disabled)
```

**Côté client** (`testimonials.tsx`) :
```
[Testimonials] Loaded 5 Google reviews (cached: true)
[Testimonials] Total: 8 reviews (5 Google + 3 hardcoded)
[Testimonials] IDs: ['google-123', 'google-456', ...]
[Testimonials] Next - prevIndex: 0, newIndex: 1, maxPages: 6, visibleCards: 3
```

### Retirer les logs de debug

Pour retirer les logs de navigation du carrousel, supprimez dans `testimonials.tsx` :

```typescript
console.log('[Testimonials] Next - prevIndex:', ...);
console.log('[Testimonials] Prev - prevIndex:', ...);
```

## Évolutions futures possibles

- [ ] Pagination côté serveur pour plus de 5 avis Google
- [ ] Système de notation avec demi-étoiles
- [ ] Filtres par note (5★, 4★+, etc.)
- [ ] Animation de transition entre les cartes
- [ ] Support des avis vidéo
- [ ] Intégration avec d'autres plateformes (Facebook, Trustpilot)
- [ ] Cache persistant (Redis, base de données)
- [ ] Mode "Grid" en plus du mode "Carousel"
- [ ] Export des avis en PDF
- [ ] Admin panel pour gérer les avis hardcodés

---

**Dernière mise à jour** : Janvier 2025
**Version** : 1.0
