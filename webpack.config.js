const path = require('path')
const { PATHS, fileName } = require('./helpers-utilities')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

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
			HTMLLoader,
			StyleLoader(isProd),
			IMAGESLoader(isProd),
			FONTSLoader
		]
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

	plugins: [
		HTMLWebpackPlugin(isProd),
		MiniCssExtractPlugin(isProd),
		// CopyWebpackPlugins,
		CleanWebpackPlugin
	]
}