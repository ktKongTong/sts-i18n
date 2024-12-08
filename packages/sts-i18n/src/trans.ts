import type {Tran} from "./interface/base";
import type {AllPrefix} from "./interface/utils";
import type {AllPaths, GetParamsFromPath, MergePath, TransRestKey} from "./interface";


type ValueType<T, K extends keyof T> = K extends keyof T ? T[K] : never;

export type MustString<T extends PropertyKey> = T extends string ? T : never;

export interface TransOpts<T extends Tran, Locale extends string,P extends AllPrefix<AllPaths<T>> = ''> {
  locale?: Locale
  prefix?: P,
}

export const createTrans =
  <
  M extends Record<string, Tran>,
  Locale extends MustString<keyof M>,
  DefaultLocale extends Locale,
  T extends M[DefaultLocale] = M[DefaultLocale]
>(
  transMap: M,
  defaultLocale: DefaultLocale,
  getCurrentLocale?: () => Locale
) => {

  let _defaultLocale = defaultLocale

  return <P extends AllPrefix<AllPaths<T>>>(ops?: TransOpts<T, Locale, P>) => {
    const locale = ops?.locale || getCurrentLocale?.() || _defaultLocale
    const prefix = ops?.prefix || ''
    const findInFallback = (path: string, params: any) => {
      const keys = path.split('.')
      let obj: any = transMap['en-US']
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
        let obj: any = transMap[locale]
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
      locale: locale
    }
  }
}

