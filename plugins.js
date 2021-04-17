const { PATHS, fileName } = require('./helpers-utilities')

const _HTMLWebpackPlugin = require('html-webpack-plugin')
const _MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const _CopyWebpackPlugins = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const HTMLWebpackPlugin = mode => {
	return new _HTMLWebpackPlugin({
		template: `${PATHS.src}/index.html`,
		filename: './index.html',
		minify: {
			removeComments: mode,
			collapseWhitespace: mode
		},
		// inject: false
	})
}

const MiniCssExtractPlugin = mode => {
	return new _MiniCssExtractPlugin({
		filename: `./${PATHS.assets}css/${ fileName('css', mode) }`
	})
}

const CopyWebpackPlugins = new _CopyWebpackPlugins({
	patterns: [
		// Images:
		{
			from: `${PATHS.src}/${PATHS.assets}images`,
			to: `${PATHS.assets}images`
		},
		// Fonts:
		{
			from: `${PATHS.src}/${PATHS.assets}fonts`,
			to: `${PATHS.assets}fonts`
		},
		// Static (copy to '/'):
		{
			from: `${PATHS.src}/static`,
			to: ''
		}
	]
})

module.exports = {
	HTMLWebpackPlugin,
	MiniCssExtractPlugin,
	CopyWebpackPlugins,
	VueLoaderPlugin: new VueLoaderPlugin(),
	CleanWebpackPlugin: new CleanWebpackPlugin(),
}