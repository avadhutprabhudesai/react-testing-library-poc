const path = require('path');

module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: [
    'node_modules',
    path.join(__dirname),
    path.join(__dirname, 'src'),
  ],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style.mock.js'),
  },
  setupFilesAfterEnv: ['./test/setup-test.js'],
};
