const originalPreset = require('kcd-scripts/babel')
const {ifAnyDep} = require('kcd-scripts/dist/utils')

// Check if the typescript dependency is available
const isTypeScriptEnabled = ifAnyDep('typescript', true, false)

const customPreset = api => {
  api.cache(true)
  const evaluatedPreset = originalPreset(api)

  const presets = [
    isTypeScriptEnabled && [require('@babel/preset-typescript').default],
    // Inherit existing presets
    ...evaluatedPreset.presets,
  ]

  const plugins = [
    ['no-side-effect-class-properties'],
    isTypeScriptEnabled && [
      require('@babel/plugin-proposal-decorators').default,
      false,
    ],
    require('@babel/plugin-proposal-export-namespace-from').default,
    require('@babel/plugin-proposal-optional-chaining').default,
    require('@babel/plugin-proposal-nullish-coalescing-operator').default,
    ...evaluatedPreset.plugins,
  ]

  return {
    presets,
    plugins,
    overrides: [
      isTypeScriptEnabled && {
        test: /\.tsx?$/,
        plugins: [
          [
            require('@babel/plugin-proposal-decorators').default,
            {legacy: true},
          ],
        ],
      },
    ],
  }
}

module.exports = customPreset
