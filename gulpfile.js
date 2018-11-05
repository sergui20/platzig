var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

gulp.task('styles', function () {
	gulp
		.src('index.scss')
		.pipe(sass())
		.pipe(rename('platzigram.css'))
		.pipe(gulp.dest('public'));
})

gulp.task('assets', function(){
	gulp
	.src('assets/*')
	.pipe(gulp.dest('public'));
})

function compile(watch) {
	var bundle = browserify('./source/platzigram.js', {debug: true});

	if (watch) {
		bundle = watchify(bundle)
		bundle.on('update', function () {
			console.log('---> Bundling...');
			rebundle();
		})
	}

	function rebundle() {
	  bundle
		.transform(babel, { "presets": ['env'] })
		.bundle()
		.on('error', function (err) {
			console.log(err);
			this.emit('end');
		})
		.pipe(source('platzigram.js'))
		.pipe(gulp.dest('public'));
	}

	rebundle();
}

gulp.task('build', function () {
	return compile();
});

gulp.task('watch', function () {
	return compile(true);
});

gulp.task('default', ['styles', 'assets', 'build'])

/*

Un package bundler es constructor de paquetes o ensamblador de paquetes. Una vez tengamos esos paquetes instalados en nuestro ordenador, lo que falta es unirlo. Es decir, unir nuestro código con ese código que son todas nuestras dependencia. Por tanto, lo que va a hacer el ensamblador se meter más código en medio de eso para que se puedan relacionar unos con otros. Por ejemplo, si en dos lugares utilizamos un módulo o paquete o libreria de terceros, no tengamos que copiar el código de esos módulos, así que solo copiará el código una vez, haciendo que los require se hagan de forma correcta y sin duplicar código y utilizar la versión que se debe utilizar.
Un programa que hacer eso es browserify.
Otro package bundler muy estandarizado el webpack
También existen los automatizadores. Esto automatizadores lo que hace es automatizar tareas por nosotros, es decir, crear el archivo bundler.js (este archivo final que incluye todo) puede requerir varias líneas de código, por tanto, vamos a utilizar como automatizador librerias como grunt (el cual tiene un archivo de configuración que nos permites personalizar mucho cómo queremos que haga las cosas) y gulp (que a través de un archivo gulpfile detallaremos paso a paso cómo queremos que arme nuestro bundler).
Y por último, tenemos los pre-procesadores de estilos. Lo que permiten es escribir menos código mediante variables, ciclos, etc… Como sass,_ less_, stylus…

*/