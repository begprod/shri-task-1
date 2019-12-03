const gulp = require('gulp');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const path = {
	build: './build',
	src: {
		css: './source/css/style.css'
	}
};

gulp.task('css', () => {
	const processors = [
		postcssImport,
		autoprefixer,
		cssnano
	];

	return gulp.src(path.src.css)
		.pipe(postcss(processors))
		.pipe(gulp.dest(path.build));
});