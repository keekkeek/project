/**
 * Created by zhuke on 2016/10/5.
 */
// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// 检查脚本
gulp.task('jshint', function() {
    gulp.src('src/js/*.js')
        .pipe(jshint())
        // .pipe(jshint.reporter('default')); //默认在命令行里输出结果
        .pipe(jshint.reporter('gulp-jshint-html-reporter', {filename:'jshint-report.html'}));    //输出结果到 自定义的html文件

});


// 合并，压缩文件
gulp.task('js', function() {
    gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

// 默认任务
gulp.task('default', function(){
    gulp.run('jshint', 'js');

    //// 监听文件变化
    //gulp.watch('./js/*.js', function(){
    //  gulp.run('lint', 'sass', 'scripts');
    //});
});

