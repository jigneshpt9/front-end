
var path = require("path");

module.exports = {
entry:[
	     'webpack/hot/only-dev-server',
      './js/main.js'],
      output: {
path: path.resolve(__dirname,'public'),
      filename: 'bundle.js'
      },
module: {
loaders: [
	 {
test: /\.js$/,
       loader:  "babel-loader",
       exclude: /node_modules/,
       query: {
presets: ['es2015', 'react']
       }
	 }
]
	}
}
