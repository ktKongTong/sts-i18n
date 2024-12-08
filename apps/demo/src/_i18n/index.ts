import type { TransSchema } from "@ktfun/sts-i18n-react";
import zh from "./zh";
import en from "./en";
export const localMap = {
  'zh-CN': zh,
  'en-US': en,
}

export type AvailableLocales = keyof typeof localMap

export type EnTransSchema = TransSchema<typeof en>