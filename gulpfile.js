var gulp = require('gulp');
var eslint = require('gulp-eslint');

var folderFiles = ['./**/*.js', '!./**/*gulpfile.js', '!./node_modules/**/*.*', '!./coverage/**/*.*'];

function handleError(err) {
  console.log('ERRO: ', err.toString());
  process.exit(1);
}

gulp.task('eslint', function(){
  gulp.src(folderFiles)
  .pipe(eslint())
  .pipe(eslint.format().on('data', function() {})) 
  .pipe(eslint.failAfterError().on('data', function() {}))
  .on('error', handleError);
});

gulp.task('lint', ['eslint']);

gulp.task('default', ['lint']);