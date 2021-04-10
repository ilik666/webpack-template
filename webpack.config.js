const path = require('path')

const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugins = require('copy-webpack-plugin')

const PATHS = {
	src: path.resolve(__dirname, 'src'),
	dist: path.resolve(__dirname, 'dist'),
}

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const fileName = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

module.exports = {
	context: PATHS.src,
	mode: 'development',

	entry: {
		main: './index.js'
	},

	output: {
		filename: `./js/${ fileName('js') }`,
		path: PATHS.dist,
		publicPath: ''
	},

	devServer: {
		historyApiFallback: true,
		contentBase: PATHS.dist,
		open: true,
		compress: true,
		hot: true,
		port: 3000
	},

	plugins: [
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({
			template: `./index.html`,
			filename: 'index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new MiniCssExtractPlugin({
			filename: `./css/${ fileName('css') }`
		}),
		// new CopyWebpackPlugins({
		// 	patterns: [
		// 		{ from: '', to: ''}
		// 	]
		// })
	],

	module: {
		rules: [
			{
				test: /\.js$/i,
				exclude: /node_modules/,
				use: [ 'babel-loader' ]
			},
			{
				test: /\.(?:|gif|png|jpe?g|svg)$/i,
				use: ['file-loader']
			},
			{
				test: /\.(s[ac]|c)ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: (resourcePath, context) => {
								return path.relative(path.dirname(resourcePath), context) +'/'
							}
						}
					},
					'css-loader',
					'sass-loader'
				]
			},
		]
	}
}