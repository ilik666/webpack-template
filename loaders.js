const MiniCssExtractPlugin = require("mini-css-extract-plugin")

// JS Loader
const VueLoader = {
	test: /\.js$/i,
	loader: 'babel-loader',
	exclude: /node_modules/,
}

// Vue Loader
const JSLoader = {
	test: /\.vue$/i,
	loader: 'vue-loader',
	options: {
		loader: 'vue-style-loader!css-loader!sass-loader'
	}
}

//SCSS/SASS or CSS loader
const StyleLoader = mode => {
	const _loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				publicPath: '/'
				// publicPath: '../../' // Найти оптимальное решение временно в лоб хД
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
const IMAGESLoader = {
	test: /\.(png|jpe?g|gif|svg)$/i,
	use: [
		{
			loader: 'file-loader',
			options: {
				name: '[path][name].[ext]'
			}
		}
	]
}

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
	VueLoader,
	JSLoader,
	StyleLoader,
	IMAGESLoader,
	FONTSLoader
}