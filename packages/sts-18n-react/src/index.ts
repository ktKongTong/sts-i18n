import {createTrans as _createTrans} from "@ktfun/sts-i18n";
import {localeCtxFactory} from "./locale-provider";
import type {Tran} from "@ktfun/sts-i18n";


type MString<T extends PropertyKey> = T extends string ? T : never;

export function createTrans<
  M extends Record<string, Tran>,
  Locale extends MString<keyof M>,
  DefaultLocale extends Locale
>(
    transMap: M,
    defaultLocale: DefaultLocale
  ) {
    const availableLocales = Object.keys(transMap) as Locale[]
    const { useLocale , LocaleProvider, localeCtx }= localeCtxFactory<Locale, DefaultLocale>(availableLocales, defaultLocale)
    const getLocale = () => {
      return useLocale().locale
    }
    const useTrans = _createTrans<M,Locale, DefaultLocale, M[DefaultLocale]>(
      transMap,
      defaultLocale,
      getLocale
    )
    return {
      useTrans,
      LocaleProvider,
      useLocale,
      localeCtx
    }
}

export type { TransSchema, Tran } from "@ktfun/sts-i18n";