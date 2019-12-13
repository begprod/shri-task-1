const gulp = require('gulp');
const watch = require('gulp-watch');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const simpleVars = require('postcss-simple-vars');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const path = {
	build: './build',
	src: {
		css: './source/css/style.css',
		js: './source/js/script.js'
	},
	watch: {
		css: './source/css/**/*.css',
		js: './source/js/*.js'
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

gulp.task('js', () => {
	return gulp.src(path.src.js)
		.pipe(webpackStream({
			mode: 'production',
			output: {
				filename: 'script.js'
			},
			module: {
				rules: [
					{
						test: /\.(js)$/,
						exclude: /(node_modules)/,
						loader: 'babel-loader',
						query: {
							presets: ['env']
						}
					}
				]
			}
		}))
		.pipe(gulp.dest(path.build));
});

gulp.task('watch', () => {
	gulp.watch(path.watch.css, gulp.series('css'));
	gulp.watch(path.watch.js, gulp.series('js'));
});

gulp.task('default', gulp.series(
	gulp.series(
		'css',
		'js'
	),
	gulp.parallel(
		'watch'
	)
));