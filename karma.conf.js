var webpack = require('webpack');

module.exports = function( config ) {
	config.set({
		browsers: ['Chrome'],
		singleRun: true,
		frameworks: ['mocha'],
		files: [ 'test.webpack.js' ],
		preprocessors: {
			'test.webpack.js' : [ 'webpack', 'sourcemap']
		},
		reporters: [ 'dots'],
		webpack: {
			devtool: 'inline-source-map',
			module: {
				loaders: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					include: __dirname,
					
				},
				{
					test: /\.css$/,
					loader: "style-loader!css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]",
					include: __dirname
				},
				{ test: /\.md$/, loader: "html!markdownattrs?config=markdownattrsLoaderCustomConfig" },
				{
					test: /\.(png|svg|ttf|woff)$/,
					loader: 'file'
				},
				{
					test: /\.json$/,
					loader: 'json'
				}
				]
			}
		},
		webpackMiddleware: {
			noInfo: true
		}
	})
}