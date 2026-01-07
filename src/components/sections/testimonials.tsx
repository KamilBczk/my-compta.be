"use client";

import React, { useState, useRef, useEffect } from "react";
import Section from "../kago-ui/section";
import Container from "../kago-ui/Container";
import { hardcodedTestimonials, type Testimonial } from "@/data/testimonials";

interface TestimonialsProps {
  lang: "fr" | "en";
}

// Fonction pour générer les initiales à partir du nom
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Fonction pour convertir un avis Google en format Testimonial
function convertGoogleReview(review: any): Testimonial {
  return {
    id: `google-${review.time}`,
    name: review.author_name,
    content: review.text,
    rating: review.rating,
    avatar: getInitials(review.author_name),
    source: "google",
    time: review.time,
    profile_photo_url: review.profile_photo_url,
  };
}

export function Testimonials({ lang }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState(1); // Nombre de cartes visibles à la fois
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);

  // Calculer le nombre de cartes visibles selon la largeur de l'écran
  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        // lg breakpoint
        setVisibleCards(3);
      } else if (width >= 768) {
        // md breakpoint
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  // Charger les avis (Google + hardcodés)
  useEffect(() => {
    async function loadTestimonials() {
      setIsLoading(true);

      try {
        // Récupérer les avis Google
        const response = await fetch(`/api/google-reviews?lang=${lang}`);

        let googleReviews: Testimonial[] = [];

        if (response.ok) {
          const data = await response.json();
          googleReviews = (data.reviews || []).map(convertGoogleReview);
          console.log(
            `[Testimonials] Loaded ${googleReviews.length} Google reviews (cached: ${data.cached})`
          );
        } else {
          console.warn(
            "[Testimonials] Failed to load Google reviews, using hardcoded only"
          );
        }

        // Avis hardcodés pour cette langue
        const hardcoded = hardcodedTestimonials[lang];

        // Combiner : 5 Google + 3 hardcodés
        const combined = [
          ...googleReviews.slice(0, 5),
          ...hardcoded.slice(0, 3),
        ];

        // Vérifier qu'il n'y a pas de doublons par ID
        const uniqueTestimonials = combined.filter(
          (testimonial, index, self) =>
            index === self.findIndex((t) => t.id === testimonial.id)
        );

        setTestimonials(uniqueTestimonials);
        console.log(
          `[Testimonials] Total: ${uniqueTestimonials.length} reviews (${googleReviews.length} Google + ${hardcoded.length} hardcoded)`
        );
        console.log(
          `[Testimonials] IDs:`,
          uniqueTestimonials.map((t) => t.id)
        );
      } catch (error) {
        console.error("[Testimonials] Error loading reviews:", error);
        // En cas d'erreur, utiliser seulement les avis hardcodés
        setTestimonials(hardcodedTestimonials[lang]);
      } finally {
        setIsLoading(false);
      }
    }

    loadTestimonials();
  }, [lang]);

  // Fonction pour passer à l'avis suivant (avec boucle infinie)
  const nextSlide = () => {
    if (testimonials.length === 0) return;

    setCurrentIndex((prevIndex) => {
      // Nombre de pages réelles = nombre de positions possibles
      const maxPages = Math.max(1, testimonials.length - visibleCards + 1);
      const newIndex = (prevIndex + 1) % maxPages;

      console.log('[Testimonials] Next - prevIndex:', prevIndex, 'newIndex:', newIndex, 'maxPages:', maxPages, 'visibleCards:', visibleCards);

      scrollToIndex(newIndex);
      return newIndex;
    });
  };

  // Fonction pour passer à l'avis précédent (avec boucle infinie)
  const prevSlide = () => {
    if (testimonials.length === 0) return;

    setCurrentIndex((prevIndex) => {
      // Nombre de pages réelles = nombre de positions possibles
      const maxPages = Math.max(1, testimonials.length - visibleCards + 1);
      const newIndex = prevIndex === 0 ? maxPages - 1 : prevIndex - 1;

      console.log('[Testimonials] Prev - prevIndex:', prevIndex, 'newIndex:', newIndex, 'maxPages:', maxPages, 'visibleCards:', visibleCards);

      scrollToIndex(newIndex);
      return newIndex;
    });
  };

  // Fonction pour scroller vers un index spécifique
  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      // Calculer la largeur d'une carte + gap
      const firstCard = scrollContainerRef.current.querySelector(
        'div[class*="flex-shrink-0"]'
      ) as HTMLElement;
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth;
        const gap = 24; // gap-6 = 24px
        const scrollAmount = (cardWidth + gap) * index;
        scrollContainerRef.current.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    scrollToIndex(index);
    // Réinitialiser le timer automatique
    resetAutoScroll();
  };

  // Réinitialiser le timer de défilement automatique
  const resetAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
    if (testimonials.length > 0) {
      autoScrollInterval.current = setInterval(nextSlide, 5000); // Défilement toutes les 5 secondes
    }
  };

  // Défilement automatique
  useEffect(() => {
    if (testimonials.length > 0 && !isLoading) {
      autoScrollInterval.current = setInterval(nextSlide, 5000);

      return () => {
        if (autoScrollInterval.current) {
          clearInterval(autoScrollInterval.current);
        }
      };
    }
  }, [testimonials.length, isLoading]);

  const handlePrevClick = () => {
    prevSlide();
    resetAutoScroll();
  };

  const handleNextClick = () => {
    nextSlide();
    resetAutoScroll();
  };

  if (isLoading) {
    return (
      <Section color="white">
        <Container>
          <div className="py-16">
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <Section color="white">
      <Container>
        <div className="py-16">
          {/* Titre */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0F2137] mb-4">
              {lang === "fr" ? "Ils nous font confiance" : "They trust us"}
            </h2>
            <p className="text-lg text-[#02073E] max-w-2xl mx-auto">
              {lang === "fr"
                ? "Découvrez les témoignages de nos clients satisfaits"
                : "Discover testimonials from our satisfied clients"}
            </p>
          </div>

          {/* Container de défilement */}
          <div className="relative">
            {/* Bouton gauche - masqué si tous les avis sont visibles */}
            {testimonials.length > visibleCards && (
              <button
                onClick={handlePrevClick}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-[#025EAC] hover:bg-[#025EAC] hover:text-white transition-all duration-200"
                aria-label={lang === "fr" ? "Avis précédent" : "Previous review"}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}

            {/* Bouton droit - masqué si tous les avis sont visibles */}
            {testimonials.length > visibleCards && (
              <button
                onClick={handleNextClick}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-[#025EAC] hover:bg-[#025EAC] hover:text-white transition-all duration-200"
                aria-label={lang === "fr" ? "Avis suivant" : "Next review"}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}

            {/* Scroll horizontal */}
            <div
              ref={scrollContainerRef}
              className="overflow-x-hidden scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex gap-6">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  >
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                      {/* Badge source (optionnel - pour debug) */}
                      {/* <div className="mb-2">
                        <span className={`text-xs px-2 py-1 rounded ${testimonial.source === 'google' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                          {testimonial.source === 'google' ? 'Google' : 'Client'}
                        </span>
                      </div> */}

                      {/* Étoiles */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      {/* Contenu */}
                      <p className="text-[#02073E] mb-6 flex-grow italic">
                        "{testimonial.content}"
                      </p>

                      {/* Auteur */}
                      <div className="flex items-center gap-4">
                        {testimonial.profile_photo_url ? (
                          <img
                            src={testimonial.profile_photo_url}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-[#025EAC] rounded-full flex items-center justify-center text-white font-semibold">
                            {testimonial.avatar}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-[#0F2137]">
                            {testimonial.name}
                          </p>
                          {testimonial.role && (
                            <p className="text-sm text-gray-600">
                              {testimonial.role}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Indicateurs (dots) - masqués si tous les avis sont visibles */}
          {testimonials.length > visibleCards && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({
                length: testimonials.length - visibleCards + 1,
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-[#025EAC] w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`${lang === "fr" ? "Aller à l'avis" : "Go to review"} ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
