'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const del = require('del')

let paths = {
	styles:  {
		entry: './src/styles/**/*.scss',
		out: './public/styles/'
	},
	html: {
		entry: './src/index.html',
		out: './public/'
	}
}

gulp.task('sass', ()=>{
	return gulp.src(paths.styles.entry)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(paths.styles.out))
})

gulp.task('watch', ()=>{
	gulp.watch([paths.styles.entry, paths.html.entry], ['sass', 'copy'])
})

// gulp.task('sass:watch', ()=>{
// 	gulp.watch(paths.styles.entry)
// })

gulp.task('copy', ()=>{
	gulp.src(paths.html.entry).pipe(gulp.dest(paths.html.out))
})

gulp.task('clean', ()=> {
	return del([
			'./public/styles/*'
		])
})

gulp.task('default', ['clean', 'copy'], ()=>{
	gulp.start('sass', 'watch')
})

