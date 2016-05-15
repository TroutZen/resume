const gulp = require('gulp')
const sass = require('sass')

let paths = {
	styles:  {
		entry: './styles/**/*.scss'
	}
}

gulp.task('sass', ()=>{
	return gulp.src(paths.styles.entry)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('.css'))
})

gulp.task('sass:watch', ()=>{
	gulp.watch(paths.styles.entry)
})