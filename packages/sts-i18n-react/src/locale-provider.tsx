import {createContext,  useContext, useState, Dispatch, SetStateAction} from "react";
import  React from 'react'
export const localeCtxFactory = <
  Locale extends string,
  DefaultLocale extends Locale
>(
  availableLocales:Locale[],
  defaultLocale?: DefaultLocale
) => {

  const userLocale = navigator.language
  const _defaultLocale = defaultLocale ? defaultLocale :
    availableLocales.find(l => l === userLocale) ?? availableLocales[0]

  const localeCtx = createContext<{
    locale: Locale,
    setLocale: Dispatch<SetStateAction<Locale>>
  }>({
    locale: _defaultLocale,
    setLocale: () => {}
  })

  const Provider = localeCtx.Provider
  const  LocaleProvider = ({children}: {children: React.ReactNode}) => {
    const [locale, setLocale] = useState<Locale>(_defaultLocale)
    return <Provider value={{ locale, setLocale }}>{children}</Provider>
  }

  const useLocale = () => {

    const l = useContext(localeCtx)
    return  {
      locale: l.locale,
      setLocale: l.setLocale,
      availableLocales
    }
  }
  return {
    localeCtx,
    Provider: Provider,
    LocaleProvider,
    useLocale,
    defaultLocale: _defaultLocale
  }
}
