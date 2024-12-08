import {GetLooseValueType, Tran, TransValueType} from "./base";


export type TransSchema<T extends Tran> = T extends Tran ? {
  [K in keyof T]: T[K] extends Tran ? TransSchema<T[K]> :
    T[K] extends TransValueType<infer Type> ? GetLooseValueType<T[K]> : never
} : never
