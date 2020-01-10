import buble from '@rollup/plugin-buble';
import multi from '@rollup/plugin-multi-entry';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import strip from '@rollup/plugin-strip';
import sucrase from '@rollup/plugin-sucrase';

export default {
  input: 'src/*.ts',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [
    multi(),
    commonjs(),
    resolve({ extensions: ['.js', '.ts'] }),
    sucrase({
      exclude: ['node_modules/**'],
      transforms: ['typescript']
    }),
    strip({ labels: ['unittest', 'test'] }),,
    buble()
  ],
  preserveModules: true
};
