interface TranslationObject {
  fr: string;
  en: string;
}

export default function getTranslation(
  obj: TranslationObject,
  lang: "fr" | "en"
) {
  return obj[lang];
}
