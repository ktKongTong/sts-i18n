import { createTrans } from './trans';

import {describe, expect, it } from 'vitest';

describe('createTrans', () => {
  it('should throw an error if transMap is empty', () => {
    // @ts-expect-error expect error
    expect(() => createTrans({}, 'en')).toThrow('transMap shouldn\'t be empty');
  });

  it('should return correct translation string', () => {
    const transMap = {
      en: {
        welcome: 'Welcome',
        nested: {
          greeting: 'Hello',
          'another-greeting': 'Hello again',
        }
      },
      es: {
        welcome: 'Bienvenido',
        nested: {
          greeting: 'Hola'
        }
      }
    };
    const translator = createTrans(transMap, 'en');
    const {t} = translator({
      locale: 'es'
    })
    expect(t('welcome')).toBe('Bienvenido');
    expect(t('nested.greeting')).toBe('Hola');
  });

  it('should fallback to default if not exist', () => {
    const transMap = {
      en: {
        welcome: 'Welcome',
        nested: {
          greeting: 'Hello',
          'another-greeting': 'Hello again',
        }
      },
      es: {
        welcome: 'Bienvenido',
        nested: {
          greeting: 'Hola'
        }
      }
    };
    const translator = createTrans(transMap, 'en');
    const {t} = translator({
      prefix: 'nested',
      locale: 'es'
    })
    // @ts-expect-error expect error
    expect(t('welcome')).toBe('nested.welcome');
    expect(t('greeting')).toBe('Hola');
    expect(t('another-greeting')).toBe('Hello again');
  });

  it('should return fallback translation if locale not found', () => {
    const transMap = {
      en: {
        welcome: 'Welcome'
      }
    };
    const getLocaleMock = () => {
      return 'fr' as const
    };
    // @ts-expect-error expect error
    const translator = createTrans(transMap, 'en', getLocaleMock);
    const {t} = translator()
    expect(t('welcome')).toBe('Welcome');
  });

  it('should handle function translations', () => {
    const transMap = {
      en: {
        welcome: () => 'Welcome'
      }
    };
    const getLocaleMock = () => {
      return 'en' as const
    };
    const translator = createTrans(transMap, 'en', getLocaleMock);
    const {t} = translator()
    expect(t('welcome')).toBe('Welcome');
  });

  // Add more tests to cover different edge cases
});
