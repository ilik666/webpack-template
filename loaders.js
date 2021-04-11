const path = require('path')
const { PATHS, fileName } = require('./helpers-utilities')

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

// JS loader
const JSLoader = {
	test: /\.js$/i,
	exclude: /node_modules/,
	use: [ 'babel-loader' ]
}

// HTML loader
const HTMLLoader = {
	test: /\.html$/i,
	use: [ 'html-loader' ]
}

//SCSS/SASS or CSS loader
const StyleLoader = (mode) => {
	let _loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				publicPath: (resourcePath, context) => {
					return path.relative(path.dirname(resourcePath), context) + '/'
				}
			}
		},
		'css-loader',
	]

	mode ? _loaders.push('postcss-loader', 'sass-loader') : _loaders.push('sass-loader')

	return {
		test: /\.(s[ac]|c)ss$/i,
		use: _loaders
	}
}


// IMAGES loader
const IMAGESLoader = (mode) => ({
	test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
		use: [
		{
			loader: 'file-loader',
			options: {
				name: `./assets/${ fileName('[ext]', mode) }`
			}
		}
	]
})

// FONTS loader
const FONTSLoader = {
		test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
		use: [ 'file-loader' ]
}

module.exports = {
	JSLoader,
	HTMLLoader,
	StyleLoader,
	IMAGESLoader,
	FONTSLoader
}