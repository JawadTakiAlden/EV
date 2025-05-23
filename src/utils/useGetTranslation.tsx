import { useTranslation } from "react-i18next";

const useGetTranslation = () => {
  const { i18n } = useTranslation();

  const getTranslation = (attr: string) => {
    if (i18n.language === "ar") {
      return `${attr}_ar`;
    } else {
      return attr;
    }
  };

  const getTranslation2 = <T extends Record<string, any>>(
    obj: T,
    attr: keyof T
  ): any => {
    const translatedKey =
      i18n.language === "ar" ? `${String(attr)}_ar` : String(attr);
    return obj[translatedKey as keyof T] ?? obj[attr];
  };

  return {
    getTranslation,
    getTranslation2,
  };
};

export default useGetTranslation;
