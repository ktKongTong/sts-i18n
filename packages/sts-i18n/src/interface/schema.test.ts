import {describe, expectTypeOf, it } from 'vitest';
import {TransSchema} from "./schema";

describe('TransSchema in strict mode', () => {
  it('should correctly infer types for nested Trands', () => {
    type StrictMockTransSchema = TransSchema<{
      a: string;
      b: {
        c: (_: string) => string;
        d: string;
      };
    }, true>;
    const example: StrictMockTransSchema = {
      a: 'a',
      b: {
        c: "hello",
        d: 'd'
      }
    };
    expectTypeOf(example).toEqualTypeOf<StrictMockTransSchema>();
  });
});

describe('TransSchema in non-strict mode', () => {
  it('should correctly infer types for nested Trands with optional properties', () => {
    type LooseMockTransSchema = TransSchema<{
      a: string;
      b: {
        c: (_: string) => string;
        d: string;
      };
    }, false>;
    // lack of d
    const example: LooseMockTransSchema = { a: 'a', b: { c: "hello" }
    };
    expectTypeOf(example).toEqualTypeOf<LooseMockTransSchema>();
  });
});

