const { PAGES_PUG, PATHS, fileName } = require('./helpers-utilities')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const {
		PugLoader,
		VueLoader,
		JSLoader,
		StyleLoader,
		IMAGESLoader,
		FONTSLoader } = require('./loaders')

const {
		VueLoaderPlugin,
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
		filename: `./${PATHS.assets}js/${ fileName('js', true) }`,
		path: PATHS.dist,
		publicPath: ''
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					name: 'vendors',
					chunks: "all",
					enforce: true
				}
			}
		}
	},

	module: {
		rules: [
			PugLoader,
			VueLoader,
			JSLoader,
			IMAGESLoader,
			StyleLoader(isProd),
			FONTSLoader
		]
	},

	plugins: [
		CleanWebpackPlugin,
		CopyWebpackPlugins,
		MiniCssExtractPlugin(isProd),
		VueLoaderPlugin,
		...PAGES_PUG.map( page => HTMLWebpackPlugin(page, isProd) )
	],

	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.js'
		},
		extensions: ['.js', '.vue']
	},

	devtool: isProd ? false : 'source-map',

	devServer: {
		contentBase: PATHS.dist,
		historyApiFallback: true,
		open: true,
		compress: true,
		// hot: true,
		port: 3000,
		overlay: true
	}
}