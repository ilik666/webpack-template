const path = require('path')
const fs = require('fs')

const fileName = (ext, mode) => mode ? `[name].[contenthash].${ext}` : `[name].${ext}`

const PATHS = {
	src: path.resolve(__dirname, 'src'),
	dist: path.resolve(__dirname, 'dist'),
	assets: 'assets/'
}
const PAGE_PUG_DIR = `${PATHS.src}/pug/pages/`

// const PAGES_HTML = fs.readdirSync(PAGE_DIR).filter( fileName => fileName.endsWith('.html'))
const PAGES_PUG = fs.readdirSync(PAGE_PUG_DIR).filter( fileName => fileName.endsWith('.pug'))

module.exports = {
	PAGES_PUG,
	PAGE_PUG_DIR,
	PATHS,
	fileName
}