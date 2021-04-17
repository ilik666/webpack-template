const path = require('path')
const { PATHS, fileName } = require('./helpers-utilities')

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

// JS loader
const JSLoader = {
	test: /\.js$/i,
	loader: 'babel-loader',
	exclude: /node_modules/,
}

//SCSS/SASS or CSS loader
const StyleLoader = mode => {
	let _loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
			// 	// publicPath: (resourcePath, context) => path.relative(path.dirname(resourcePath), context) + '/'
				publicPath: '../../'
			}
		},
		'css-loader'
	]

	mode ?
		_loaders.push('postcss-loader', 'sass-loader')
		: _loaders.push('sass-loader')

	return {
		test: /\.(s[ac]|c)ss$/i,
		use: _loaders
	}
}

// IMAGES loader
const IMAGESLoader = (mode = false) => ({
	test: /\.(png|jpe?g|gif|svg)$/i,
	use: [
		{
			loader: 'file-loader',
			options: {
				name: '[path][name].[ext]',
			}
		}
	]
})

// FONTS loader
const FONTSLoader = {
	test: /\.(woff(2)?|eot|ttf|otf|svg)$/i,
	use: [
		{
			loader: 'file-loader',
			options: {
				name: '[path][name].[ext]'
			}
		}
	]
}

module.exports = {
	JSLoader,
	StyleLoader,
	IMAGESLoader,
	FONTSLoader
}