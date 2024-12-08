import { defineConfig, Options } from 'tsup'

// @ts-ignore
export default defineConfig((options) => {
  const commonOptions: Partial<Options> = {
    entry: ['src/**/*.[jt]s', '!src/**/*.spec.ts'],
    platform: 'node',
    target: 'node16',
    splitting: false,
    bundle: false,
    sourcemap: true,
    clean: true,
    ...options,
  }
  return [
    {
      ...commonOptions,
      format: ['esm'],
      clean: true,
      outDir: './dist/esm/',
      bundle: false,
      dts: false
    },
    // CJS
    {
      ...commonOptions,
      clean: true,
      format: ['cjs'],
      outDir: './dist/cjs/',
    },
  ]
})