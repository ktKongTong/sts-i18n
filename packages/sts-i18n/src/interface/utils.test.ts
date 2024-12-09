import {AllPossibleRestKey, AllPrefix, ContainsDot, DotConcat, Prefix} from "./utils";
import {describe, expectTypeOf, it } from 'vitest';

describe('Type Tests', () => {
  describe('DotConcat', () => {
    it('should concatenate two strings with a dot', () => {
      type Result = DotConcat<'hello', 'world'>;
      expectTypeOf<Result>().toEqualTypeOf<'hello.world'>();
    });

    it('should return the second string if the first is empty', () => {
      type Result = DotConcat<'', 'world'>;
      expectTypeOf<Result>().toEqualTypeOf<'world'>();
    });
  });

  describe('ContainsDot', () => {
    it('should return true if the string contains a dot', () => {
      type Result = ContainsDot<'hello.world'>;
      expectTypeOf<Result>().toEqualTypeOf<true>();
    });

    it('should return false if the string does not contain a dot', () => {
      type Result = ContainsDot<'helloworld'>;
      expectTypeOf<Result>().toEqualTypeOf<false>();
    });
  });

  describe('Prefix', () => {
    it('should extract all possible prefixes from a string', () => {
      type Result = Prefix<'abc.test'>;
      expectTypeOf<Result>().toEqualTypeOf<'abc' | ''>();
    });

    it('should handle multiple dots correctly', () => {
      type Result = Prefix<'abc.test.def'>;
      expectTypeOf<Result>().toEqualTypeOf<'abc' | 'abc.test' | ''>();
    });
  });

  describe('AllPrefix', () => {
    it('should extract all possible prefixes from a string union', () => {
      type Result = AllPrefix<'abc.test' | 'de' | 'cdse.test.d'>;
      expectTypeOf<Result>().toEqualTypeOf<'abc' | 'cdse' | 'cdse.test' | ''>();
    });
  });

  describe('AllPossibleRestKey', () => {
    it('should remove the prefix and a dot from a string union', () => {
      type KeyUnion = 'abc.test' | 'abc.edf' | 'de' | 'cdse.test.d';
      type Result = AllPossibleRestKey<KeyUnion, 'abc'>;
      expectTypeOf<Result>().toEqualTypeOf<'test' | 'edf'>();
    });

    it('should return never if no such prefix exists', () => {
      type KeyUnion = 'abc.test' | 'abc.edf' | 'de' | 'cdse.test.d';
      type Result = AllPossibleRestKey<KeyUnion, 'xyz'>;
      expectTypeOf<Result>().toBeNever();
    });
  });
});
