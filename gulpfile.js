'use strict';

const gulp        = require('gulp'),
	  watch       = require('gulp-watch'),
	  prefixer    = require('gulp-autoprefixer'),
	  rigger      = require('gulp-rigger'),
	  rimraf      = require('rimraf'),
	  browserSync = require('browser-sync'),
	  sass        = require('gulp-sass'),
	  svgsprite   = require('gulp-svg-sprites'),
	  svgmin      = require('gulp-svgmin'),
	  uglify      = require('gulp-uglify'),
	  webpack     = require('webpack-stream'),
	  reload      = browserSync.reload;

const path = {
	build: {
		html: 'build/',
		distjs: 'build/js/',
		js: 'build/js/',
		css: 'build/css/',
		distcss: 'build/css/',
		images: 'build/img/',
		fonts: 'build/fonts/',
		svgsprite: 'build/img/'
	},
	src: {
		html: 'src/*.html',
		distjs: 'src/js/dist/*',
		js: 'src/js/main.js',
		style: 'src/precss/style.scss',
		distcss: 'src/precss/dist/*',
		images: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*',
		svgsprite: 'src/img/svg-sprite/**/*.*'
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		style: 'src/precss/**/*.scss',
		images: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*',
		svgsprite: 'src/img/svg-sprite/**/*.*'
	},
	clean: './build'
};

const config = {
	server: {
		baseDir: './build'
	},
	tunnel: false,
	host: 'localhost',
	port: 9000,
	logPrefix: 'MyBuild'
};

gulp.task('html:build', function () {
	gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
	gulp.src(path.src.js)
		.pipe(webpack({
			output: {
				filename: 'main.js',
			},
			module: {
				rules: [
					{
						exclude: /(node_modules)/,
						loader: 'babel-loader',
						query: {presets: ['@babel/preset-env']}
					}
				]
			}
		}))
		.pipe(uglify())
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({stream: true}));
});

gulp.task('dist:build', function() {
    gulp.src(path.src.distjs)
        .pipe(gulp.dest(path.build.distjs));
    gulp.src(path.src.distcss)
        .pipe(gulp.dest(path.build.distcss));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(prefixer())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.images)
        .pipe(gulp.dest(path.build.images))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('svgsprite:build', function () {
	gulp.src(path.src.svgsprite)
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		.pipe(svgsprite({
			mode: 'symbols', 
			preview: false, 
			svg: {symbols: 'sprite.svg'}
		}))
		.pipe(gulp.dest(path.build.svgsprite));
});

gulp.task('build', [  
    'html:build',
    'dist:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'svgsprite:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function() {
        gulp.start('html:build');
    });
    watch([path.watch.style], function() {
        gulp.start('style:build');
    });
    watch([path.watch.js], function() {
        gulp.start('js:build');
        gulp.start('dist:build');
    });
    watch([path.watch.images], function() {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function() {
        gulp.start('fonts:build');
    });
	watch([path.watch.svgsprite], function() {
        gulp.start('svgsprite:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);