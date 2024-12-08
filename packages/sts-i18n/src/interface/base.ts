export type I18nNoArgFn = () => string

export type I18nVArgFn<T extends any[] = []> = (...args: T) => string
export type I18nFn<T extends any[] = []> = I18nNoArgFn | I18nVArgFn<T>
export type TransValueType<T extends any[] = any[]> = string | I18nVArgFn<T> | I18nNoArgFn

export type Tran = {
  [key: string]: Tran | TransValueType
}


export type IsPlainTran<T extends Tran> = T[keyof T] extends TransValueType ? true : false


type NoArgValueType = string | I18nNoArgFn


// if string =>  string | ()=> string
// if () => string => string | ()=> string
// if (p) => string  => string | ()=> string | (...params: any) => string
// but can't recognize () => string and (...param: any[]) => string
export type GetLooseValueType<T extends TransValueType> = T extends TransValueType ?
  T extends string ? NoArgValueType :
    T extends I18nFn<infer _> ?
      Parameters<T> extends Parameters<I18nNoArgFn> ? NoArgValueType :
        T extends I18nNoArgFn ? T | NoArgValueType:
          T extends I18nVArgFn<infer _> ? T | NoArgValueType : never
      : never
  : never


export type GetParamsFromType<T extends TransValueType> =
  T extends string ? [] :
    T extends I18nVArgFn<infer _> ? Parameters<T> : never
