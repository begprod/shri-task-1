const gulp = require('gulp');
const watch = require('gulp-watch');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const simpleVars = require('postcss-simple-vars');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const path = {
	build: './build',
	src: {
		css: './src/css/style.css',
		js: './src/js/script.js'
	},
	watch: {
		css: './src/css/**/*.css',
		js: './src/js/*.js'
	}
};

gulp.task('css', () => {
	const processors = [
		postcssImport,
		simpleVars,
		autoprefixer,
		csso
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