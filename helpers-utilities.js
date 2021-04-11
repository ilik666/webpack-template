const path = require('path')

const fileName = (ext, mode) => mode ? `[name].[contenthash].${ext}` : `[name].${ext}`

const PATHS = {
	src: path.resolve(__dirname, 'src'),
	dist: path.resolve(__dirname, 'dist'),
	assets: 'assets/'
}

module.exports = {
	PATHS,
	fileName
}