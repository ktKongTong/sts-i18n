import { describe, it, expectTypeOf, expect } from 'vitest';
import { GetLooseValueType, GetParamsFromType, I18nNoArgFn, I18nVArgFn } from './base';
const simpleString: I18nNoArgFn = () => 'Hello World';
const simpleTemplate =(name: string) => `Hello ${name}`
const complexTemplate = (name: string, greeting: string) => `${greeting} ${name}`;

describe('GetLooseValueType', () => {
  it('should return NoArgValueType for a simple string', () => {
    expectTypeOf<GetLooseValueType<string>>().toEqualTypeOf<string | I18nNoArgFn>();
  });

  it('should return NoArgValueType for a simple I18nNoArgFn', () => {
    expectTypeOf<GetLooseValueType<I18nNoArgFn>>().toEqualTypeOf<string | I18nNoArgFn>();
  });

  it('should return the original function for a simple I18nVArgFn', () => {
    expectTypeOf<GetLooseValueType<I18nVArgFn>>().toEqualTypeOf<string | I18nVArgFn | I18nNoArgFn>();
  });

  it('should return the original function for a complex I18nVArgFn', () => {
    expectTypeOf<GetLooseValueType<typeof complexTemplate>>().toEqualTypeOf<typeof complexTemplate | string | I18nVArgFn>();
  });
});

describe('GetParamsFromType', () => {
  it('should return an empty array for a simple string', () => {
    expectTypeOf<GetParamsFromType<string>>().toEqualTypeOf<[]>();
  });

  it('should return parameters for a simple I18nVArgFn', () => {
    expectTypeOf<GetParamsFromType<typeof simpleTemplate>>().toEqualTypeOf<[string]>();
  });

  it('should return parameters for a complex I18nVArgFn', () => {
    expectTypeOf<GetParamsFromType<typeof complexTemplate>>().toEqualTypeOf<[string, string]>();
  });
});

describe('Type Inference Tests', () => {
  it('should correctly infer types for simple string', () => {
    const value: GetLooseValueType<string> = simpleString;
    expect(value()).toBe('Hello World');
  });

  it('should correctly infer types for I18nNoArgFn', () => {
    const value: GetLooseValueType<I18nNoArgFn> = simpleString;
    expect(value()).toBe('Hello World');
  });

  it('should correctly infer types for I18nVArgFn with simple template', () => {
    const value = simpleTemplate;
    expect(value('John')).toBe('Hello John');
  });

  it('should correctly infer types for I18nVArgFn with complex template', () => {
    const value: GetLooseValueType<typeof complexTemplate> = complexTemplate;
    expect(value('John', 'Good morning')).toBe('Good morning John');
  });
});
