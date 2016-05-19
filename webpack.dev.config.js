var hook = require('css-modules-require-hook');
var hljs = require('highlight.js'); 

module.exports = function checkMode(app){
	
	hook({
		generateScopedName: '[name]__[local]___[hash:base64:5]',
	});
	
	require('asset-require-hook')({
		extensions: ['md']
		})
	
	if(app){
		var path = require('path');
		var webpack = require('webpack');
		var config = {
			debug: true,
			context: __dirname,
			devtool: 'eval',
			entry: [
				'webpack-hot-middleware/client',
				'./client/client'
			],
			resolve: {
				root: [ __dirname ],
				extensions: ["", ".js", ".jsx"]
			},
			output: {
				path: path.join(__dirname, '/public/build'),
				publicPath: '/build',
				filename: 'bundle.js'
			},
			plugins: [
				new webpack.optimize.OccurenceOrderPlugin(),
				new webpack.HotModuleReplacementPlugin(),
				new webpack.NoErrorsPlugin(),
				new webpack.IgnorePlugin(new RegExp("asyncBeApi")),
				new webpack.optimize.UglifyJsPlugin({
					compress: {
						warnings: false
					}
				})
			],
			module: {
				loaders: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					include: __dirname,
					query: {
						plugins: [
							[
								'react-transform', 
								{
									'transforms': [{
										'transform': 'react-transform-hmr',
										'imports': ['react'],
										'locals': ['module']
									}]
								}
							]
						]
					}
				},
				{
					test: /\.css$/,
					loader: "style-loader!css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]",
					include: __dirname
				},
				{ test: /\.md$/, loader: "html!markdownattrs?config=markdownattrsLoaderCustomConfig" },
				{
					test: /\.png$/,
					loader: 'file'
				}
				]
			},
			markdownattrsLoaderCustomConfig: {
				html: true,
				highlight: function (str, lang) {
					if (lang && hljs.getLanguage(lang)) {
					try {
						return '<pre class="hljs"><code>' +
							hljs.highlight(lang, str, true).value +
							'</code></pre>';
					} catch (__) {}
					}

					return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
				}
			}
		};
		var compiler = webpack(config);
		
		app.use(require("webpack-dev-middleware")(compiler, {
			noInfo: true, 
			publicPath: config.output.publicPath,
			stats: {
				colors: true 
			}

		}));
		app.use(require("webpack-hot-middleware")(compiler));	
	}
};