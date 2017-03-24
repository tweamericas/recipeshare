gulp         = require 'gulp'
sync         = require('browser-sync').create()
notify       = require 'gulp-notify'

coffee       = require 'gulp-coffee'
Object.assign = require 'object-assign'

source       = require 'vinyl-source-stream'
buffer       = require 'vinyl-buffer'
uglify       = require 'gulp-uglify'
clean        = require 'gulp-clean-css'
htmlmin      = require 'gulp-htmlmin'
concat       = require 'gulp-concat'
exec         = require('child_process').exec
stylus       = require 'gulp-stylus'
pug          = require 'gulp-pug'
sourcemaps   = require 'gulp-sourcemaps'
gulpif       = require 'gulp-if'
fs           = require 'fs'
objectus     = require 'objectus'

env = 'dev'

dirs =
  coffee: 'resources/coffee'
  pug:    'resources/views'
  stylus: 'resources/stylus'
  svg:    'resources/vector'

config = {}

objectify = (complete) ->
  secure = [ 'database', 'filesystems' ]
  exec 'php artisan larjectus:config', (error, result, stderr) ->
    notify error if error
    config = JSON.parse result
    pubconfig = config
    delete pubconfig[dim] for dim in secure
    fs.writeFile(dirs.coffee + '/config.coffee', "config = " + JSON.stringify(pubconfig) + ";", 'utf8', (cp) ->
      complete()
    )
  
#objectify()

gulp.task 'larjectus', (done) ->
  objectify (complete) ->
    done()

gulp.task 'goprod', ->
  env = 'prod'

gulp.task 'vendor', ->

  gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/json-browse/json-browse/jquery.json-browse.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/jszip/dist/jszip.js',
    'node_modules/croppie/croppie.js',
    'node_modules/blueimp-load-image/js/load-image.js',
    'node_modules/blueimp-load-image/js/load-image-meta.js',
    'node_modules/blueimp-load-image/js/load-image-exif.js',
    'node_modules/blueimp-load-image/js/load-image-exif-map.js',
    'node_modules/blueimp-load-image/js/load-image-orientation.js',

  ])

  .pipe(gulpif(env != 'dev',uglify()))
  .pipe(concat('vendor.js'))
  .pipe gulp.dest('public/javascript/')

  gulp.src([
    'node_modules/hint.css/hint.css',
    'node_modules/croppie/croppie.css',
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/slick-carousel/slick/slick-theme.css',
    'node_modules/json-browse/json-browse/jquery.json-browse.css',
  ])

  .pipe(gulpif(env != 'dev',clean()))
  .pipe(concat('vendor.css'))
  .pipe gulp.dest('public/css/')


gulp.task 'coffee', ['larjectus'], ->
  gulp.src(dirs.coffee + '/*.coffee')
    .pipe(gulpif(env == 'dev', sourcemaps.init(loadMaps: true)))
    .pipe(coffee(bare: true)
      .on('error', notify.onError((error) ->
        title: "Coffee error"
        message: error.message + "\r\n" + error.filename + ':' + error.location.first_line
        sound: 'Pop'
      )))
    .pipe(gulpif(env != 'dev',uglify()))
    .pipe(concat('bundle.js'))
    .pipe(gulpif(env == 'dev',sourcemaps.write()))
    .pipe(gulp.dest('./public/javascript'))
    .pipe(sync.stream())

gulp.task 'stylus', ['larjectus'], ->
  objectify ->
    gulp.src(dirs.stylus + '/main.styl')
      .pipe(gulpif(env == 'dev',sourcemaps.init(loadMaps: true)))
      .pipe(stylus(rawDefine: config: config)
      .on('error', notify.onError((error) ->
        title: 'Stylus error: ' + error.name
        message: error.message
        sound: 'Pop'
      )))
      .pipe(gulpif(env != 'dev',clean()))
      .pipe(gulpif(env == 'dev',sourcemaps.write()))
      .pipe(gulp.dest('public/css/'))
      .pipe(sync.stream())

gulp.task 'php', ->
  sync.reload()

watch = ->
  gulp.watch '**/*.php', ['php']
  gulp.watch 'config/**/*', ['larjectus','php','stylus']
  gulp.watch [dirs.coffee + '/**/*.coffee','!' + dirs.coffee + '/config.coffee'], ['coffee']
  gulp.watch dirs.stylus + '/**/*.styl', ['stylus']
  gulp.watch dirs.pug + '/**/*.pug', ['php']
  gulp.watch dirs.svg + '/**/*.svg', ['php']
  gulp.watch 'public/images/**/*', ['php']

gulp.task 'sync', ->
  sync.init
    notify: false
    open: false
    proxy:
      target: 'recipegen.dev:8080'
      reqHeaders: ->
        host: 'recipegen.dev:3000'
    ghostMode:
      clicks: false
      forms: false
      scroll: false
    scrollProportionally: false

  watch()

gulp.task 'watch', watch
gulp.task 'default', ['larjectus','stylus','vendor','coffee']
gulp.task 'prod', ['goprod','default']
