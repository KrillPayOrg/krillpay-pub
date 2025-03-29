module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        root: ['.'],
        alias: {
          '@kp': './src',
          crypto: 'react-native-quick-crypto',
          stream: 'readable-stream',
          buffer: '@craftzdog/react-native-buffer',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env', // optional
        path: './.env', // optional: default is '.env'
      },
    ],
  ],
};
