module.exports = (api) => {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            components: './src/components',
            services: './src/services',
            pages: './src/pages',
            theme: './src/theme',
            utils: './src/utils',
            slices: './src/slices',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  }
}
