import riot  from 'rollup-plugin-riot';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: "public/main.js",
  dest: "public/dist/bundle.js",
  plugins: [
    riot({
      include: 'public/components/**/*.tag'
    }),
    nodeResolve({
      jsnext: true, // if provided in ES6
      main: true, // if provided in CommonJS
      browser: true // if provided for browsers
    }),
    commonjs(),
    babel({
      env: 'frontend',
      presets: ['es2015-rollup'],
      ignore: 'public/components/**/*.tag'
    })
  ]
}
