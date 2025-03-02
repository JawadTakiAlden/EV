import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  useState,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";

const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const ltrCache = createCache({
  key: "mui",
});

function RTL(props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
}) {
  const { i18n } = useTranslation();

  const [lng, setLng] = useState(i18n.language);

  useEffect(() => {
    setLng(i18n.language);
  }, [i18n.language]);

  return (
    <CacheProvider value={i18n.language === "ar" ? rtlCache : ltrCache}>
      {props.children}
    </CacheProvider>
  );
}

export default RTL;
