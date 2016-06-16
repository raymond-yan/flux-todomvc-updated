var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var notify = require('gulp-notify'); // notify error ( X dialog )
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');


var path={
	originDir: "./app",
	main: "./app/js/app.js",
	html: "./app/*.html",
	css: "./app/css/*.css",
	img: "./app/img/*",
	destDir: "./build",
	destCSS: "./build/css",
	destImg: "./build/img"
};

/** gulp task browserify */

gulp.task( "bundle-dev", function() {

	return browserify({
		entries: path.main,
		debug: true
	})
	// 最優先編譯 jsx，確保後面其它 transform 運行無誤
	.transform( "reactify" )
	// 所有檔案合併為一，並指定要生成 source map. add callback function to print error.
	.bundle( function(err, buff) 
	{	
		if( err!= undefined )
		{
			console.log( '[Bundle]', err.toString());
			gulp.src('').pipe( notify('✖ Bunlde Failed ✖') );
			this.emit("end");
		}
	})
	// 利用 vinyl-source-stream 幫檔案取名字
    .pipe( source("bundle.js") )
    // 接著就回到 gulp 系統做剩下事
    // 這裏是直接存檔到硬碟
    .pipe( gulp.dest( path.destDir ) )
});


/**
 * Copy files except *.js in app to build( .html, .css, .img and etc );
 */

gulp.task('copy', function(){

	var html = gulp.src( path.html );
	
	//MinifyCSS before copy.
	var css = gulp.src( path.css )
	.pipe(minifyCSS({
		noAdvanced: false,
		keepBreaks:true,
		cache: true // 這是 gulp 插件獨有的
	}));

    var img = gulp.src( path.img );

    //copy to dest.
    css.pipe( gulp.dest( path.destCSS ) );
    img.pipe( gulp.dest( path.destImg ) );
    html.pipe( gulp.dest( path.destDir ) );
})

/**
 * 監控 app/ 下所有 js, jsx, html, css 變化就重新編譯
 */
gulp.task( 'watch', function() {
    // console.log( 'watch 跑' );
    gulp.watch( 'app/**/*', ['build-dev'] );
});

gulp.task( 'bundle-build', function(){
	return browserify({
		entries: path.main,
		debug: true
	})
	// 最優先編譯 jsx，確保後面其它 transform 運行無誤
	.transform( "reactify" )
	// 所有檔案合併為一，並指定要生成 source map. add callback function to print error.
	.bundle( function(err, buff) 
	{	
		if( err!= undefined )
		{
			console.log( '[Bundle]', err.toString());
			gulp.src('').pipe( notify('✖ Bunlde Failed ✖') );
			this.emit("end");
		}
	})
	// 利用 vinyl-source-stream 幫檔案取名字
    .pipe( source("bundle.js") )
    // need to convert the streaming vinyl file object given by source() 
    // with vinyl-buffer because gulp-uglify (and most gulp plugins) works on buffered vinyl file objects
    .pipe( buffer() )
    // then with buff object we can gulp-uglify it
    .pipe( uglify() )
    // 接著就回到 gulp 系統做剩下事
    // 這裏是直接存檔到硬碟
    .pipe( gulp.dest( path.destDir ) )
});

//build with development. don't uglify .js
gulp.task('build-dev', ['bundle-dev', 'copy'] );

/**
 * default mode: develop, watch.
 * build mode: just build with min js once.
 */
gulp.task('default', ['build-dev', "watch"]);
gulp.task('build', ['bundle-build', 'copy']);
