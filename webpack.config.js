const path = require('path');
require('dotenv').config();
const DotEnv = require('dotenv-webpack');

module.exports = {
  mode: process.env.IS_PRODUCTION === 'true' ? 'production': 'development',
  entry: './src/service-workers/firebase-messaging-sw.js',
  output: {
    filename: './firebase-messaging-sw.bundled.js',
    path: path.resolve(__dirname, 'src/service-workers/dist')
  },
  plugins: [
    new DotEnv()
  ]
}
