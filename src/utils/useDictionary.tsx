import { getDictionary } from "@/dictionaries/getDictionary";

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

// Type-safe dictionary hook for components
export const useDictionary = (dictionary: Dictionary) => {
  return dictionary;
};
