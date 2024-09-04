import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'index.js',
  output: {
    file: 'dist/mobile-validator.min.js',
    format: 'umd',
    name: 'MobileValidator',
    globals: {
      'libphonenumber-js': 'libphonenumber'
    }
  },
  plugins: [
    resolve(),
    commonjs(),
    terser()
  ],
  external: ['libphonenumber-js']
};
