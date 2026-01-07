import { NextResponse } from 'next/server';

// Interface pour un avis Google
interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
  relative_time_description: string;
}

interface GooglePlaceResult {
  reviews?: GoogleReview[];
  rating?: number;
  user_ratings_total?: number;
}

// Cache en mémoire avec timestamp
const cache: {
  [key: string]: {
    data: GoogleReview[];
    timestamp: number;
  };
} = {};

const CACHE_DURATION = 48 * 60 * 60 * 1000; // 48 heures en millisecondes

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'fr';

    const cacheKey = `reviews_${lang}`;
    const now = Date.now();
    // Désactiver le cache si DISABLE_CACHE=true
    const cacheDisabled = process.env.DISABLE_CACHE === 'true';

    // Vérifier le cache
    if (!cacheDisabled && cache[cacheKey] && (now - cache[cacheKey].timestamp) < CACHE_DURATION) {
      console.log(`[Google Reviews] Cache HIT for ${lang} (age: ${Math.round((now - cache[cacheKey].timestamp) / 1000 / 60)} minutes)`);
      return NextResponse.json({
        reviews: cache[cacheKey].data,
        cached: true,
        cacheAge: now - cache[cacheKey].timestamp
      });
    }

    console.log(`[Google Reviews] Cache ${cacheDisabled ? 'DISABLED' : 'MISS'} for ${lang}, fetching from Google...`);

    // Configuration Google Places API
    const placeId = process.env.GOOGLE_PLACE_ID;
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!placeId || !apiKey) {
      console.error('[Google Reviews] Missing GOOGLE_PLACE_ID or GOOGLE_PLACES_API_KEY');
      return NextResponse.json(
        { error: 'Configuration manquante - Veuillez configurer GOOGLE_PLACE_ID et GOOGLE_PLACES_API_KEY dans .env' },
        { status: 500 }
      );
    }

    // Appel à l'API Google Places
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&language=${lang}&key=${apiKey}`,
      {
        next: { revalidate: 172800 } // 48h en secondes
      }
    );

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('[Google Reviews] API Error:', data.status, data.error_message);
      return NextResponse.json(
        { error: `Google API error: ${data.status}` },
        { status: 500 }
      );
    }

    const result: GooglePlaceResult = data.result;
    const reviews = result.reviews || [];

    // Filtrer et limiter à 5 avis avec note >= 4
    const filteredReviews = reviews
      .filter(review => review.rating >= 4)
      .slice(0, 5);

    // Mettre en cache (sauf si désactivé)
    if (!cacheDisabled) {
      cache[cacheKey] = {
        data: filteredReviews,
        timestamp: now
      };
    }

    console.log(`[Google Reviews] Fetched ${filteredReviews.length} reviews for ${lang}${cacheDisabled ? ' (cache disabled)' : ''}`);

    return NextResponse.json({
      reviews: filteredReviews,
      cached: false,
      totalReviews: result.user_ratings_total,
      averageRating: result.rating
    });

  } catch (error) {
    console.error('[Google Reviews] Error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des avis' },
      { status: 500 }
    );
  }
}
