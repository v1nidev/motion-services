module.exports = function (api) {
  api.cache(true)

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Unistyles plugin must run before React Compiler
      [
        'react-native-unistyles/plugin',
        {
          // Process all files in the app directory
          // root must be a string, not an array
          root: 'app',
          // Additional paths to process (for monorepo packages)
          autoProcessPaths: ['../../packages/ui/src'],
        },
      ],
      // React Compiler (if enabled via Expo experiments)
      // Note: Expo handles React Compiler automatically when enabled in app.json
    ],
  }
}
