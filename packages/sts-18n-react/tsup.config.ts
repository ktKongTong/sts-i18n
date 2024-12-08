import { defineConfig, Options } from 'tsup'

// @ts-ignore
export default defineConfig((options) => {
  const commonOptions: Partial<Options> = {
    entry: ['src/**/*.[jt]s', 'src/**/*.[jt]sx', '!./src/**/*.d.ts', '!./src/**/*.test.[jt]s'],
    platform: 'node',
    target: 'node16',
    splitting: false,
    bundle: false,
    sourcemap: true,
    clean: true,
    ...options,
  }
  const productionOptions = {
    minify: true,
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
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