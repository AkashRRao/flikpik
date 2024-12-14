import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';

dotenv.config();

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [
    svelte({
      dev: !production,
      css: css => {
        css.write('public/build/bundle.css');
      }
    }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    postcss({
      extract: true,
      minimize: production,
    }),
    replace({
      preventAssignment: true,
      'import.meta.env.VITE_SOCKET_IO_URL': JSON.stringify(process.env.VITE_SOCKET_IO_URL)
    }),
    !production && serve({
      contentBase: 'public',
      port: 3000, // Change the port to 3000
      historyApiFallback: true
    }),
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};