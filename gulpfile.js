const gulp = require('gulp');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const simpleVars = require('postcss-simple-vars');
const watch = require('gulp-watch');

const path = {
	build: './build',
	src: {
		css: './source/css/style.css'
	},
	watch: {
		css: './source/css/**/*.css'
	}
};

gulp.task('css', () => {
	const processors = [
		postcssImport,
		simpleVars,
		autoprefixer,
		cssnano
	];

	return gulp.src(path.src.css)
		.pipe(postcss(processors))
		.pipe(gulp.dest(path.build));
});

gulp.task('watch', () => {
	gulp.watch(path.watch.css, gulp.series('css'))
});

gulp.task('default', gulp.series(
	gulp.series(
		'css'
	),
	gulp.parallel(
		'watch'
	)
));