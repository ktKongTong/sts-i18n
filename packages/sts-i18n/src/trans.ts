import type {Tran} from "./interface/base";
import type {AllPrefix} from "./interface/utils";
import type {AllPaths, GetParamsFromPath, MergePath, TransRestKey} from "./interface";


export type MustString<T extends PropertyKey> = T extends string ? T : never;

export interface TransOpts<T extends Tran, Locale extends string,P extends AllPrefix<AllPaths<T>> = ''> {
  locale?: Locale
  prefix?: P,
}

export const createTrans =
  <
  M extends Record<string, Tran>,
  Locale extends MustString<keyof M>,
  DefaultLocale extends MustString<keyof M>,
  T extends M[DefaultLocale] = M[DefaultLocale]
>(
  transMap: M,
  defaultLocale: DefaultLocale,
  getCurrentLocale?: () => Locale
) => {
  const length = Object.keys(transMap).length
  if (length === 0) {
    throw new Error('transMap shouldn\'t be empty')
  }
  let _defaultLocale = defaultLocale
  const locales = Object.keys(transMap) as Locale[]
  const fallbackLocale = defaultLocale || locales[0] as Locale
  return <P extends AllPrefix<AllPaths<T>>>(opts?: TransOpts<T, Locale, P>) => {
    const getLocale = () => {
      const l = (opts?.locale || getCurrentLocale?.() || _defaultLocale) as Locale
      if (locales.includes(l)) return l
      return fallbackLocale
    }
    const prefix = opts?.prefix || ''
    const findInFallback = (path: string, params: any) => {
      const keys = path.split('.')
      let obj: any = transMap[fallbackLocale]
      for (const key of keys) {
        if(!obj[key]) return path
        obj = obj[key]
      }
      if(typeof obj === 'function') {
        return obj(...params)
      }else if(typeof obj === 'string') {
        return obj
      }
      return path
    }

    return {
      t: <REST extends TransRestKey<T, P>, FP extends MergePath<T, P, REST>>(id: REST, ...params: GetParamsFromPath<T, FP>) : string => {
        const path = prefix ? `${prefix}.${id}` : id
        const keys = path.split('.')
        let obj: any = transMap[getLocale()]
        for (const key of keys) {
          if(!obj[key]) return findInFallback(path, params)
          obj = obj[key]
        }
        if(typeof obj === 'function') {
          return obj(params)
        }else if(typeof obj === 'string') {
          return obj
        }
        if(typeof obj ==='object') return findInFallback(path, params)
        return obj ?? path
      },
      locale: getLocale
    }
  }
}

