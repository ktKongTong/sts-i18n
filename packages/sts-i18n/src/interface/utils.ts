

// concat string
type Concat<Middle extends string, Prefix extends string = '', Suffix extends string = ''> = `${Prefix}${Middle}${Suffix}`;

// concat string with dot
export type DotConcat<T extends string, R extends string> =
  T extends '' ? R :
    T extends '' ? R : `${T}.${R}`

// check if string contain dot
export type ContainsDot<T extends string> = T extends `${infer _}.${infer _}` ? true : false

/**
 *  extract all possible prefix (split with dot) from string
 *  @example
 *  type P = Prefix<'abc.test'>
 *  // expect 'abc'  | ''
 */
// export type Prefix<T extends string> = (T extends `${infer P}.${infer Rest}` ?
//   ContainsDot<Rest> extends true ? `${P}.${Prefix<Rest>}` : P | ''
//   : never);

export type Prefix<T extends string, P extends string = ''> = (T extends `${infer P}.${infer Rest}` ? P | DotConcat<P, Prefix<Rest, P>> : never)

/**
 *  extract all possible prefix (split with dot) from string union, always include '';
 *  @example
 *  type P = AllPrefix<'abc.test' | 'de' | 'cdse.test.d'>
 *  // expect 'abc' | 'cdse' | 'cdse.test' | ''
 */
export type AllPrefix<T extends string> = Prefix<T> | ''

/**
 *  remove prefix and a dot for string union, if no such prefix return never
 *  @example
 *  type KeyUnion = 'abc.test' | 'abc.edf' | 'de' | 'cdse.test.d'
 *  type RestKey =  AllPossibleRestKey<KeyUnion, 'abc'>
 *  // expect 'test' | 'edf'
 */
export type AllPossibleRestKey<T extends string, Prefix extends string = ''> = Prefix extends '' ? T : T extends `${Prefix}.${infer Rest}` ?   Rest : never
