/* eslint-disable */
const glob = require('glob')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const typescript3 = require('@wessberg/rollup-plugin-ts')
const config = require('kcd-scripts/dist/config/rollup.config.js')
const {fromRoot, ifAnyDep} = require('kcd-scripts/dist/utils')

const ts = require('typescript')

const babelPluginIndex = config.plugins.findIndex(
  plugin => plugin.name === 'babel',
)
const cjsPluginIndex = config.plugins.findIndex(
  plugin => plugin.name === 'commonjs',
)

config.plugins[babelPluginIndex] = babel({
  runtimeHelpers: true,
  exclude: 'node_modules/**',
})

config.plugins[cjsPluginIndex] = commonjs({
  include: 'node_modules/**',

  namedExports: {
    'node_modules/react/index.js': [
      'cloneElement',
      'createContext',
      'Component',
      'createElement',
      // Ensure the forwardRef is available
      'forwardRef',
      // Enable the syntax for useEffect without React.
      'useState',
      'useEffect',
      'useContext',
      'useReducer',
      'useCallback',
      'useMemo',
      'useRef',
      'useImperativeHandle',
      'useLayoutEffect',
      'useDebugValue',
    ],
    'node_modules/react-dom/index.js': ['render', 'hydrate'],
    'node_modules/react-is/index.js': [
      'isElement',
      'isValidElementType',
      'isForwardRef',
    ],
  },
})

// If the typescript dependency is available in package.json we
// should enable Typescript support
if (ifAnyDep('typescript', true)) {
  config.plugins.push(
    typescript3({}),
    // typescript2({
    //   typescript: ts,
    // }),
  )
}

// Enable the use of index.ts as main entry point
if (ifAnyDep('typescript', true)) {
  const input = glob.sync(fromRoot(process.env.BUILD_INPUT || 'src/index.ts'))
  config.input = input
}

module.exports = config
