import { Dictionary } from "@/utils/useDictionary";

interface HeaderItemsProps {
  lang: "fr" | "en";
  dictionary: Dictionary;
}

export default function HeaderItems({ lang, dictionary }: HeaderItemsProps) {
  const links = [
    {
      label: dictionary.navigation.home,
      href: `/${lang}`,
    },
    {
      label: dictionary.navigation.myCompta,
      href: `/${lang}/my-compta`,
    },
    {
      label: dictionary.navigation.services,
      href: `/${lang}#services`,
    },
    {
      label: dictionary.navigation.contact,
      href: `/${lang}/contact`,
    },
  ];

  return links;
}
