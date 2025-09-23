import officesData from '@/data/offices.json';

export interface Office {
  slug: string;
  name: {
    fr: string;
    en: string;
  };
  postalCode: string;
  region: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  keywords: {
    fr: string;
    en: string;
  };
  coordinates: {
    latitude: string;
    longitude: string;
  };
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export function getAllOffices(): Office[] {
  return officesData.offices;
}

export function getOfficeBySlug(slug: string): Office | undefined {
  return officesData.offices.find(office => office.slug === slug);
}

export function getOfficeSlugs(): string[] {
  return officesData.offices.map(office => office.slug);
}

export function getOfficeParams() {
  return officesData.offices.map(office => ({
    city: office.slug,
  }));
}

export function isValidOffice(slug: string): boolean {
  return officesData.offices.some(office => office.slug === slug);
}
