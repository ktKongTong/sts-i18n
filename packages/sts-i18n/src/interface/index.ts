import {GetLooseValueType, GetParamsFromType, Tran, TransValueType} from "./base";
import { AllPossibleRestKey, AllPrefix, DotConcat } from "./utils";


/**
 * extract all path to leaf
 * @example
 * ```typescript
 * //expect a | b.b1 | b.b2.b21 | b.b2.b22
 * type P = LongestPath<{
 *   a: string,
 *   b: {
 *     b1: string,
 *     b2: {
 *       b21: string,
 *       b22: () =>string
 *     }
 *   }
 * }>
 * ```
 */

export type LongestPath<T extends Tran> = _LongestPath<T, ''>
/**
 * equal to this function ↓
 * @code
 * ```ts
 * const isTranValue = (obj: Tran | TransValueType) => typeof obj === 'string' || typeof obj === 'function'
 *
 * const dotConcat = (prefix: string, str: string) => prefix && str ? `${prefix}.${str}` : str
 *
 * function _longestPath(obj: Tran, prefix: string = ''): string[] {
 *   const p = []
 *   for (const key in obj) {
 *     const curPrefix = dotConcat(prefix, key)
 *     let v = [curPrefix]
 *     if (!isTranValue(obj[key])) {
 *       v = _longestPath(obj[key], curPrefix)
 *     }
 *     p.push(...v)
 *   }
 *   return p;
 * }
 * ```
 */
type _LongestPath<T extends Tran, Prefix extends string> =
    {
      [K in keyof T]: K extends string ?
        T[K] extends Tran ?
          _LongestPath<T[K], DotConcat<Prefix, K>>
          : DotConcat<Prefix, K>
      : never
    }[keyof T]


// utils type
export type AllPaths<T extends Tran> = LongestPath<T>

export type AllTransPrefix<T extends Tran> = AllPrefix<AllPaths<T>>

export type TransRestKey<
  T extends Tran,
  Prefix extends AllTransPrefix<T>,
> = AllPossibleRestKey<AllPaths<T>, Prefix>


export type MergePath<
  T extends Tran,
  Prefix extends AllTransPrefix<T>,
  Rest extends TransRestKey<T, Prefix>
> = Prefix extends '' ?
  Rest extends AllPaths<T> ? Rest : never
  : Rest extends AllPossibleRestKey<AllPaths<T>, Prefix>
    ? `${Prefix}.${Rest}`  extends AllPaths<T> ? `${Prefix}.${Rest}` : never
    : never


export type GetValueTypeByPath<Cur extends Tran, P extends AllPaths<Cur>>
  = P extends `${infer CurKey}.${infer Rest}`
  ? Cur[CurKey] extends Tran ?
    Rest extends AllPaths<Cur[CurKey]> ? GetValueTypeByPath<Cur[CurKey], Rest> : never
    : never
  : Cur[P]


export type GetParamsFromPath<T extends Tran, P extends AllPaths<T>> =
  GetValueTypeByPath<T, P> extends TransValueType ?
  GetParamsFromType<GetValueTypeByPath<T, P>> : never


export type GetParamsFromPrefixAndRestKey<
  T extends Tran,
  Prefix extends AllTransPrefix<T>,
  Rest extends TransRestKey<T, Prefix>
> = MergePath<T, Prefix, Rest> extends AllPaths<T> ?
    GetValueTypeByPath<T, MergePath<T, Prefix, Rest>> extends TransValueType ?
      GetParamsFromType<GetValueTypeByPath<T, MergePath<T, Prefix, Rest>>>
    : never
  : never