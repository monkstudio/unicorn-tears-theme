//get project directory starting from public_html
// const projectDirectory = '';

module.exports = {
	// projectDirectory: projectDirectory,
	faviconFile: '/src/faviconData.json',

	// CSS
	//any plain css stylesheets can go here = they will be compiled to dist/css
	plainCSS: {
		test : '/src/css/test.css'
	},
	//the main sass stylesheet goes here
	styleSRC:'/src/scss/**/*.scss',
	styleDST:'/dist/css',

	// JS
	//any entry points go inside here
	scripts : {
		script : 'base.js'
	},
	jsSRC:'/src/js',
	jsDST:'/dist/js',

	// Images
	imgSRC:'/src/images',
	imgDST:'/dist/images',

	// Fonts
	woffSRC:'/src/fonts/**/*.+(woff|woff2)',
	woffDST:'/dist/fonts',

	// Asset Manifest
	manifestPath:'/dist/manifest.json',

	// Watch
	watchJS:'/src/js/!(imports)**',
	watchSCSS:'/src/scss/**/*.scss',
	watchCSS:'/!(dist)/**/*.css',
	watchIMG:'/src/images/*.+(png|jpg|jpeg|gif|svg)',
	watchFONTS:'/src/fonts/*',
	watchFAVICON:'/src/images/favicon.png',
	watchSTATIC:'/**/*.+(html|php)',

	BROWSER_SUPPORT: [
		'last 2 version',
		'> 1%',
		'ie >= 11',
	]
};