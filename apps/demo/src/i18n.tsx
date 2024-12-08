import { createTrans } from "@ktfun/sts-i18n-react";
import { localMap } from "./_i18n";


export const {
  useTrans,
  LocaleProvider,
  useLocale,
  localeCtx,
} = createTrans(localMap, 'en-US')