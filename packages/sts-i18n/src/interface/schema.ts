import {GetLooseValueType, Tran, TransValueType} from "./base";


export type TransSchema<T extends Tran, Strict extends boolean = true> =
  Strict extends true ? StrictTransSchema<T> : LooseTransSchema<T>

type StrictTransSchema<T extends Tran> = T extends Tran ? {
  [K in keyof T]: T[K] extends Tran ? StrictTransSchema<T[K]> :
    T[K] extends TransValueType<infer _> ? GetLooseValueType<T[K]> : never
} : never

type LooseTransSchema<T extends Tran> = T extends Tran ? {
  [K in keyof T]?: T[K] extends Tran ? LooseTransSchema<T[K]> :
    T[K] extends TransValueType<infer _> ? GetLooseValueType<T[K]> : never
} : never


