module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: '.',
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.android.js',
            '.android.tsx',
            '.ios.js',
            '.ios.tsx',
          ],
          alias: {
            '@components': './src/components',
            '@pages': './src/pages',
          }
        }
      ],
      'react-native-reanimated/plugin'
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
