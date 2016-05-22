'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const del = require('del')
const runSequence = require('run-sequence')

let paths = {
	styles:  {
		entry: './src/styles/**/*.scss',
		out: './public/styles/'
	},
	html: {
		entry: './src/index.html',
		out: './public/'
	},
	nm: {
		entry: './node_modules/**/*',
		out: './public/node_modules'
	}
}

gulp.task('sass', ()=>{
	return gulp.src(paths.styles.entry)
		.pipe(sass({includePaths: ['src/styles/fonts/']}).on('error', sass.logError))
		.pipe(gulp.dest(paths.styles.out))
})

gulp.task('watch', ()=>{
	gulp.watch([paths.styles.entry, paths.html.entry], ['sass', 'copy:html'])
})

gulp.task('copy:html', ()=>{
	gulp.src(paths.html.entry).pipe(gulp.dest(paths.html.out))
})

gulp.task('copy:nm', ()=>{
	gulp.src(paths.nm.entry).pipe(gulp.dest(paths.nm.out))
})

gulp.task('clean', ()=> {
	return del([
			'./public/**/*',
			'./public/node_modules/**/*'
		])
})

gulp.task('default', ()=>{
	runSequence('clean', ['copy:html', 'copy:nm', 'sass'], 'watch')
	// gulp.start('sass', 'watch')
})

