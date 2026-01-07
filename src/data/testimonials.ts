export type Testimonial = {
  id: string;
  name: string;
  company?: string;
  role?: string;
  content: string;
  rating: number;
  avatar: string;
  source: 'google' | 'hardcoded';
  time?: number;
  profile_photo_url?: string;
};

// Avis clients hardcodés (complément aux avis Google)
export const hardcodedTestimonials: { fr: Testimonial[]; en: Testimonial[] } = {
  fr: [
    {
      id: 'hc-1',
      name: "Sophie Dubois",
      company: "Dubois Consulting SPRL",
      role: "Gérante",
      content: "My Compta nous accompagne depuis 3 ans. Leur réactivité et leur expertise nous ont permis d'optimiser notre gestion comptable et fiscale. Une équipe à l'écoute et de précieux conseils.",
      rating: 5,
      avatar: "SD",
      source: "hardcoded"
    },
    {
      id: 'hc-2',
      name: "Marc Leblanc",
      company: "TechStart SA",
      role: "CEO",
      content: "Un service professionnel et personnalisé. L'équipe de My Compta a su nous guider dans la création de notre société et continue de nous accompagner au quotidien.",
      rating: 5,
      avatar: "ML",
      source: "hardcoded"
    },
    {
      id: 'hc-3',
      name: "Fatima El Amrani",
      company: "Boutique Fleurs & Co",
      role: "Indépendante",
      content: "Excellent cabinet comptable ! Ils m'ont aidé à comprendre mes obligations fiscales et à optimiser ma situation. Je recommande vivement leurs services.",
      rating: 5,
      avatar: "FE",
      source: "hardcoded"
    }
  ],
  en: [
    {
      id: 'hc-1',
      name: "Sophie Dubois",
      company: "Dubois Consulting SPRL",
      role: "Manager",
      content: "My Compta has been supporting us for 3 years. Their responsiveness and expertise have allowed us to optimize our accounting and tax management. A team that listens and provides valuable advice.",
      rating: 5,
      avatar: "SD",
      source: "hardcoded"
    },
    {
      id: 'hc-2',
      name: "Marc Leblanc",
      company: "TechStart SA",
      role: "CEO",
      content: "A professional and personalized service. The My Compta team was able to guide us in the creation of our company and continues to support us on a daily basis.",
      rating: 5,
      avatar: "ML",
      source: "hardcoded"
    },
    {
      id: 'hc-3',
      name: "Fatima El Amrani",
      company: "Boutique Fleurs & Co",
      role: "Self-employed",
      content: "Excellent accounting firm! They helped me understand my tax obligations and optimize my situation. I highly recommend their services.",
      rating: 5,
      avatar: "FE",
      source: "hardcoded"
    }
  ]
};
