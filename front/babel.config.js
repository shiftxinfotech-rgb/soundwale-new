module.exports = function (api) {
  api.cache(true);
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@assets': './src/assets/index.tsx',
            '@components': './src/components/index.tsx',
            '@core': './src/core/index.tsx',
            '@features': './src/features/index.tsx',
            '@hooks': './src/hooks/index.tsx',
            '@providers': './src/providers/index.tsx',
            '@navigator': './src/navigators/index.tsx',
            '@screens': './src/screens/index.tsx',
            '@services': './src/services/index.tsx',
            '@theme': './src/theme/index.tsx',
            '@util': './src/util/index.tsx',
            '@data': './src/data/index.tsx',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      ...(isProduction
        ? [['transform-remove-console', {exclude: ['error', 'warn']}]]
        : []),
      'react-native-reanimated/plugin',
    ],
  };
};
