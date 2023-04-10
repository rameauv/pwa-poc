const path = require('path');

module.exports = {
  entry: './src/firebase-messaging-sw.js',
  output: {
    filename: './firebase-messaging-sw.bundled.js',
    path: path.resolve(__dirname, 'src')
  }
}
