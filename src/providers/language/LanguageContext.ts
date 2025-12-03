import { createContext } from "react";
import { Language } from "./type";

type LanguageContextType = {
  currentLanguage: Language;
  changeLanguage: (language: Language) => void;
  getLabel: (labelId: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export default LanguageContext;
