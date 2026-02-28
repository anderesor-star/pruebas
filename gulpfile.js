var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./"
      //entre las comillas el .html que quiera que se actualice. Cada vez que quiera cambiar el doc tengo que cambiar este
    }
  });

  gulp.watch("*.html").on("change", reload);
});
//meter en el powershell "gulp serve" para que empiece. Ctr+C para pararlo