import RollupImage from '@rollup/plugin-image';
import RollupTypescript from '@rollup/plugin-typescript'

export default [
  {
    input: './lib/index.js',
      output: {
        file: './build/bundle.js',
        format: 'es',
      },
    plugins: [
      RollupImage(),
      RollupTypescript({ lib: ["es5", "es6"], target: "es5" })
    ]
  }
]