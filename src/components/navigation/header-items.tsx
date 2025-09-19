import getTranslation from "@/utils/getTranslation";

interface HeaderItemsProps {
  lang: "fr" | "en";
}

export default function HeaderItems({ lang }: HeaderItemsProps) {
  const links = [
    {
      label: getTranslation(
        {
          fr: "Accueil",
          en: "Home",
        },
        lang
      ),
      href: `/${lang}`,
    },
    {
      label: getTranslation(
        {
          fr: "My Compta",
          en: "My Compta",
        },
        lang
      ),
      href: `/${lang}/my-compta`,
    },
    {
      label: getTranslation(
        {
          fr: "Prestations",
          en: "Prestations",
        },
        lang
      ),
      href: `/${lang}/prestations`,
    },
    {
      label: getTranslation(
        {
          fr: "Contact",
          en: "Contact",
        },
        lang
      ),
      href: `/${lang}/contact`,
    },
  ];

  return links;
}
