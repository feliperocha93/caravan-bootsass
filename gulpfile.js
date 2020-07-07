// Adiciona os modulos instalados
const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

// Funçao para compilar o SASS e adicionar os prefixos
function compilaSass() {
  return gulp
    .src("css/scss/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
}

// Função para juntar o JS
function gulpJS() {
  return gulp
    .src([
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
      "node_modules/bootstrap/",
      "js/modules/*.js",
    ])
    .pipe(concat("main.js"))
    .pipe(
      babel({
        presets: ["env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("js/"))
    .pipe(browserSync.stream());
}

// Função para iniciar o browser
function browser() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
}

// Função de watch do Gulp
function watch() {
  gulp.watch("css/scss/*.scss", compilaSass);
  gulp.watch("js/modules/*.js", gulpJS);
  gulp.watch(["*.html"]).on("change", browserSync.reload);
}

// Tarefa padrão do Gulp, que inicia o watch e o browser-sync
exports.compilaSass = compilaSass;
exports.gulpJS = gulpJS;
exports.browser = browser;
exports.watch = watch;
exports.default = gulp.parallel(compilaSass, gulpJS, browser, watch);
