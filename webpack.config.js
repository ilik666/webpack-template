const { PATHS, fileName } = require('./helpers-utilities')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const {
		JSLoader,
		StyleLoader,
		IMAGESLoader,
		FONTSLoader } = require('./loaders')

const {
		HTMLWebpackPlugin,
		MiniCssExtractPlugin,
		CopyWebpackPlugins,
		CleanWebpackPlugin } = require('./plugins')

module.exports = {
	context: PATHS.src,

	mode: 'development',

	target: isProd ? 'browserslist': 'web',

	entry: {
		main: './index.js'
	},

	output: {
		filename: `./${PATHS.assets}js/${ fileName('js', isProd) }`,
		path: PATHS.dist,
		publicPath: ''
	},

	module: {
		rules: [
			JSLoader,
			IMAGESLoader(),
			StyleLoader(isProd),
			FONTSLoader
		]
	},

	plugins: [
		CleanWebpackPlugin,
		CopyWebpackPlugins,
		HTMLWebpackPlugin(isProd),
		MiniCssExtractPlugin(isProd)
	],

	resolve: {
		extensions: ['.js']
	},

	devtool: isProd ? false : 'source-map',

	devServer: {
		historyApiFallback: true,
		contentBase: PATHS.dist,
		open: true,
		compress: true,
		hot: true,
		port: 3000,
		overlay: {
			warnings: true,
			errors: true
		}
	}

}