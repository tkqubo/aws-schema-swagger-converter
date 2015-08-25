'use strict';
import * as gulp from 'gulp';
import * as browserify from 'browserify';
const source: any = require('vinyl-source-stream');

gulp.task('default', () => {
    process.env._ = 'purge';
    return browserify({ entries: ['index.js'] })
        .bundle()
        .pipe(source('build/bundle.js'))
        .pipe(gulp.dest('.'))
    ;
});
