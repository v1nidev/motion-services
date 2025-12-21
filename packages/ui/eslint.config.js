const sharedConfig = require('@monorepo/eslint-config')

module.exports = [
  ...sharedConfig,
  {
    ignores: ['dist/*', 'node_modules/*'],
  },
]
