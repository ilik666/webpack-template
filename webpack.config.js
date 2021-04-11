const { PATHS, fileName } = require('./helpers-utilities')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const _MiniCssExtractPlugin = require("mini-css-extract-plugin")

const {
		JSLoader,
		HTMLLoader,
		StyleLoader,
		IMAGESLoader,
		FONTSLoader } = require('./loaders')

const {
	HTMLWebpackPlugin,
	MiniCssExtractPlugin,
	// CopyWebpackPlugins,
	CleanWebpackPlugin } = require('./plugins')

module.exports = {
	context: PATHS.src,
	mode: 'development',

	target: isProd ? 'browserslist': 'web',

	entry: {
		main: './index.js'
	},

	output: {
		filename: `./assets/js/${ fileName('js', isProd) }`,
		path: PATHS.dist,
		publicPath: ''
	},

	module: {
		rules: [
			JSLoader,
			StyleLoader(isProd),
			IMAGESLoader(isProd),
			FONTSLoader,
			HTMLLoader
		]
	},

	plugins: [
		HTMLWebpackPlugin(isProd),
		MiniCssExtractPlugin(isProd),
		// CopyWebpackPlugins,
		CleanWebpackPlugin
	],

	resolve: {
		extensions: ['.js']
	},

	devtool: 'source-map',

	devServer: {
		historyApiFallback: true,
		contentBase: PATHS.dist,
		open: true,
		compress: true,
		hot: true,
		port: 3000
	},

}