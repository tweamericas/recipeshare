var _,
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

_ = {
  i: function() {
    return this.console = setInterval(this.detect.bind(this), 200);
  },
  p: {
    offing: false,
    offtime: 0
  },
  turn: function(el, remove, add) {
    if (remove == null) {
      remove = false;
    }
    if (add == null) {
      add = false;
    }
    if (!(el instanceof jQuery)) {
      el = $(el);
    }
    if (remove !== false) {
      el.removeClass(remove);
    }
    if (add !== false) {
      el.addClass(add);
    }
    return true;
  },
  off: function(el, p) {
    if (p == null) {
      p = {};
    }
    if (p.offing && p.offtime > 0) {
      this.turn(el, false, 'offing');
      setTimeout((function(_this) {
        return function() {
          _this.turn(el, 'offing', false);
          return _this.turn(el, 'on', 'off');
        };
      })(this), p.offtime * 1000 + 100);
    } else {
      this.turn(el, 'on', 'off');
    }
  },
  on: function(el, p) {
    return this.turn(el, 'off', 'on');
  },
  swap: function(el, p) {
    if (!(el instanceof jQuery)) {
      el = $(el);
    }
    if (el.hasClass('off')) {
      this.on(el, p);
    } else {
      this.off(el, p);
    }
  },
  encode: function(str) {
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
  },
  t: function(category, action, label, value) {
    return ga('send', 'event', category, action, label, value);
  },
  rand: function(min, max) {
    return Math.floor(Math.random() * max) + min;
  },
  fit: function(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio;
    ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return {
      width: srcWidth * ratio,
      height: srcHeight * ratio
    };
  },
  hex2rgb: function(hex) {
    var result;
    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    };
  },
  objc: function(obj) {
    var k;
    return ((function() {
      var results;
      results = [];
      for (k in obj) {
        if (!hasProp.call(obj, k)) continue;
        results.push(k);
      }
      return results;
    })()).length;
  },
  load: function(script, initiate, complete) {
    var el;
    el = document.createElement('script');
    el.type = 'text/javascript';
    el.src = script;
    el.addEventListener('load', function(e) {
      if (typeof complete === 'function') {
        complete();
      }
      if (initiate !== void 0 && initiate !== false) {
        return window[initiate].i();
      }
    }, false);
    return document.body.appendChild(el);
  },
  jinit: function() {
    return $.ajaxSetup({
      dataType: "json"
    });
  },
  patch: function(url, data) {
    var jpatch;
    this.jinit();
    jpatch = $.ajax({
      url: url,
      data: data,
      type: 'PATCH'
    });
    jpatch.fail(function(response) {
      return this.fail(response);
    });
    return jpatch;
  },
  get: function() {
    var args, jget;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    this.jinit();
    jget = $.get.apply($, args);
    jget.fail((function(_this) {
      return function(response) {
        _this.fail(response);
        return jget.fail(response);
      };
    })(this));
    return jget;
  },
  post: function() {
    var args, jpost;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    jpost = $.post.apply($, args);
    jpost.fail((function(_this) {
      return function(response) {
        _this.fail(response);
        return jpost.fail(response);
      };
    })(this));
    return jpost;
  },
  fail: function(response) {
    var body, editor, error, file, pug, ref, ref1;
    error = (ref = response.responseJSON) != null ? (ref1 = ref.errors) != null ? ref1[0] : void 0 : void 0;
    if (error === void 0) {
      return Prompt.i(response.status, response.statusText);
    }
    pug = error.message.match(/Pug Error: (.*?):([0-9]+)/);
    if (pug !== null) {
      error.message = error.message.replace(/Pug Error: (.*?):([0-9]+)/, '');
      error.file = pug[1];
      error.line = pug[2];
    }
    file = this.encode("" + error.file);
    switch (config.app.editor) {
      case 'macvim':
        editor = 'mvim://open?url=file://';
        break;
      case 'sublime':
        editor = 'subl://open?url=file://';
        break;
      case 'emacs':
        editor = 'emacs://open?url=file://';
        break;
      case 'textmate':
        editor = 'textmate://open/?url=file://';
        break;
      case 'phpstorm':
        editor = 'phpstorm://open?file=';
    }
    if (error.file !== null) {
      body = "<pre>" + error.message + "</pre>\n<a href=\"" + editor + file + "&line=" + error.line + "\"><b>" + error.file + ":" + error.line + "</b></a>";
    } else {
      body = error.message;
    }
    return Prompt.i(error.type, body, ['OK']);
  },
  methods: function(obj) {
    var i, m, res;
    res = [];
    for (i in obj) {
      m = obj[i];
      if (typeof m === 'function') {
        res.push(m);
      }
    }
    return res;
  },
  llc: function() {
    var ascii;
    ascii = "\n%cmmm/............................................................./mmm\nmmo................-:://::-.......-:::::::::::::-........-::///:-.omm\nmd-.............:+yhddddddhy+-..../ddddddddddddd+....../shdddddddyodm\nmo.............-hmmmhyyyydmmmh:.../mmmmhhhhhhhhh+....:ydmmdhyyyhddoom\nm-..............-ss:-....-ymmmy.../mmmm---------....:dmmms:-...-:/.-m\nd.........................ymmmy.../mmmm-/+ooo+:-....ymmmy-:+ooo+/-..d\nh.......................:smmmd:.../mmmmhmmmmmmdh+...dmmmshdmmmmmmhs-h\nh.....................:sdmmdy:....:hhdho+//+ymmmm+..dmmmdyo//+sdmmmhh\nd..................-+ydmmdy/.......--:.......smmmh..ymmms......:mmmmm\nm-..............-:shmmmds/-----....:s/--...-:hmmms..:dmmd/-...-ommmmm\nmo..............hmmmmmmhhhhhhhh...+dmmdhyyyhdmmmy-.../hmmmhyyyhmmmdhm\nmd-.............ddddddddddddddd...-+shdddddddhy/-.....-oydddddddho:dm\nmmo.............:::::::::::::::.......-:///::-...........-:///:-..omm\nmmm/............................................................./mmm\n\n:: syntactic sugar by 256\n:: http://256.io/\n:: " + config.meta.repo;
    return console.log(ascii, "color: grey; font-family: Menlo, monospace;");
  },
  detect: function() {
    if (((window.outerHeight - window.innerHeight) > 100) || ((window.outerWidth - window.innerWidth) > 100)) {
      return clearInterval(this.console);
    }
  }
};

_.i();

var config;

config = {
  "view": {
    "paths": ["/Users/k/recipegen/resources/views"],
    "compiled": "/Users/k/recipegen/storage/framework/views"
  },
  "color": {
    "white1": "#ffffff",
    "grey1": "#DEDEDE",
    "black1": "#000000",
    "black2": "#241F20",
    "beige1": "#FAF9Ed",
    "beige2": "#FAF9Ed",
    "gold1": "#8d734a",
    "brown1": "#93734C",
    "brown2": "#8E744B",
    "orange1": "#E8696C",
    "red1": "#C8004F",
    "cyan1": "#269A76",
    "facebook_blue": "#4867AA",
    "instagram_or": "#FF7804",
    "twitter_blue": "#00ACED"
  },
  "copy": {
    "download": {
      "copy": "Press and hold your image to save.",
      "instagram": "After you've saved tap here"
    },
    "progress": {
      "uploading": ["Leveling flour...", "Preheating oven...", "Measuring spices..."],
      "processing": ["Preparing glaze...", "Prepping garnishes...", "Buttering pans..."],
      "complete": "Ready to Share!"
    },
    "step": {
      "cancel": "CANCEL",
      "instructions": {
        "1": "Upload an image of your ingredients (We won’t tell if you leave out your secret ingredient!)",
        "2": "Upload an image of your freshly made dish (That smells scrumptious!)",
        "3": "Upload an image of how you enjoyed your dish. With friends? With family? Or with your favorite bottle of Beringer Main &amp; Vine!"
      }
    },
    "steps": {
      "copy1": "Upload an image of your ingredients (We won’t tell if you leave out your secret ingredient!)",
      "copy2": "Upload an image of your freshly made dish (That smells scrumptious!)",
      "copy3": "Upload an image of your plated or decorated dish (Or the empty plate, because we’ve all nibbled straight off the cooling rack!)"
    },
    "tandc": ["The filters provided to you hereunder by Beringer including, but not limited to, all text, illustrations, files, images, software, scripts, graphics, photos, sounds, music, videos, and content, materials (collectively, the “Filters”) and all intellectual property rights to the same are owned by Beringer, its licensors, or both.", "Except for the limited use rights granted to you in these Terms of Use, you shall not acquire any right, title or interest in the Filters.", "Any rights not expressly granted in these term are expressly reserved.", "You may use the Filters only for your online, personal, non-commercial use.", "Once you download a Filter, Beringer hereby grants you a personal, worldwide, royalty-free, non-assignable, nonexclusive, revocable, and non-sublicensable license to use the Filter(s) solely in online media.", "You may use the Filters only for your online, personal, non-commercial use.", "You may not copy, modify, distribute, sell, lease, create derivative works of, or publicly display the Filters."],
    "thankyou": {
      "title": "Thank You",
      "copy": "Need more inspiration for your next event? <br/> Visit our <a href=\"http://www.mainandvinewine.com/\" target=\"new\">website</a> for <br/>wine-pairing ideas, hosting tips, kitchen tricks, recipes and more!"
    },
    "title": {
      "title": "Let’s give your recipe a title:",
      "cta": "add images",
      "ctab": "continue",
      "placeholder": "Enter title here (60-character limit please):"
    },
    "welcome": {
      "intro": ["Prepare & Share is an easy-to-use tool designed to help you create beautiful, custom recipe pictures for your favorite dishes. In 3 simple steps, send your signature recipe photos to friends and family, collect them for your personal cookbook, or share with your followers on social media. So what are you waiting for? Let’s get cooking!"],
      "cta": "get started",
      "copyright": "&copy; 2017 MAIN & VINE. | <a href=\"/tandc\" target=\"_blank\">Terms &amp; Conditions</a>"
    }
  },
  "font": {
    "c1": {
      "font-family": "Montserrat",
      "font-size": "16px",
      "font-weight": "400"
    },
    "c2": {
      "font-family": "Montserrat",
      "font-size": "20px",
      "font-weight": "400"
    },
    "c3": {
      "font-family": "Montserrat",
      "font-size": "12px",
      "font-weight": "400"
    },
    "c4": {
      "font-family": "Montserrat",
      "font-size": "11px",
      "font-weight": "400"
    },
    "h1": {
      "font-family": "Montserrat",
      "font-size": "30px",
      "font-weight": "400"
    }
  },
  "font320": {
    "c1": {
      "font-family": "Montserrat",
      "font-size": "12px",
      "font-weight": "400"
    },
    "c2": {
      "font-family": "Montserrat",
      "font-size": "18px",
      "font-weight": "400"
    },
    "c3": {
      "font-family": "Montserrat",
      "font-size": "10px",
      "font-weight": "400"
    },
    "c4": {
      "font-family": "Montserrat",
      "font-size": "10px",
      "font-weight": "400"
    },
    "h1": {
      "font-family": "Montserrat",
      "font-size": "24px",
      "font-weight": "400"
    }
  },
  "meta": {
    "title": "Prepare & Share",
    "url": "https://recipegen.martiansf.com/",
    "image": "https://recipegen.martiansf.com/image/share.jpg",
    "description": "Recipe Share Description",
    "keywords": "Recipe Share",
    "tracking_id": "UA-5639004-8",
    "facebook_app_id": 243113306128964
  },
  "share": {
    "title": "Excited to share my latest recipe: {{title}}",
    "description": "Showcase your recipes in a snap with Prepare & Share, by Beringer Main & Vine",
    "twitter_description": "Excited to share my latest recipe! Publish your own with Prepare %26 Share by Beringer Main %26 Vine: ",
    "hashtag": "BetterTogether",
    "pinterest_description": "My latest kitchen creation: {{title}}, designed for Pinterest with Prepare & Share by Beringer Main & Vine. Share and send your own recipes at"
  },
  "debugbar": {
    "enabled": null,
    "storage": {
      "enabled": true,
      "driver": "file",
      "path": "/Users/k/recipegen/storage/debugbar",
      "connection": null,
      "provider": ""
    },
    "include_vendors": true,
    "capture_ajax": true,
    "clockwork": false,
    "collectors": {
      "phpinfo": true,
      "messages": true,
      "time": true,
      "memory": true,
      "exceptions": true,
      "log": true,
      "db": true,
      "views": true,
      "route": true,
      "laravel": false,
      "events": false,
      "default_request": false,
      "symfony_request": true,
      "mail": true,
      "logs": false,
      "files": false,
      "config": false,
      "auth": false,
      "gate": false,
      "session": true
    },
    "options": {
      "auth": {
        "show_name": false
      },
      "db": {
        "with_params": true,
        "timeline": false,
        "backtrace": false,
        "explain": {
          "enabled": false,
          "types": ["SELECT"]
        },
        "hints": true
      },
      "mail": {
        "full_log": false
      },
      "views": {
        "data": false
      },
      "route": {
        "label": true
      },
      "logs": {
        "file": null
      }
    },
    "inject": true,
    "route_prefix": "_debugbar"
  },
  "app": {
    "editor": "macvim"
  },
  "cache": {
    "default": "array",
    "stores": {
      "apc": {
        "driver": "apc"
      },
      "array": {
        "driver": "array"
      },
      "database": {
        "driver": "database",
        "table": "cache",
        "connection": null
      },
      "file": {
        "driver": "file",
        "path": "/Users/k/recipegen/storage/framework/cache"
      },
      "memcached": {
        "driver": "memcached",
        "servers": [
          {
            "host": "127.0.0.1",
            "port": 11211,
            "weight": 100
          }
        ]
      },
      "redis": {
        "driver": "redis",
        "connection": "default"
      }
    },
    "prefix": "laravel"
  },
  "queue": {
    "default": "array",
    "connections": {
      "sync": {
        "driver": "sync"
      },
      "database": {
        "driver": "database",
        "table": "jobs",
        "queue": "default",
        "expire": 60
      },
      "beanstalkd": {
        "driver": "beanstalkd",
        "host": "localhost",
        "queue": "default",
        "ttr": 60
      },
      "sqs": {
        "driver": "sqs",
        "key": "your-public-key",
        "secret": "your-secret-key",
        "queue": "your-queue-url",
        "region": "us-east-1"
      },
      "iron": {
        "driver": "iron",
        "host": "mq-aws-us-east-1.iron.io",
        "token": "your-token",
        "project": "your-project-id",
        "queue": "your-queue-name",
        "encrypt": true
      },
      "redis": {
        "driver": "redis",
        "connection": "default",
        "queue": "default",
        "retry_after": 60
      }
    },
    "failed": {
      "database": "mongodb",
      "table": "failed_jobs"
    }
  }
};

var Data;

Data = {
  steps: [],
  labels: ['ingredients', 'prepared', 'enjoyed'],
  title: false,
  header: false,
  footer: false,
  gap: 40,
  canvas: false,
  jszip: false,
  loadHF: function() {
    this.loadPreset('header');
    return this.loadPreset('footer');
  },
  loadPreset: function(name) {
    var img;
    img = new Image();
    img.onload = function() {
      return Data[name] = img;
    };
    return img.src = "/image/" + name + ".png";
  },
  save: function(step, callback) {
    var _URL;
    if (Img.cropped === false) {
      return callback(false);
    }
    _URL = window.URL || window.webkitURL;
    return Img.cropped.croppie('result', 'blob').then(function(blob) {
      var img;
      img = new Image();
      img.onload = function() {
        Data.steps[step - 1] = {
          image: img,
          blob: blob
        };
        return Data.populate(step);
      };
      img.src = _URL.createObjectURL(blob);
      return callback(true);
    });
  },
  populate: function(step) {
    _.off(".step.step_" + step + " > .inner > .status > .pending");
    _.on(".step.step_" + step + " > .inner > .status > .complete");
    _.off(".step.step_" + step + " > .inner > .image > .svg");
    _.off(".step.step_" + step + " > .inner > .image > .copy");
    $(".step.step_" + step + " > .inner > .image").css('background-image', "url(" + Data.steps[step - 1].image.src + ")");
    if (Data.steps.length >= 3) {
      return setTimeout(function() {
        return _.on('.page_steps > .cta_preview');
      }, 200);
    }
  },
  zip: function(complete) {
    var i, step;
    this.jszip = new JSZip();
    for (step = i = 0; i <= 2; step = ++i) {
      if (this.steps[step] !== void 0) {
        this.jszip.file("step" + (step + 1) + ".jpg", Data.steps[step].blob);
      }
    }
    return Data.canvas.toBlob(function(blob) {
      var _URL, newImg, url;
      newImg = document.createElement('img');
      _URL = window.URL || window.webkitURL;
      url = _URL.createObjectURL(blob);
      newImg.onload = function() {
        return _URL.revokeObjectURL(url);
      };
      newImg.src = url;
      document.body.appendChild(newImg);
      Data.jszip.file('complete.jpg', blob);
      return complete();
    }, "image/jpeg");
  }
};

var Filter;

Filter = function() {
  if (Img.cropped === false) {
    return false;
  }
  return Img.cropped.croppie('result', 'blob').then(function(blob) {
    var _URL, img;
    Share.blob = blob;
    _URL = window.URL || window.webkitURL;
    img = new Image();
    img.onload = function() {
      var canvas, ctx;
      canvas = $('.page_filter > .canvas > canvas')[0];
      canvas.width = Index.width;
      canvas.height = Index.width;
      ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, Index.width, Index.width);
      Page('filter');
      _.off('.page_welcome');
      Spinner.d();
      Index.mode = 'filter';
      _.on('.page_filter > .filters');
      if (Index.slicked === false) {
        Index.slicked = $('.page_filter > .filters > .inner').slick({
          initialSlide: 0,
          mobileFirst: true,
          swipe: true,
          swipeToSlide: true,
          arrows: false,
          draggable: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1
        });
        Index.slicked.on('afterChange', Share.filterHandler);
        return $('.filters > .index').html("1 / " + config.filters.length);
      }
    };
    return img.src = _URL.createObjectURL(blob);
  });
};

var Img;

Img = {
  cropped: false,
  change: function() {
    Spinner.i($('html'));
    console.log(this.files);
    if (this.files === void 0) {
      Spinner.d();
      return false;
    }
    if (typeof this.files !== 'object') {
      return Spinner.d();
      return false;
    }
    if (this.files[0].size > 8000000) {
      alert('File size must not exceed 8MB');
      return Spinner.d();
    }
    return loadImage(this.files[0], function(canvas, metadata) {
      var _URL, img;
      _URL = window.URL || window.webkitURL;
      img = new Image();
      img.src = canvas.toDataURL('image/jpeg');
      return img.onload = function() {
        var MAX_HEIGHT, MAX_WIDTH, canvas2, ctx, height, width;
        MAX_WIDTH = 1000;
        MAX_HEIGHT = 1000;
        canvas2 = document.createElement('canvas');
        ctx = canvas2.getContext('2d');
        width = img.width;
        height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas2.width = width;
        canvas2.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        return Img.crop(canvas2.toDataURL('image/jpeg'));
      };
    }, {
      canvas: true,
      orientation: true
    });
  },
  crop: function(url) {
    var ref, zoomer;
    if (this.cropped !== false) {
      this.cropped.croppie('destroy');
    }
    _.off('.page_step > .image');
    zoomer = (ref = Index.rwidth > 1000) != null ? ref : {
      "true": false
    };
    this.cropped = $('.page_step > .image').croppie({
      url: url,
      enforaceBoundary: false,
      showZoomer: zoomer,
      viewport: {
        width: Index.width - 50,
        height: (Index.width / Step.ratio[0]) - 50
      },
      boundary: {
        width: Index.width,
        height: Index.width / Step.ratio[0]
      }
    });
    return Spinner.d();
  }
};

var Index;

Index = {
  height: false,
  width: false,
  rwidth: false,
  header: {
    height: false
  },
  hash: false,
  i: function() {
    var hash;
    this.width = this.rwidth = $(window).width();
    if (this.width > 600) {
      this.width = 600;
    }
    this.height = $(window).height();
    this.header.height = $('header').height();
    $('.page.full').css('height', this.height + "px");
    $('.page').not('.full').not('.custom').css('height', (this.height - this.header.height) + "px");
    this.handlers();
    Data.loadHF();
    if (document.location.pathname !== "/") {
      hash = document.location.pathname.replace('/', '');
      Index.hash = hash;
      _.on('.page_submit');
      _.off('.page_welcome, .page_steps');
      $('.page_submit > .inner > .image > .inner').attr('src', "/image/" + hash + ".jpg");
      return $('.page_submit > .inner > .cta').on('click', function() {
        return location.href = '/';
      });
    }
  },
  handlers: function() {
    $('.page_welcome > .inner > .cta').on('click', this.welcomeHandler);
    $('.page_title > .inner > .middle').on('click', '.cta.on', this.titleHandler);
    $('.page_title > .inner > .middle > .textarea > textarea').on('keyup input propertychange', this.charHandler);
    $('.page_steps > .title > .edit').click(this.welcomeHandler);
    $('.page_steps > .step').click(this.stepHandler);
    return $('.page_steps > .cta_preview').click(this.previewHandler);
  },
  previewHandler: function() {
    _.t('buttons', 'preview', 'pressed');

    /*
    if Data.steps.length < 1
      Notice.i 'Please fill out at least 1 step to continue'
      return true
     */
    if (Data.title === false || Data.title === '') {
      Notice.i('Please specify a title');
      return true;
    }
    return Preview.i();
  },
  welcomeHandler: function() {
    _.t('buttons', 'get started', 'pressed');
    _.off('.page_steps');
    _.off('.page_welcome');
    _.on('.page_title');
    if (Data.title !== '' && Data.title !== false) {
      return $('.page_title > .inner > .middle > .textarea > textarea').val(Data.title);
    }
  },
  charHandler: function() {
    var val;
    val = $(this).val();
    if (val.length > 0 && val.length <= 60) {
      _.on('.page_title > .inner > .middle > .cta');
    } else {
      _.off('.page_title > .inner > .middle > .cta');
    }
    if (val.length > 60) {
      _.on('.chars');
    } else {
      _.off('.chars');
    }
    return $('.chars > .count').text(val.length + " of 60");
  },
  titleHandler: function() {
    var title;
    _.t('buttons', 'add images', 'pressed');
    title = $('.page_title > .inner > .middle > .textarea > textarea').val();
    if (title.length > 60) {
      Notice.i('Please limit your title to under 60 characters');
      return false;
    }
    _.off('.page_title > .inner > .middle > .cta > .copy');
    _.on('.page_title > .inner > .middle > .cta > .copyb');
    Data.title = title;
    if (Data.title !== '' && Data.title !== false) {
      $('.page_steps > .title > .copy').html(Data.title);
      config.share.dgenerated = config.share.description.replace('{{title}}', Data.title);
      config.share.twitter_dgenerated = config.share.twitter_description.replace('{{title}}', Data.title);
      config.share.pinterest_dgenerated = config.share.pinterest_description.replace('{{title}}', Data.title);
      if (Share.hashid !== false) {
        Share.hashid = false;
      }
    }
    _.off('.page_title');
    return _.on('.page_steps');
  },
  stepHandler: function() {
    var step;
    step = $(this).data('step');
    _.t('buttons', "step # " + step, 'pressed');
    return Step.i(step);
  }
};

var Notice;

Notice = {
  types: ['info', 'success', 'warning'],
  el: false,
  on: false,
  progress: false,
  timeout: false,
  close: true,
  "default": {
    type: 'info',
    progress: false,
    timeout: 3000
  },
  i: function(copy, options) {
    var dtype, i, key, len, param, ref;
    if (options == null) {
      options = {};
    }
    this.options = Object.assign({}, this["default"]);
    for (key in options) {
      param = options[key];
      this.options[key] = param;
    }
    if (this.el === false) {
      this.el = $('.notice');
    }
    ref = this.types;
    for (i = 0, len = ref.length; i < len; i++) {
      dtype = ref[i];
      this.el.removeClass(dtype);
    }
    this.el.addClass(this.options.type);
    this.el.find('.copy > .message').html(copy);
    if (this.options.progress !== false) {
      if (this.progress === false) {
        _.on(this.el.find('.notice_progress'));
        this.progress = true;
      }
      if (this.close === true) {
        _.off(this.el.find('.close'));
        this.close = false;
      }
      if (this.on === false) {
        setTimeout((function(_this) {
          return function() {
            return _this.el.find('.full').css('width', _this.options.progress * 100 + '%');
          };
        })(this), 100);
      } else {
        this.el.find('.full').css('width', this.options.progress * 100 + '%');
      }
    }
    if (this.options.progress === false && this.progress === true) {
      this.el.find('.full').css('width', '0%');
      _.off(this.el.find('.notice_progress'));
      this.progress = false;
      _.on(this.el.find('.close'));
      this.close = true;
    }
    if (this.on === false) {
      _.on(this.el);
      this.handlers.on();
      this.on = true;
    }
    if (this.options.timeout !== false && this.options.progress === false) {
      return this.timeout = setTimeout((function(_this) {
        return function() {
          return _this.d();
        };
      })(this), this.options.timeout);
    }
  },
  handlers: {
    on: function() {
      return $('.notice').on('click', '.inner > .close > .inner', Notice.d);
    },
    off: function() {
      return $('.notice').off('click', '.inner > .close > .inner', Notice.d);
    }
  },
  d: function() {
    if (Notice.timeout !== false) {
      clearTimeout(Notice.timeout);
    }
    Notice.timeout = false;
    Notice.handlers.off();
    _.on(Notice.el.find('.close'));
    Notice.close = true;
    _.off(Notice.el.find('.notice_progress'));
    Notice.progress = false;
    _.off(Notice.el, {
      offing: true,
      offtime: 0.2
    });
    return Notice.on = false;
  }
};

var Page;

Page = function(page) {
  _.off('.page, .modes > .outer > .inner .mode');
  return _.on(".page.page_" + page + ", .modes > .outer > .inner > .mode.mode_" + page);
};

var Preview;

Preview = {
  cropped: false,
  fullheight: 0,
  gap: 40,
  i: function() {
    _.off('.page_steps');
    _.on('.page_preview');
    this.fullheight = 0;
    this.handlers.i();
    Data.canvas = this.stack();
    return Preview.crop(Data.canvas.toDataURL('image/jpeg'));
  },
  d: function() {
    console.log('Preview.d');
    Preview.handlers.d();
    _.on('.page_steps');
    return _.off('.page_preview');
  },
  handlers: {
    i: function() {
      $('.page_preview > .buttons > .button.cta_back').on('click', Preview.d);
      $('.page_preview > .buttons > .button.cta_share').on('click', Preview.shareHandler);
      return $('.page_preview > .image').on('touchstart', Preview.touchHandler);
    },
    d: function() {
      _.t('buttons', 'back', 'pressed');
      $('.page_preview > .buttons > .button.cta_back').off('click', Preview.d);
      $('.page_preview > .buttons > .button.cta_share').off('click', Preview.shareHandler);
      return $('.page_preview > .image').off('touchstart', Preview.touchHandler);
    }
  },
  touchHandler: function() {
    return event.preventDefault();
  },
  shareHandler: function() {
    _.t('buttons', 'share', 'pressed');
    if (Share.hashid !== false) {
      Share.i();
      return true;
    }
    return Data.zip(function() {
      return Data.jszip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: {
          level: 9
        }
      }).then(function(blob) {
        return Share.imageUpload(blob, function() {
          Share.i();
          return console.log('Share.i()');
        });
      });
    });

    /*
    Notice.i 'Uploading Images', progress: 0.2
    
    setTimeout ->
      Notice.i 'Processing Images', progress: 0.7
    , 2000
    
    setTimeout ->
      Notice.i 'Ready to share', progress: 1
    , 3000
    setTimeout ->
      Share.i()
    , 3500
    setTimeout ->
      Notice.d()
    , 3600
     */
  },
  stack: function(result) {
    var _URL, canvas, cheight, copy, ctx, height, index, j, k, l, len1, len2, len3, len4, m, measure, padding, ref, ref1, ref2, step, theight, titleBottomGap, titleCopy, titleCopys, titleHeight, titleLengthMax, titleLineHeight, titleLines, titleMeasure, x, y;
    canvas = document.createElement('canvas');
    canvas.width = 1000;
    ctx = canvas.getContext('2d');
    _URL = window.URL || window.webkitURL;
    height = 0;
    height += Data.header.height;
    ref = Data.steps;
    for (j = 0, len1 = ref.length; j < len1; j++) {
      step = ref[j];
      cheight = 1000 * step.image.height / step.image.width;
      height += cheight + Data.gap;
    }
    height += Data.footer.height;
    titleLineHeight = 60;
    titleHeight = titleLineHeight;
    titleLengthMax = 800;
    titleBottomGap = 40;
    titleCopy = Data.title.toUpperCase();
    ctx.font = '400 40px Montserrat';
    ctx.fillStyle = config.color.gold1;
    titleMeasure = ctx.measureText(titleCopy);
    if (titleMeasure.width >= titleLengthMax) {
      titleLines = Math.floor(titleMeasure.width / titleLengthMax) + 1;
      titleCopys = Preview.textSplit(titleCopy, titleLines);
      titleHeight = titleLineHeight * titleLines;
    }
    height += titleHeight;
    canvas.height = height;
    ctx.drawImage(Data.header, 0, Preview.fullheight);
    Preview.fullheight += Data.header.height;
    ctx.fillStyle = config.color.beige2;
    ctx.fillRect(0, Preview.fullheight, 1000, titleHeight + titleBottomGap);
    Preview.fullheight += titleHeight + titleBottomGap;
    ref1 = Data.steps;
    for (k = 0, len2 = ref1.length; k < len2; k++) {
      step = ref1[k];
      cheight = 1000 * step.image.height / step.image.width;
      ctx.drawImage(step.image, 0, Preview.fullheight, 1000, cheight);
      Preview.fullheight += cheight;
      ctx.fillStyle = config.color.beige2;
      ctx.fillRect(0, Preview.fullheight - 1, 1000, Data.gap + 1);
      Preview.fullheight += Data.gap;
    }
    ctx.drawImage(Data.footer, 0, Preview.fullheight - 1);
    Preview.fullheight += Data.footer.height;
    theight = Data.header.height;
    ctx.font = '400 40px Montserrat';
    ctx.fillStyle = config.color.gold1;
    if (titleCopys !== void 0) {
      for (l = 0, len3 = titleCopys.length; l < len3; l++) {
        copy = titleCopys[l];
        titleMeasure = ctx.measureText(copy);
        x = (1000 / 2) - (titleMeasure.width / 2);
        y = theight + titleLineHeight;
        ctx.fillText(copy, x, y);
        theight += titleLineHeight;
      }
    } else {
      titleMeasure = ctx.measureText(titleCopy);
      x = (1000 / 2) - (titleMeasure.width / 2);
      y = theight + titleLineHeight;
      ctx.fillText(Data.title.toUpperCase(), x, y);
      theight += titleLineHeight;
    }
    theight += titleBottomGap;
    ref2 = Data.steps;
    for (index = m = 0, len4 = ref2.length; m < len4; index = ++m) {
      step = ref2[index];
      theight += 1000 * step.image.height / step.image.width;
      measure = ctx.measureText(Data.labels[index].toUpperCase());
      x = (1000 / 2) - (measure.width / 2);
      y = theight + 30;
      padding = 120;
      ctx.fillStyle = config.color.red1;
      ctx.fillRect(x - padding, y - 45, measure.width + (padding * 2), 65);
      ctx.fillStyle = config.color.white1;
      ctx.fillText(Data.labels[index].toUpperCase(), x, y);
      theight += Data.gap;
    }
    return canvas;
  },
  crop: function(url) {
    var ref, zoomer;
    if (this.cropped !== false) {
      this.cropped.croppie('destroy');
    }
    zoomer = (ref = Index.rwidth > 1000) != null ? ref : {
      "true": false
    };
    this.cropped = $('.page_preview > .image').croppie({
      url: url,
      enforaceBoundary: false,
      showZoomer: zoomer,
      setZoom: 0.25
    });
    return setTimeout(function() {
      return Preview.zoomAnimate();
    }, 100);
  },
  zoomAnimate: function(before, after) {
    var crement, distance, finish, speed, start;
    speed = 20;
    start = 0.25;
    finish = 0.15;
    distance = start - finish;
    crement = distance / speed;
    return this.ai_id = setInterval(function() {
      start -= crement;
      Preview.cropped.croppie('setZoom', start);
      if (start <= finish) {
        return clearInterval(Preview.ai_id);
      }
    }, speed);
  },
  copySplit: function(copy, lines) {
    var after, before, copys, gap, index, j, k, len1, middle, middles, num, ref;
    middles = [];
    copys = [];
    gap = Math.floor(copy.length / lines);
    for (num = j = 1, ref = lines; 1 <= ref ? j <= ref : j >= ref; num = 1 <= ref ? ++j : --j) {
      middle = Math.round(gap * num);
      before = copy.lastIndexOf(' ', middle);
      after = copy.indexOf(' ', middle + 1);
      if (before === -1 || (after !== -1 && middle - before >= after - middle)) {
        middle = after;
      } else {
        middle = before;
      }
      middles.push(middle);
    }
    for (index = k = 0, len1 = middles.length; k < len1; index = ++k) {
      middle = middles[index];
      if (index === 0) {
        copys.push(copy.substr(0, middle));
      } else {
        copys.push(copy.substr(middle + 1, middles[index + 1] - 1));
      }
      if (middles[index + 1] === void 0) {
        continue;
      }
    }
    return copys;
  },
  permute: function(copy, lines, gap) {
    var chunks, i, j, k, len, len1, lengths, line, ref, score, string, words;
    words = copy.split(' ');
    chunks = [];
    lengths = [];
    for (line = j = 1, ref = lines; 1 <= ref ? j <= ref : j >= ref; line = 1 <= ref ? ++j : --j) {
      if (line !== lines) {
        string = words.slice((line - 1) * gap, line * gap).join(' ');
      } else {
        string = words.slice((lines - 1) * gap).join(' ');
      }
      chunks.push(string);
      lengths.push(string.length);
    }
    score = 0;
    for (i = k = 0, len1 = lengths.length; k < len1; i = ++k) {
      len = lengths[i];
      if (lengths[i + 1] !== void 0) {
        score += Math.abs(len - lengths[i + 1]);
      }
    }
    return {
      score: score,
      chunks: chunks,
      gap: gap
    };
  },
  textSplit: function(copy, lines) {
    var j, k, len1, limit, p, permute, permutes, ref, result, scores, words;
    words = copy.split(' ');
    limit = Math.ceil(words.length / lines);
    permutes = [];
    scores = [];
    for (p = j = 1, ref = limit; 1 <= ref ? j <= ref : j >= ref; p = 1 <= ref ? ++j : --j) {
      result = this.permute(copy, lines, p);
      permutes.push(result);
      scores.push(result.score);
    }
    scores.sort(function(a, b) {
      return a - b;
    });
    for (k = 0, len1 = permutes.length; k < len1; k++) {
      permute = permutes[k];
      if (permute.score === scores[0]) {
        return permute.chunks;
      }
    }
  }
};

var Share;

Share = {
  filter: 1,
  blob: false,
  hashid: false,
  pid: false,
  i: function() {
    _.on('.page_shares, .clearmodal');
    $('.page_shares > .close').on('click', this.d);
    return $('.container').on('click', '.page_shares.on > .inner > .sharelist > .share', this.share);
  },
  d: function() {
    _.off('.page_shares, .clearmodal, .page_thankyou');
    $('.page_shares > .close').off('click', this.d);
    return $('.container').off('click', '.page_shares.on > .inner > .sharelist > .share', this.share);
  },
  share: function() {
    var type;
    type = $(this).data('type');
    console.log('Share.share() handler');
    switch (type) {
      case 'facebook':
        Share.facebook();
        break;
      case 'twitter':
        Share.twitter();
        break;
      case 'pinterest':
        Share.pinterest();
        break;
      case 'dl':
      case 'ig':
        Share.download(type);
    }
    return _.on('.page_thankyou');
  },
  imageUpload: function(blob, callback) {
    var fd;
    fd = new FormData();
    fd.append('file', blob);
    fd.append('title', Data.title);
    Share.pid = _.rand(0, 2);
    return _.post({
      xhr: function() {
        var xhr;
        xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener('progress', function(e) {
          var complete;
          complete = e.loaded / e.total;
          if (complete < 1) {
            Notice.i(config.copy.progress.uploading[Share.pid], {
              progress: complete
            });
          }
          if (complete === 1) {
            return Notice.i(config.copy.progress.processing[Share.pid], {
              progress: complete
            });
          }
        }, false);
        return xhr;
      },
      url: '/api/upload',
      data: fd,
      cache: false,
      contentType: false,
      processData: false,
      error: function() {
        return Notice.d();
      },
      success: function(result) {
        Notice.i(config.copy.progress.complete, {
          type: 'success'
        });
        Share.hashid = result.data.hashid;
        return callback(result);
      }
    });
  },
  facebook: function() {
    _.t('buttons', 'share facebook', 'pressed');
    return FB.ui({
      method: 'share',
      mobile_iframe: true,
      href: document.location.origin + '/' + Share.hashid,
      redirect_uri: document.location.href,
      display: 'touch'
    }, function(response) {
      return console.log(response);
    });
  },
  twitter: function() {
    var share;
    _.t('buttons', 'share twitter', 'pressed');
    share = "http://twitter.com/intent/tweet/?url=" + _.encode(document.location.origin + "/" + Share.hashid) + ("&text=" + config.share.twitter_dgenerated + "&hashtags=" + config.share.hashtag);
    return window.open(share);
  },
  pinterest: function() {
    var share;
    _.t('buttons', 'share pinterest', 'pressed');
    share = "http://pinterest.com/pin/create/button/?url=" + _.encode(document.location.origin + "/" + Share.hashid) + ("&description=" + config.share.pinterest_dgenerated + "&media=") + _.encode(document.location.origin + "/image/" + Share.hashid + ".jpg");
    return window.open(share);
  },
  download: function(type) {
    _.t('buttons', 'share download', 'pressed');
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) || type === 'ig') {
      return window.open(document.location.origin + ("/" + type + "/" + Share.hashid));
    } else {
      return location.href = document.location.origin + ("/download/" + Share.hashid + ".jpg");
    }
  }
};

var Spinner;

Spinner = {
  state: false,
  el: {},
  i: function(el, override) {
    var coord, coords, key, rect;
    this.el = $('.spinner');
    rect = el[0].getBoundingClientRect();
    coords = {
      top: (rect.top + $(window).scrollTop()) + "px",
      left: rect.left + "px",
      width: rect.width + "px",
      height: rect.height + "px"
    };
    if (override !== void 0) {
      for (key in override) {
        coord = override[key];
        coords[key] = coord;
      }
    }
    this.el.css(coords);
    _.on(this.el);
    return this.state = true;
  },
  d: function() {
    _.off(this.el);
    return this.state = false;
  }
};

var Step;

Step = {
  step: false,
  ratio: [1.5, 1],
  i: function(step) {
    this.step = step;
    _.off('.page_step > .subtitle > .copy');
    _.on(".page_step > .subtitle > .copy_" + step);
    _.on('.page_step > .image');
    _.off('.page_step > .instructions > .instruct');
    _.on(".page_step > .instructions > .instruct.instruct_" + step);
    $('.page_step > .image').removeClass('step_1 step_2 step_3');
    $('.page_step > .image').addClass("step_" + step);
    if (Img.cropped !== false) {
      Img.cropped.croppie('destroy');
    }
    if (Data.steps[this.step - 1] !== void 0) {
      _.off('.page_step > .image');
      Img.crop(Data.steps[this.step - 1].image.src);
    }
    _.off('.page_steps');
    _.on('.page_step');
    $('.page_step > .image').css('height', (Index.width / Step.ratio[0]) + "px");
    return this.handlers.i();
  },
  handlers: {
    i: function() {
      $('.page_step > .buttons > .button.cta_newimage').on('click', Step.chooseFile);
      $('.page_step > .buttons > .button.cta_confirm').on('click', Step.confirm);
      $('.page_step > .cancel').on('click', Step.cancel);
      return $('.file_input').on('change', Img.change);
    },
    d: function() {
      $('.page_step > .buttons > .button.cta_newimage').off('click', Step.chooseFile);
      $('.page_step > .buttons > .button.cta_confirm').off('click', Step.confirm);
      $('.page_step > .cancel').off('click', Step.cancel);
      $('.file_input').off('change', Img.change);
      return $('.file_input').val('');
    }
  },
  chooseFile: function() {
    _.t('buttons', 'choose new image ', 'pressed');
    return $('.page_step > form > input.file_input').trigger('click');
  },
  cancel: function() {
    _.t('buttons', 'cancel image ', 'pressed');
    Step.handlers.d();
    _.off('.page_step');
    return _.on('.page_steps');
  },
  confirm: function() {
    _.t('buttons', 'confirm image', 'pressed');
    return Data.save(Step.step, function(result) {
      if (Share.hashid !== false) {
        Share.hashid = false;
      }
      return Step.cancel();
    });
  }
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJjb25maWcuY29mZmVlIiwiZGF0YS5jb2ZmZWUiLCJmaWx0ZXIuY29mZmVlIiwiaW1nLmNvZmZlZSIsImluZGV4LmNvZmZlZSIsIm5vdGljZS5jb2ZmZWUiLCJwYWdlLmNvZmZlZSIsInByZXZpZXcuY29mZmVlIiwic2hhcmUuY29mZmVlIiwic3Bpbm5lci5jb2ZmZWUiLCJzdGVwLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLENBQUE7RUFBQTs7O0FBQUEsQ0FBQSxHQUVFO0VBQUEsQ0FBQSxFQUFHLFNBQUE7V0FDRCxJQUFDLENBQUEsT0FBRCxHQUFXLFdBQUEsQ0FBWSxJQUFDLENBQUEsTUFBTSxDQUFDLElBQVIsQ0FBYSxJQUFiLENBQVosRUFBNkIsR0FBN0I7RUFEVixDQUFIO0VBR0EsQ0FBQSxFQUNFO0lBQUEsTUFBQSxFQUFRLEtBQVI7SUFDQSxPQUFBLEVBQVMsQ0FEVDtHQUpGO0VBT0EsSUFBQSxFQUFNLFNBQUMsRUFBRCxFQUFLLE1BQUwsRUFBbUIsR0FBbkI7O01BQUssU0FBTzs7O01BQU8sTUFBSTs7SUFFM0IsSUFBRyxDQUFBLENBQUEsRUFBQSxZQUFrQixNQUFsQixDQUFIO01BQ0UsRUFBQSxHQUFLLENBQUEsQ0FBRSxFQUFGLEVBRFA7O0lBR0EsSUFBRyxNQUFBLEtBQVksS0FBZjtNQUNFLEVBQUUsQ0FBQyxXQUFILENBQWUsTUFBZixFQURGOztJQUdBLElBQUcsR0FBQSxLQUFTLEtBQVo7TUFDRSxFQUFFLENBQUMsUUFBSCxDQUFZLEdBQVosRUFERjs7QUFHQSxXQUFPO0VBWEgsQ0FQTjtFQW9CQSxHQUFBLEVBQUssU0FBQyxFQUFELEVBQUssQ0FBTDs7TUFBSyxJQUFFOztJQUVWLElBQUcsQ0FBQyxDQUFDLE1BQUYsSUFBYSxDQUFDLENBQUMsT0FBRixHQUFZLENBQTVCO01BRUUsSUFBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUsS0FBVixFQUFpQixRQUFqQjtNQUNBLFVBQUEs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ckI7RUFITyxDQXpEVCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJfID1cblxuICBpOiAtPlxuICAgIEBjb25zb2xlID0gc2V0SW50ZXJ2YWwoQGRldGVjdC5iaW5kKEApLCAyMDApXG5cbiAgcDpcbiAgICBvZmZpbmc6IGZhbHNlXG4gICAgb2ZmdGltZTogMFxuXG4gIHR1cm46IChlbCwgcmVtb3ZlPWZhbHNlLCBhZGQ9ZmFsc2UpIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIHJlbW92ZSBpc250IGZhbHNlXG4gICAgICBlbC5yZW1vdmVDbGFzcyhyZW1vdmUpXG5cbiAgICBpZiBhZGQgaXNudCBmYWxzZVxuICAgICAgZWwuYWRkQ2xhc3MoYWRkKVxuXG4gICAgcmV0dXJuIHRydWVcblxuICBvZmY6IChlbCwgcD17fSkgLT5cblxuICAgIGlmIHAub2ZmaW5nIGFuZCBwLm9mZnRpbWUgPiAwXG5cbiAgICAgIEB0dXJuIGVsLCBmYWxzZSwgJ29mZmluZydcbiAgICAgIHNldFRpbWVvdXQgPT5cbiAgICAgICAgQHR1cm4gZWwsICdvZmZpbmcnLCBmYWxzZVxuICAgICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcbiAgICAgICwgcC5vZmZ0aW1lKjEwMDAgKyAxMDBcblxuICAgIGVsc2VcbiAgICAgIEB0dXJuIGVsLCAnb24nLCAnb2ZmJ1xuXG4gICAgcmV0dXJuXG5cbiAgb246IChlbCwgcCkgLT5cbiAgICBAdHVybiBlbCwgJ29mZicsICdvbidcblxuICBzd2FwOiAoZWwsIHApIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIGVsLmhhc0NsYXNzICdvZmYnXG4gICAgICBAb24gZWwsIHBcbiAgICBlbHNlXG4gICAgICBAb2ZmIGVsLCBwXG5cbiAgICByZXR1cm5cblxuICBlbmNvZGU6IChzdHIpIC0+XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpXG4gICAgICAucmVwbGFjZSgvIS9nLCAnJTIxJylcbiAgICAgIC5yZXBsYWNlKC8nL2csICclMjcnKVxuICAgICAgLnJlcGxhY2UoL1xcKC9nLCAnJTI4JylcbiAgICAgIC5yZXBsYWNlKC9cXCkvZywgJyUyOScpXG4gICAgICAucmVwbGFjZSgvXFwqL2csICclMkEnKVxuICAgICAgLnJlcGxhY2UoLyUyMC9nLCAnKycpXG5cbiAgdDogKGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZSkgLT5cbiAgICBnYSAnc2VuZCcsICdldmVudCcsIGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZVxuXG5cbiAgcmFuZDogKG1pbiwgbWF4KSAtPlxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpICsgbWluXG5cbiAgZml0OiAoc3JjV2lkdGgsIHNyY0hlaWdodCwgbWF4V2lkdGgsIG1heEhlaWdodCkgLT5cbiAgICByYXRpbyA9IE1hdGgubWluKG1heFdpZHRoIC8gc3JjV2lkdGgsIG1heEhlaWdodCAvIHNyY0hlaWdodClcbiAgICB3aWR0aDogc3JjV2lkdGgqcmF0aW8sIGhlaWdodDogc3JjSGVpZ2h0KnJhdGlvXG5cbiAgaGV4MnJnYjogKGhleCkgLT5cbiAgICByZXN1bHQgPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaGV4KVxuICAgIHI6IHBhcnNlSW50KHJlc3VsdFsxXSwgMTYpLFxuICAgIGc6IHBhcnNlSW50KHJlc3VsdFsyXSwgMTYpLFxuICAgIGI6IHBhcnNlSW50KHJlc3VsdFszXSwgMTYpXG4gXG4gIG9iamM6IChvYmopIC0+XG4gICAgKGsgZm9yIG93biBrIG9mIG9iaikubGVuZ3RoXG5cbiAgbG9hZDogKHNjcmlwdCwgaW5pdGlhdGUsIGNvbXBsZXRlKSAtPlxuXG4gICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdzY3JpcHQnXG4gICAgZWwudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnXG4gICAgZWwuc3JjID0gc2NyaXB0XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lciAnbG9hZCcgLCAoZSkgLT5cbiAgICAgIGNvbXBsZXRlKCkgaWYgdHlwZW9mIGNvbXBsZXRlIGlzICdmdW5jdGlvbidcbiAgICAgIHdpbmRvd1tpbml0aWF0ZV0uaSgpIGlmIGluaXRpYXRlIGlzbnQgdW5kZWZpbmVkIGFuZCBpbml0aWF0ZSBpc250IGZhbHNlXG4gICAgLCBmYWxzZVxuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbClcblxuICBqaW5pdDogLT5cbiAgICAkLmFqYXhTZXR1cFxuICAgICAgZGF0YVR5cGU6IFwianNvblwiXG5cbiAgcGF0Y2g6ICh1cmwsIGRhdGEpIC0+XG5cbiAgICBAamluaXQoKVxuXG4gICAganBhdGNoID0gJC5hamF4XG4gICAgICB1cmw6IHVybFxuICAgICAgZGF0YTogZGF0YVxuICAgICAgdHlwZTogJ1BBVENIJ1xuXG4gICAganBhdGNoLmZhaWwgKHJlc3BvbnNlKSAtPlxuICAgICAgQGZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4ganBhdGNoXG5cbiAgZ2V0OiAoYXJncy4uLikgLT5cblxuICAgIEBqaW5pdCgpXG5cbiAgICBqZ2V0ID0gJC5nZXQgYXJncy4uLlxuXG4gICAgamdldC5mYWlsIChyZXNwb25zZSkgPT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuICAgICAgamdldC5mYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpnZXRcblxuICBwb3N0OiAoYXJncy4uLikgLT5cblxuICAgIGpwb3N0ID0gJC5wb3N0IGFyZ3MuLi5cblxuICAgIGpwb3N0LmZhaWwgKHJlc3BvbnNlKSA9PlxuICAgICAgQGZhaWwocmVzcG9uc2UpXG4gICAgICBqcG9zdC5mYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpwb3N0XG5cbiAgZmFpbDogKHJlc3BvbnNlKSAtPlxuXG4gICAgZXJyb3IgPSByZXNwb25zZS5yZXNwb25zZUpTT04/LmVycm9ycz9bMF1cbiAgICBpZiBlcnJvciBpcyB1bmRlZmluZWRcbiAgICAgIHJldHVybiBQcm9tcHQuaSByZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLnN0YXR1c1RleHRcblxuICAgIHB1ZyA9IGVycm9yLm1lc3NhZ2UubWF0Y2ggL1B1ZyBFcnJvcjogKC4qPyk6KFswLTldKykvXG4gICAgaWYgcHVnIGlzbnQgbnVsbFxuICAgICAgZXJyb3IubWVzc2FnZSA9IGVycm9yLm1lc3NhZ2UucmVwbGFjZSAvUHVnIEVycm9yOiAoLio/KTooWzAtOV0rKS8sICcnXG4gICAgICBlcnJvci5maWxlID0gcHVnWzFdXG4gICAgICBlcnJvci5saW5lID0gcHVnWzJdXG5cbiAgICBmaWxlID0gQGVuY29kZSBcIiN7ZXJyb3IuZmlsZX1cIlxuXG4gICAgc3dpdGNoIGNvbmZpZy5hcHAuZWRpdG9yXG4gICAgICB3aGVuICdtYWN2aW0nIHRoZW4gZWRpdG9yID0gJ212aW06Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAnc3VibGltZScgdGhlbiBlZGl0b3IgPSAnc3VibDovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdlbWFjcycgdGhlbiBlZGl0b3IgPSAnZW1hY3M6Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAndGV4dG1hdGUnIHRoZW4gZWRpdG9yID0gJ3RleHRtYXRlOi8vb3Blbi8/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdwaHBzdG9ybScgdGhlbiBlZGl0b3IgPSAncGhwc3Rvcm06Ly9vcGVuP2ZpbGU9J1xuXG4gICAgaWYgZXJyb3IuZmlsZSBpc250IG51bGxcbiAgICAgIGJvZHkgPSBcIlwiXCJcbiAgICAgICAgPHByZT4je2Vycm9yLm1lc3NhZ2V9PC9wcmU+XG4gICAgICAgIDxhIGhyZWY9XCIje2VkaXRvcn0je2ZpbGV9JmxpbmU9I3tlcnJvci5saW5lfVwiPjxiPiN7ZXJyb3IuZmlsZX06I3tlcnJvci5saW5lfTwvYj48L2E+XG4gICAgICBcIlwiXCJcbiAgICBlbHNlXG4gICAgICBib2R5ID0gZXJyb3IubWVzc2FnZVxuXG4gICAgUHJvbXB0LmkgZXJyb3IudHlwZSwgYm9keSwgWydPSyddXG5cbiAgbWV0aG9kczogKG9iaikgLT5cbiAgICByZXMgPSBbXVxuICAgIGZvciBpLG0gb2Ygb2JqXG4gICAgICBpZiB0eXBlb2YgbSBpcyAnZnVuY3Rpb24nXG4gICAgICAgIHJlcy5wdXNoIG1cbiAgICByZXR1cm4gcmVzXG5cbiAgbGxjOiAtPlxuICAgIGFzY2lpID0gXCJcIlwiXG5cbiAgICAgICVjbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG4gICAgICBtbW8uLi4uLi4uLi4uLi4uLi4uLTo6Ly86Oi0uLi4uLi4uLTo6Ojo6Ojo6Ojo6OjotLi4uLi4uLi4tOjovLy86LS5vbW1cbiAgICAgIG1kLS4uLi4uLi4uLi4uLi46K3loZGRkZGRkaHkrLS4uLi4vZGRkZGRkZGRkZGRkZCsuLi4uLi4vc2hkZGRkZGRkeW9kbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLWhtbW1oeXl5eWRtbW1oOi4uLi9tbW1taGhoaGhoaGhoKy4uLi46eWRtbWRoeXl5aGRkb29tXG4gICAgICBtLS4uLi4uLi4uLi4uLi4uLXNzOi0uLi4uLXltbW15Li4uL21tbW0tLS0tLS0tLS0uLi4uOmRtbW1zOi0uLi4tOi8uLW1cbiAgICAgIGQuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4ueW1tbXkuLi4vbW1tbS0vK29vbys6LS4uLi55bW1teS06K29vbysvLS4uZFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uOnNtbW1kOi4uLi9tbW1taG1tbW1tbWRoKy4uLmRtbW1zaGRtbW1tbW1ocy1oXG4gICAgICBoLi4uLi4uLi4uLi4uLi4uLi4uLi4uOnNkbW1keTouLi4uOmhoZGhvKy8vK3ltbW1tKy4uZG1tbWR5by8vK3NkbW1taGhcbiAgICAgIGQuLi4uLi4uLi4uLi4uLi4uLi4tK3lkbW1keS8uLi4uLi4uLS06Li4uLi4uLnNtbW1oLi55bW1tcy4uLi4uLjptbW1tbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi06c2htbW1kcy8tLS0tLS4uLi46cy8tLS4uLi06aG1tbXMuLjpkbW1kLy0uLi4tb21tbW1tXG4gICAgICBtby4uLi4uLi4uLi4uLi4uaG1tbW1tbWhoaGhoaGhoLi4uK2RtbWRoeXl5aGRtbW15LS4uLi9obW1taHl5eWhtbW1kaG1cbiAgICAgIG1kLS4uLi4uLi4uLi4uLi5kZGRkZGRkZGRkZGRkZGQuLi4tK3NoZGRkZGRkZGh5Ly0uLi4uLi1veWRkZGRkZGRobzpkbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLjo6Ojo6Ojo6Ojo6Ojo6Oi4uLi4uLi4tOi8vLzo6LS4uLi4uLi4uLi4uLTovLy86LS4ub21tXG4gICAgICBtbW0vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi9tbW1cblxuICAgICAgOjogc3ludGFjdGljIHN1Z2FyIGJ5IDI1NlxuICAgICAgOjogaHR0cDovLzI1Ni5pby9cbiAgICAgIDo6ICN7Y29uZmlnLm1ldGEucmVwb31cbiAgICBcIlwiXCJcbiAgICBjb25zb2xlLmxvZyBhc2NpaSwgXCJjb2xvcjogZ3JleTsgZm9udC1mYW1pbHk6IE1lbmxvLCBtb25vc3BhY2U7XCJcblxuICBkZXRlY3Q6IC0+XG4gICAgaWYgKCgod2luZG93Lm91dGVySGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0KSA+IDEwMCkgfHwgKCh3aW5kb3cub3V0ZXJXaWR0aCAtIHdpbmRvdy5pbm5lcldpZHRoKSA+IDEwMCkpXG4gICAgICAjQGxsYygpXG4gICAgICBjbGVhckludGVydmFsIEBjb25zb2xlXG5cbl8uaSgpXG4iLCJjb25maWcgPSB7XCJ2aWV3XCI6e1wicGF0aHNcIjpbXCIvVXNlcnMvay9yZWNpcGVnZW4vcmVzb3VyY2VzL3ZpZXdzXCJdLFwiY29tcGlsZWRcIjpcIi9Vc2Vycy9rL3JlY2lwZWdlbi9zdG9yYWdlL2ZyYW1ld29yay92aWV3c1wifSxcImNvbG9yXCI6e1wid2hpdGUxXCI6XCIjZmZmZmZmXCIsXCJncmV5MVwiOlwiI0RFREVERVwiLFwiYmxhY2sxXCI6XCIjMDAwMDAwXCIsXCJibGFjazJcIjpcIiMyNDFGMjBcIixcImJlaWdlMVwiOlwiI0ZBRjlFZFwiLFwiYmVpZ2UyXCI6XCIjRkFGOUVkXCIsXCJnb2xkMVwiOlwiIzhkNzM0YVwiLFwiYnJvd24xXCI6XCIjOTM3MzRDXCIsXCJicm93bjJcIjpcIiM4RTc0NEJcIixcIm9yYW5nZTFcIjpcIiNFODY5NkNcIixcInJlZDFcIjpcIiNDODAwNEZcIixcImN5YW4xXCI6XCIjMjY5QTc2XCIsXCJmYWNlYm9va19ibHVlXCI6XCIjNDg2N0FBXCIsXCJpbnN0YWdyYW1fb3JcIjpcIiNGRjc4MDRcIixcInR3aXR0ZXJfYmx1ZVwiOlwiIzAwQUNFRFwifSxcImNvcHlcIjp7XCJkb3dubG9hZFwiOntcImNvcHlcIjpcIlByZXNzIGFuZCBob2xkIHlvdXIgaW1hZ2UgdG8gc2F2ZS5cIixcImluc3RhZ3JhbVwiOlwiQWZ0ZXIgeW91J3ZlIHNhdmVkIHRhcCBoZXJlXCJ9LFwicHJvZ3Jlc3NcIjp7XCJ1cGxvYWRpbmdcIjpbXCJMZXZlbGluZyBmbG91ci4uLlwiLFwiUHJlaGVhdGluZyBvdmVuLi4uXCIsXCJNZWFzdXJpbmcgc3BpY2VzLi4uXCJdLFwicHJvY2Vzc2luZ1wiOltcIlByZXBhcmluZyBnbGF6ZS4uLlwiLFwiUHJlcHBpbmcgZ2FybmlzaGVzLi4uXCIsXCJCdXR0ZXJpbmcgcGFucy4uLlwiXSxcImNvbXBsZXRlXCI6XCJSZWFkeSB0byBTaGFyZSFcIn0sXCJzdGVwXCI6e1wiY2FuY2VsXCI6XCJDQU5DRUxcIixcImluc3RydWN0aW9uc1wiOntcIjFcIjpcIlVwbG9hZCBhbiBpbWFnZSBvZiB5b3VyIGluZ3JlZGllbnRzIChXZSB3b27igJl0IHRlbGwgaWYgeW91IGxlYXZlIG91dCB5b3VyIHNlY3JldCBpbmdyZWRpZW50ISlcIixcIjJcIjpcIlVwbG9hZCBhbiBpbWFnZSBvZiB5b3VyIGZyZXNobHkgbWFkZSBkaXNoIChUaGF0IHNtZWxscyBzY3J1bXB0aW91cyEpXCIsXCIzXCI6XCJVcGxvYWQgYW4gaW1hZ2Ugb2YgaG93IHlvdSBlbmpveWVkIHlvdXIgZGlzaC4gV2l0aCBmcmllbmRzPyBXaXRoIGZhbWlseT8gT3Igd2l0aCB5b3VyIGZhdm9yaXRlIGJvdHRsZSBvZiBCZXJpbmdlciBNYWluICZhbXA7IFZpbmUhXCJ9fSxcInN0ZXBzXCI6e1wiY29weTFcIjpcIlVwbG9hZCBhbiBpbWFnZSBvZiB5b3VyIGluZ3JlZGllbnRzIChXZSB3b27igJl0IHRlbGwgaWYgeW91IGxlYXZlIG91dCB5b3VyIHNlY3JldCBpbmdyZWRpZW50ISlcIixcImNvcHkyXCI6XCJVcGxvYWQgYW4gaW1hZ2Ugb2YgeW91ciBmcmVzaGx5IG1hZGUgZGlzaCAoVGhhdCBzbWVsbHMgc2NydW1wdGlvdXMhKVwiLFwiY29weTNcIjpcIlVwbG9hZCBhbiBpbWFnZSBvZiB5b3VyIHBsYXRlZCBvciBkZWNvcmF0ZWQgZGlzaCAoT3IgdGhlIGVtcHR5IHBsYXRlLCBiZWNhdXNlIHdl4oCZdmUgYWxsIG5pYmJsZWQgc3RyYWlnaHQgb2ZmIHRoZSBjb29saW5nIHJhY2shKVwifSxcInRhbmRjXCI6W1wiVGhlIGZpbHRlcnMgcHJvdmlkZWQgdG8geW91IGhlcmV1bmRlciBieSBCZXJpbmdlciBpbmNsdWRpbmcsIGJ1dCBub3QgbGltaXRlZCB0bywgYWxsIHRleHQsIGlsbHVzdHJhdGlvbnMsIGZpbGVzLCBpbWFnZXMsIHNvZnR3YXJlLCBzY3JpcHRzLCBncmFwaGljcywgcGhvdG9zLCBzb3VuZHMsIG11c2ljLCB2aWRlb3MsIGFuZCBjb250ZW50LCBtYXRlcmlhbHMgKGNvbGxlY3RpdmVseSwgdGhlIOKAnEZpbHRlcnPigJ0pIGFuZCBhbGwgaW50ZWxsZWN0dWFsIHByb3BlcnR5IHJpZ2h0cyB0byB0aGUgc2FtZSBhcmUgb3duZWQgYnkgQmVyaW5nZXIsIGl0cyBsaWNlbnNvcnMsIG9yIGJvdGguXCIsXCJFeGNlcHQgZm9yIHRoZSBsaW1pdGVkIHVzZSByaWdodHMgZ3JhbnRlZCB0byB5b3UgaW4gdGhlc2UgVGVybXMgb2YgVXNlLCB5b3Ugc2hhbGwgbm90IGFjcXVpcmUgYW55IHJpZ2h0LCB0aXRsZSBvciBpbnRlcmVzdCBpbiB0aGUgRmlsdGVycy5cIixcIkFueSByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIGluIHRoZXNlIHRlcm0gYXJlIGV4cHJlc3NseSByZXNlcnZlZC5cIixcIllvdSBtYXkgdXNlIHRoZSBGaWx0ZXJzIG9ubHkgZm9yIHlvdXIgb25saW5lLCBwZXJzb25hbCwgbm9uLWNvbW1lcmNpYWwgdXNlLlwiLFwiT25jZSB5b3UgZG93bmxvYWQgYSBGaWx0ZXIsIEJlcmluZ2VyIGhlcmVieSBncmFudHMgeW91IGEgcGVyc29uYWwsIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgbm9uZXhjbHVzaXZlLCByZXZvY2FibGUsIGFuZCBub24tc3VibGljZW5zYWJsZSBsaWNlbnNlIHRvIHVzZSB0aGUgRmlsdGVyKHMpIHNvbGVseSBpbiBvbmxpbmUgbWVkaWEuXCIsXCJZb3UgbWF5IHVzZSB0aGUgRmlsdGVycyBvbmx5IGZvciB5b3VyIG9ubGluZSwgcGVyc29uYWwsIG5vbi1jb21tZXJjaWFsIHVzZS5cIixcIllvdSBtYXkgbm90IGNvcHksIG1vZGlmeSwgZGlzdHJpYnV0ZSwgc2VsbCwgbGVhc2UsIGNyZWF0ZSBkZXJpdmF0aXZlIHdvcmtzIG9mLCBvciBwdWJsaWNseSBkaXNwbGF5IHRoZSBGaWx0ZXJzLlwiXSxcInRoYW5reW91XCI6e1widGl0bGVcIjpcIlRoYW5rIFlvdVwiLFwiY29weVwiOlwiTmVlZCBtb3JlIGluc3BpcmF0aW9uIGZvciB5b3VyIG5leHQgZXZlbnQ/IDxici8+IFZpc2l0IG91ciA8YSBocmVmPVxcXCJodHRwOi8vd3d3Lm1haW5hbmR2aW5ld2luZS5jb20vXFxcIiB0YXJnZXQ9XFxcIm5ld1xcXCI+d2Vic2l0ZTwvYT4gZm9yIDxici8+d2luZS1wYWlyaW5nIGlkZWFzLCBob3N0aW5nIHRpcHMsIGtpdGNoZW4gdHJpY2tzLCByZWNpcGVzIGFuZCBtb3JlIVwifSxcInRpdGxlXCI6e1widGl0bGVcIjpcIkxldOKAmXMgZ2l2ZSB5b3VyIHJlY2lwZSBhIHRpdGxlOlwiLFwiY3RhXCI6XCJhZGQgaW1hZ2VzXCIsXCJjdGFiXCI6XCJjb250aW51ZVwiLFwicGxhY2Vob2xkZXJcIjpcIkVudGVyIHRpdGxlIGhlcmUgKDYwLWNoYXJhY3RlciBsaW1pdCBwbGVhc2UpOlwifSxcIndlbGNvbWVcIjp7XCJpbnRyb1wiOltcIlByZXBhcmUgJiBTaGFyZSBpcyBhbiBlYXN5LXRvLXVzZSB0b29sIGRlc2lnbmVkIHRvIGhlbHAgeW91IGNyZWF0ZSBiZWF1dGlmdWwsIGN1c3RvbSByZWNpcGUgcGljdHVyZXMgZm9yIHlvdXIgZmF2b3JpdGUgZGlzaGVzLiBJbiAzIHNpbXBsZSBzdGVwcywgc2VuZCB5b3VyIHNpZ25hdHVyZSByZWNpcGUgcGhvdG9zIHRvIGZyaWVuZHMgYW5kIGZhbWlseSwgY29sbGVjdCB0aGVtIGZvciB5b3VyIHBlcnNvbmFsIGNvb2tib29rLCBvciBzaGFyZSB3aXRoIHlvdXIgZm9sbG93ZXJzIG9uIHNvY2lhbCBtZWRpYS4gU28gd2hhdCBhcmUgeW91IHdhaXRpbmcgZm9yPyBMZXTigJlzIGdldCBjb29raW5nIVwiXSxcImN0YVwiOlwiZ2V0IHN0YXJ0ZWRcIixcImNvcHlyaWdodFwiOlwiJmNvcHk7IDIwMTcgTUFJTiAmIFZJTkUuIHwgPGEgaHJlZj1cXFwiL3RhbmRjXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+VGVybXMgJmFtcDsgQ29uZGl0aW9uczwvYT5cIn19LFwiZm9udFwiOntcImMxXCI6e1wiZm9udC1mYW1pbHlcIjpcIk1vbnRzZXJyYXRcIixcImZvbnQtc2l6ZVwiOlwiMTZweFwiLFwiZm9udC13ZWlnaHRcIjpcIjQwMFwifSxcImMyXCI6e1wiZm9udC1mYW1pbHlcIjpcIk1vbnRzZXJyYXRcIixcImZvbnQtc2l6ZVwiOlwiMjBweFwiLFwiZm9udC13ZWlnaHRcIjpcIjQwMFwifSxcImMzXCI6e1wiZm9udC1mYW1pbHlcIjpcIk1vbnRzZXJyYXRcIixcImZvbnQtc2l6ZVwiOlwiMTJweFwiLFwiZm9udC13ZWlnaHRcIjpcIjQwMFwifSxcImM0XCI6e1wiZm9udC1mYW1pbHlcIjpcIk1vbnRzZXJyYXRcIixcImZvbnQtc2l6ZVwiOlwiMTFweFwiLFwiZm9udC13ZWlnaHRcIjpcIjQwMFwifSxcImgxXCI6e1wiZm9udC1mYW1pbHlcIjpcIk1vbnRzZXJyYXRcIixcImZvbnQtc2l6ZVwiOlwiMzBweFwiLFwiZm9udC13ZWlnaHRcIjpcIjQwMFwifX0sXCJmb250MzIwXCI6e1wiYzFcIjp7XCJmb250LWZhbWlseVwiOlwiTW9udHNlcnJhdFwiLFwiZm9udC1zaXplXCI6XCIxMnB4XCIsXCJmb250LXdlaWdodFwiOlwiNDAwXCJ9LFwiYzJcIjp7XCJmb250LWZhbWlseVwiOlwiTW9udHNlcnJhdFwiLFwiZm9udC1zaXplXCI6XCIxOHB4XCIsXCJmb250LXdlaWdodFwiOlwiNDAwXCJ9LFwiYzNcIjp7XCJmb250LWZhbWlseVwiOlwiTW9udHNlcnJhdFwiLFwiZm9udC1zaXplXCI6XCIxMHB4XCIsXCJmb250LXdlaWdodFwiOlwiNDAwXCJ9LFwiYzRcIjp7XCJmb250LWZhbWlseVwiOlwiTW9udHNlcnJhdFwiLFwiZm9udC1zaXplXCI6XCIxMHB4XCIsXCJmb250LXdlaWdodFwiOlwiNDAwXCJ9LFwiaDFcIjp7XCJmb250LWZhbWlseVwiOlwiTW9udHNlcnJhdFwiLFwiZm9udC1zaXplXCI6XCIyNHB4XCIsXCJmb250LXdlaWdodFwiOlwiNDAwXCJ9fSxcIm1ldGFcIjp7XCJ0aXRsZVwiOlwiUHJlcGFyZSAmIFNoYXJlXCIsXCJ1cmxcIjpcImh0dHBzOi8vcmVjaXBlZ2VuLm1hcnRpYW5zZi5jb20vXCIsXCJpbWFnZVwiOlwiaHR0cHM6Ly9yZWNpcGVnZW4ubWFydGlhbnNmLmNvbS9pbWFnZS9zaGFyZS5qcGdcIixcImRlc2NyaXB0aW9uXCI6XCJSZWNpcGUgU2hhcmUgRGVzY3JpcHRpb25cIixcImtleXdvcmRzXCI6XCJSZWNpcGUgU2hhcmVcIixcInRyYWNraW5nX2lkXCI6XCJVQS01NjM5MDA0LThcIixcImZhY2Vib29rX2FwcF9pZFwiOjI0MzExMzMwNjEyODk2NH0sXCJzaGFyZVwiOntcInRpdGxlXCI6XCJFeGNpdGVkIHRvIHNoYXJlIG15IGxhdGVzdCByZWNpcGU6IHt7dGl0bGV9fVwiLFwiZGVzY3JpcHRpb25cIjpcIlNob3djYXNlIHlvdXIgcmVjaXBlcyBpbiBhIHNuYXAgd2l0aCBQcmVwYXJlICYgU2hhcmUsIGJ5IEJlcmluZ2VyIE1haW4gJiBWaW5lXCIsXCJ0d2l0dGVyX2Rlc2NyaXB0aW9uXCI6XCJFeGNpdGVkIHRvIHNoYXJlIG15IGxhdGVzdCByZWNpcGUhIFB1Ymxpc2ggeW91ciBvd24gd2l0aCBQcmVwYXJlICUyNiBTaGFyZSBieSBCZXJpbmdlciBNYWluICUyNiBWaW5lOiBcIixcImhhc2h0YWdcIjpcIkJldHRlclRvZ2V0aGVyXCIsXCJwaW50ZXJlc3RfZGVzY3JpcHRpb25cIjpcIk15IGxhdGVzdCBraXRjaGVuIGNyZWF0aW9uOiB7e3RpdGxlfX0sIGRlc2lnbmVkIGZvciBQaW50ZXJlc3Qgd2l0aCBQcmVwYXJlICYgU2hhcmUgYnkgQmVyaW5nZXIgTWFpbiAmIFZpbmUuIFNoYXJlIGFuZCBzZW5kIHlvdXIgb3duIHJlY2lwZXMgYXRcIn0sXCJkZWJ1Z2JhclwiOntcImVuYWJsZWRcIjpudWxsLFwic3RvcmFnZVwiOntcImVuYWJsZWRcIjp0cnVlLFwiZHJpdmVyXCI6XCJmaWxlXCIsXCJwYXRoXCI6XCIvVXNlcnMvay9yZWNpcGVnZW4vc3RvcmFnZS9kZWJ1Z2JhclwiLFwiY29ubmVjdGlvblwiOm51bGwsXCJwcm92aWRlclwiOlwiXCJ9LFwiaW5jbHVkZV92ZW5kb3JzXCI6dHJ1ZSxcImNhcHR1cmVfYWpheFwiOnRydWUsXCJjbG9ja3dvcmtcIjpmYWxzZSxcImNvbGxlY3RvcnNcIjp7XCJwaHBpbmZvXCI6dHJ1ZSxcIm1lc3NhZ2VzXCI6dHJ1ZSxcInRpbWVcIjp0cnVlLFwibWVtb3J5XCI6dHJ1ZSxcImV4Y2VwdGlvbnNcIjp0cnVlLFwibG9nXCI6dHJ1ZSxcImRiXCI6dHJ1ZSxcInZpZXdzXCI6dHJ1ZSxcInJvdXRlXCI6dHJ1ZSxcImxhcmF2ZWxcIjpmYWxzZSxcImV2ZW50c1wiOmZhbHNlLFwiZGVmYXVsdF9yZXF1ZXN0XCI6ZmFsc2UsXCJzeW1mb255X3JlcXVlc3RcIjp0cnVlLFwibWFpbFwiOnRydWUsXCJsb2dzXCI6ZmFsc2UsXCJmaWxlc1wiOmZhbHNlLFwiY29uZmlnXCI6ZmFsc2UsXCJhdXRoXCI6ZmFsc2UsXCJnYXRlXCI6ZmFsc2UsXCJzZXNzaW9uXCI6dHJ1ZX0sXCJvcHRpb25zXCI6e1wiYXV0aFwiOntcInNob3dfbmFtZVwiOmZhbHNlfSxcImRiXCI6e1wid2l0aF9wYXJhbXNcIjp0cnVlLFwidGltZWxpbmVcIjpmYWxzZSxcImJhY2t0cmFjZVwiOmZhbHNlLFwiZXhwbGFpblwiOntcImVuYWJsZWRcIjpmYWxzZSxcInR5cGVzXCI6W1wiU0VMRUNUXCJdfSxcImhpbnRzXCI6dHJ1ZX0sXCJtYWlsXCI6e1wiZnVsbF9sb2dcIjpmYWxzZX0sXCJ2aWV3c1wiOntcImRhdGFcIjpmYWxzZX0sXCJyb3V0ZVwiOntcImxhYmVsXCI6dHJ1ZX0sXCJsb2dzXCI6e1wiZmlsZVwiOm51bGx9fSxcImluamVjdFwiOnRydWUsXCJyb3V0ZV9wcmVmaXhcIjpcIl9kZWJ1Z2JhclwifSxcImFwcFwiOntcImVkaXRvclwiOlwibWFjdmltXCJ9LFwiY2FjaGVcIjp7XCJkZWZhdWx0XCI6XCJhcnJheVwiLFwic3RvcmVzXCI6e1wiYXBjXCI6e1wiZHJpdmVyXCI6XCJhcGNcIn0sXCJhcnJheVwiOntcImRyaXZlclwiOlwiYXJyYXlcIn0sXCJkYXRhYmFzZVwiOntcImRyaXZlclwiOlwiZGF0YWJhc2VcIixcInRhYmxlXCI6XCJjYWNoZVwiLFwiY29ubmVjdGlvblwiOm51bGx9LFwiZmlsZVwiOntcImRyaXZlclwiOlwiZmlsZVwiLFwicGF0aFwiOlwiL1VzZXJzL2svcmVjaXBlZ2VuL3N0b3JhZ2UvZnJhbWV3b3JrL2NhY2hlXCJ9LFwibWVtY2FjaGVkXCI6e1wiZHJpdmVyXCI6XCJtZW1jYWNoZWRcIixcInNlcnZlcnNcIjpbe1wiaG9zdFwiOlwiMTI3LjAuMC4xXCIsXCJwb3J0XCI6MTEyMTEsXCJ3ZWlnaHRcIjoxMDB9XX0sXCJyZWRpc1wiOntcImRyaXZlclwiOlwicmVkaXNcIixcImNvbm5lY3Rpb25cIjpcImRlZmF1bHRcIn19LFwicHJlZml4XCI6XCJsYXJhdmVsXCJ9LFwicXVldWVcIjp7XCJkZWZhdWx0XCI6XCJhcnJheVwiLFwiY29ubmVjdGlvbnNcIjp7XCJzeW5jXCI6e1wiZHJpdmVyXCI6XCJzeW5jXCJ9LFwiZGF0YWJhc2VcIjp7XCJkcml2ZXJcIjpcImRhdGFiYXNlXCIsXCJ0YWJsZVwiOlwiam9ic1wiLFwicXVldWVcIjpcImRlZmF1bHRcIixcImV4cGlyZVwiOjYwfSxcImJlYW5zdGFsa2RcIjp7XCJkcml2ZXJcIjpcImJlYW5zdGFsa2RcIixcImhvc3RcIjpcImxvY2FsaG9zdFwiLFwicXVldWVcIjpcImRlZmF1bHRcIixcInR0clwiOjYwfSxcInNxc1wiOntcImRyaXZlclwiOlwic3FzXCIsXCJrZXlcIjpcInlvdXItcHVibGljLWtleVwiLFwic2VjcmV0XCI6XCJ5b3VyLXNlY3JldC1rZXlcIixcInF1ZXVlXCI6XCJ5b3VyLXF1ZXVlLXVybFwiLFwicmVnaW9uXCI6XCJ1cy1lYXN0LTFcIn0sXCJpcm9uXCI6e1wiZHJpdmVyXCI6XCJpcm9uXCIsXCJob3N0XCI6XCJtcS1hd3MtdXMtZWFzdC0xLmlyb24uaW9cIixcInRva2VuXCI6XCJ5b3VyLXRva2VuXCIsXCJwcm9qZWN0XCI6XCJ5b3VyLXByb2plY3QtaWRcIixcInF1ZXVlXCI6XCJ5b3VyLXF1ZXVlLW5hbWVcIixcImVuY3J5cHRcIjp0cnVlfSxcInJlZGlzXCI6e1wiZHJpdmVyXCI6XCJyZWRpc1wiLFwiY29ubmVjdGlvblwiOlwiZGVmYXVsdFwiLFwicXVldWVcIjpcImRlZmF1bHRcIixcInJldHJ5X2FmdGVyXCI6NjB9fSxcImZhaWxlZFwiOntcImRhdGFiYXNlXCI6XCJtb25nb2RiXCIsXCJ0YWJsZVwiOlwiZmFpbGVkX2pvYnNcIn19fTsiLCJEYXRhID1cbiAgc3RlcHM6IFtdXG4gIGxhYmVsczogWyAnaW5ncmVkaWVudHMnLCAncHJlcGFyZWQnLCAnZW5qb3llZCcgXVxuICB0aXRsZTogZmFsc2VcbiAgaGVhZGVyOiBmYWxzZVxuICBmb290ZXI6IGZhbHNlXG4gIGdhcDogNDBcblxuICBjYW52YXM6IGZhbHNlXG4gIGpzemlwOiBmYWxzZVxuXG4gIGxvYWRIRjogLT5cbiAgICBAbG9hZFByZXNldCAnaGVhZGVyJ1xuICAgIEBsb2FkUHJlc2V0ICdmb290ZXInXG5cbiAgbG9hZFByZXNldDogKG5hbWUpIC0+XG4gICAgaW1nID0gbmV3IEltYWdlKClcbiAgICBpbWcub25sb2FkID0gLT5cbiAgICAgIERhdGFbbmFtZV0gPSBpbWdcbiAgICBpbWcuc3JjID0gXCIvaW1hZ2UvI3tuYW1lfS5wbmdcIlxuXG4gIHNhdmU6IChzdGVwLCBjYWxsYmFjaykgLT5cblxuICAgIGlmIEltZy5jcm9wcGVkIGlzIGZhbHNlXG4gICAgICByZXR1cm4gY2FsbGJhY2sgZmFsc2VcblxuICAgIF9VUkwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkxcblxuICAgIEltZy5jcm9wcGVkLmNyb3BwaWUoJ3Jlc3VsdCcsICdibG9iJykudGhlbiAoYmxvYikgLT5cblxuICAgICAgaW1nID0gbmV3IEltYWdlKClcblxuICAgICAgaW1nLm9ubG9hZCA9IC0+XG5cbiAgICAgICAgRGF0YS5zdGVwc1tzdGVwLTFdID1cbiAgICAgICAgICBpbWFnZTogaW1nXG4gICAgICAgICAgYmxvYjogYmxvYlxuXG4gICAgICAgIERhdGEucG9wdWxhdGUgc3RlcFxuXG4gICAgICBpbWcuc3JjID0gX1VSTC5jcmVhdGVPYmplY3RVUkwgYmxvYlxuXG4gICAgICBjYWxsYmFjayB0cnVlXG5cbiAgcG9wdWxhdGU6IChzdGVwKSAtPlxuXG4gICAgXy5vZmYgXCIuc3RlcC5zdGVwXyN7c3RlcH0gPiAuaW5uZXIgPiAuc3RhdHVzID4gLnBlbmRpbmdcIlxuICAgIF8ub24gXCIuc3RlcC5zdGVwXyN7c3RlcH0gPiAuaW5uZXIgPiAuc3RhdHVzID4gLmNvbXBsZXRlXCJcblxuICAgIF8ub2ZmIFwiLnN0ZXAuc3RlcF8je3N0ZXB9ID4gLmlubmVyID4gLmltYWdlID4gLnN2Z1wiXG4gICAgXy5vZmYgXCIuc3RlcC5zdGVwXyN7c3RlcH0gPiAuaW5uZXIgPiAuaW1hZ2UgPiAuY29weVwiXG5cbiAgICAkKFwiLnN0ZXAuc3RlcF8je3N0ZXB9ID4gLmlubmVyID4gLmltYWdlXCIpLmNzcyAnYmFja2dyb3VuZC1pbWFnZScsIFwidXJsKCN7RGF0YS5zdGVwc1tzdGVwLTFdLmltYWdlLnNyY30pXCJcblxuICAgIGlmIERhdGEuc3RlcHMubGVuZ3RoID49IDNcbiAgICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICAgXy5vbiAnLnBhZ2Vfc3RlcHMgPiAuY3RhX3ByZXZpZXcnXG4gICAgICAsIDIwMFxuXG4gIHppcDogKGNvbXBsZXRlKSAtPlxuXG4gICAgQGpzemlwID0gbmV3IEpTWmlwKClcblxuICAgIGZvciBzdGVwIGluIFswLi4yXVxuICAgICAgaWYgQHN0ZXBzW3N0ZXBdIGlzbnQgdW5kZWZpbmVkXG4gICAgICAgIEBqc3ppcC5maWxlIFwic3RlcCN7c3RlcCsxfS5qcGdcIiwgRGF0YS5zdGVwc1tzdGVwXS5ibG9iXG5cbiAgICBEYXRhLmNhbnZhcy50b0Jsb2IgKGJsb2IpIC0+XG4gICAgICBuZXdJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdpbWcnXG4gICAgICBfVVJMID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMXG4gICAgICB1cmwgPSBfVVJMLmNyZWF0ZU9iamVjdFVSTCBibG9iXG5cbiAgICAgIG5ld0ltZy5vbmxvYWQgPSAtPlxuICAgICAgICBfVVJMLnJldm9rZU9iamVjdFVSTCB1cmxcblxuICAgICAgbmV3SW1nLnNyYyA9IHVybFxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCBuZXdJbWdcblxuICAgICAgRGF0YS5qc3ppcC5maWxlICdjb21wbGV0ZS5qcGcnLCBibG9iXG4gICAgICBjb21wbGV0ZSgpXG5cbiAgICAsIFwiaW1hZ2UvanBlZ1wiXG5cblxuIiwiRmlsdGVyID0gLT5cblxuICByZXR1cm4gZmFsc2UgaWYgSW1nLmNyb3BwZWQgaXMgZmFsc2VcblxuICBJbWcuY3JvcHBlZC5jcm9wcGllKCdyZXN1bHQnLCAnYmxvYicpLnRoZW4gKGJsb2IpIC0+XG5cbiAgICBTaGFyZS5ibG9iID0gYmxvYlxuXG4gICAgX1VSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTFxuXG4gICAgaW1nID0gbmV3IEltYWdlKClcbiAgICBpbWcub25sb2FkID0gLT5cbiAgICAgIFxuICAgICAgY2FudmFzID0gJCgnLnBhZ2VfZmlsdGVyID4gLmNhbnZhcyA+IGNhbnZhcycpWzBdXG4gICAgICBjYW52YXMud2lkdGggPSBJbmRleC53aWR0aFxuICAgICAgY2FudmFzLmhlaWdodCA9IEluZGV4LndpZHRoXG4gICAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDAsIEluZGV4LndpZHRoLCBJbmRleC53aWR0aClcbiAgICAgIFBhZ2UgJ2ZpbHRlcidcbiAgICAgIF8ub2ZmICcucGFnZV93ZWxjb21lJ1xuICAgICAgU3Bpbm5lci5kKClcbiAgICAgIEluZGV4Lm1vZGUgPSAnZmlsdGVyJ1xuXG4gICAgICBfLm9uICcucGFnZV9maWx0ZXIgPiAuZmlsdGVycydcblxuICAgICAgaWYgSW5kZXguc2xpY2tlZCBpcyBmYWxzZVxuICAgICAgICBJbmRleC5zbGlja2VkID0gJCgnLnBhZ2VfZmlsdGVyID4gLmZpbHRlcnMgPiAuaW5uZXInKS5zbGlja1xuICAgICAgICAgIGluaXRpYWxTbGlkZTogMFxuICAgICAgICAgIG1vYmlsZUZpcnN0OiB0cnVlXG4gICAgICAgICAgc3dpcGU6IHRydWVcbiAgICAgICAgICBzd2lwZVRvU2xpZGU6IHRydWVcbiAgICAgICAgICBhcnJvd3M6IGZhbHNlXG4gICAgICAgICAgZHJhZ2dhYmxlOiB0cnVlXG4gICAgICAgICAgaW5maW5pdGU6IHRydWVcbiAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcbiAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxuICAgICAgICBJbmRleC5zbGlja2VkLm9uICdhZnRlckNoYW5nZScsIFNoYXJlLmZpbHRlckhhbmRsZXJcbiAgICAgICAgJCgnLmZpbHRlcnMgPiAuaW5kZXgnKS5odG1sIFwiMSAvICN7Y29uZmlnLmZpbHRlcnMubGVuZ3RofVwiXG5cbiAgICBpbWcuc3JjID0gX1VSTC5jcmVhdGVPYmplY3RVUkwoYmxvYilcbiAgXG4iLCJJbWcgPVxuXG4gIGNyb3BwZWQ6IGZhbHNlXG5cbiAgY2hhbmdlOiAtPlxuICAgIFNwaW5uZXIuaSgkKCdodG1sJykpXG5cbiAgICBjb25zb2xlLmxvZyB0aGlzLmZpbGVzXG5cbiAgICBpZiB0aGlzLmZpbGVzIGlzIHVuZGVmaW5lZFxuICAgICAgU3Bpbm5lci5kKClcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgaWYgdHlwZW9mIHRoaXMuZmlsZXMgaXNudCAnb2JqZWN0J1xuICAgICAgcmV0dXJuIFNwaW5uZXIuZCgpXG4gICAgICByZXR1cm4gZmFsc2VcblxuICAgIGlmIHRoaXMuZmlsZXNbMF0uc2l6ZSA+IDgwMDAwMDBcbiAgICAgIGFsZXJ0ICdGaWxlIHNpemUgbXVzdCBub3QgZXhjZWVkIDhNQidcbiAgICAgIHJldHVybiBTcGlubmVyLmQoKVxuXG4gICAgI0VYSUYuZ2V0RGF0YSB0aGlzLmZpbGVzWzBdLCAtPlxuICAgICMgIGNvbnNvbGUubG9nIEVYSUYuZ2V0QWxsVGFncyh0aGlzKVxuICAgIGxvYWRJbWFnZSB0aGlzLmZpbGVzWzBdLFxuXG4gICAgICAoY2FudmFzLCBtZXRhZGF0YSkgLT5cblxuICAgICAgICAjZXhpZiA9IG1ldGFkYXRhLmV4aWYuZ2V0QWxsKClcblxuICAgICAgICBfVVJMID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMXG4gICAgICAgIGltZyA9IG5ldyBJbWFnZSgpXG4gICAgICAgIGltZy5zcmMgPSBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9qcGVnJylcbiAgICAgICAgaW1nLm9ubG9hZCA9IC0+XG5cbiAgICAgICAgICBNQVhfV0lEVEggPSAxMDAwXG4gICAgICAgICAgTUFYX0hFSUdIVCA9IDEwMDBcblxuICAgICAgICAgIGNhbnZhczIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdjYW52YXMnXG4gICAgICAgICAgY3R4ID0gY2FudmFzMi5nZXRDb250ZXh0ICcyZCdcblxuICAgICAgICAgIHdpZHRoID0gaW1nLndpZHRoXG4gICAgICAgICAgaGVpZ2h0ID0gaW1nLmhlaWdodFxuXG4gICAgICAgICAgaWYgd2lkdGggPiBoZWlnaHRcbiAgICAgICAgICAgIGlmIHdpZHRoID4gTUFYX1dJRFRIXG4gICAgICAgICAgICAgIGhlaWdodCAqPSBNQVhfV0lEVEggLyB3aWR0aFxuICAgICAgICAgICAgICB3aWR0aCA9IE1BWF9XSURUSFxuXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgaWYgaGVpZ2h0ID4gTUFYX0hFSUdIVFxuICAgICAgICAgICAgICB3aWR0aCAqPSBNQVhfSEVJR0hUIC8gaGVpZ2h0XG4gICAgICAgICAgICAgIGhlaWdodCA9IE1BWF9IRUlHSFRcblxuICAgICAgICAgIGNhbnZhczIud2lkdGggPSB3aWR0aFxuICAgICAgICAgIGNhbnZhczIuaGVpZ2h0ID0gaGVpZ2h0XG5cbiAgICAgICAgICBjdHguZHJhd0ltYWdlIGltZywgMCwgMCwgd2lkdGgsIGhlaWdodFxuICAgICAgICAgIEltZy5jcm9wIGNhbnZhczIudG9EYXRhVVJMKCdpbWFnZS9qcGVnJylcblxuICAgICAgY2FudmFzOiB0cnVlXG4gICAgICBvcmllbnRhdGlvbjogdHJ1ZVxuXG4gIGNyb3A6ICh1cmwpIC0+XG5cbiAgICBAY3JvcHBlZC5jcm9wcGllKCdkZXN0cm95JykgaWYgQGNyb3BwZWQgaXNudCBmYWxzZVxuXG4gICAgXy5vZmYgJy5wYWdlX3N0ZXAgPiAuaW1hZ2UnXG4gICAgem9vbWVyID0gSW5kZXgucndpZHRoID4gMTAwMCA/IHRydWUgOiBmYWxzZVxuICAgIEBjcm9wcGVkID0gJCgnLnBhZ2Vfc3RlcCA+IC5pbWFnZScpLmNyb3BwaWVcbiAgICAgIHVybDogdXJsXG4gICAgICBlbmZvcmFjZUJvdW5kYXJ5OiBmYWxzZVxuICAgICAgc2hvd1pvb21lcjogem9vbWVyXG4gICAgICB2aWV3cG9ydDpcbiAgICAgICAgd2lkdGg6IEluZGV4LndpZHRoLTUwXG4gICAgICAgIGhlaWdodDogKEluZGV4LndpZHRoL1N0ZXAucmF0aW9bMF0pLTUwXG4gICAgICBib3VuZGFyeTpcbiAgICAgICAgd2lkdGg6IEluZGV4LndpZHRoXG4gICAgICAgIGhlaWdodDogSW5kZXgud2lkdGgvU3RlcC5yYXRpb1swXVxuXG4gICAgU3Bpbm5lci5kKClcbiIsIkluZGV4ID1cbiAgaGVpZ2h0OiBmYWxzZVxuICB3aWR0aDogZmFsc2VcbiAgcndpZHRoOiBmYWxzZVxuICBoZWFkZXI6XG4gICAgaGVpZ2h0OiBmYWxzZVxuICBoYXNoOiBmYWxzZVxuXG4gIGk6IC0+XG5cbiAgICAjIGNhY2hlIG91ciB3aW5kb3dcbiAgICBAd2lkdGggPSBAcndpZHRoID0gJCh3aW5kb3cpLndpZHRoKClcbiAgICBAd2lkdGggPSA2MDAgaWYgQHdpZHRoID4gNjAwXG4gICAgQGhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKVxuICAgIEBoZWFkZXIuaGVpZ2h0ID0gJCgnaGVhZGVyJykuaGVpZ2h0KClcblxuICAgICMgc2V0IG91ciAucGFnZSBhbmQgLnBhZ2UuZnVsbCBoZWlnaHRzIHRvIGFjY29tb2RhdGUgaW9zIGJvdHRvbSBiYXJzXG4gICAgIyB3aHkgd2UgY2FudCBkbyB0aGlzIGluIGNzcyBpcyB0aGUgYmlnIG15c3RlcnlcbiAgICAkKCcucGFnZS5mdWxsJykuY3NzICdoZWlnaHQnLCBcIiN7QGhlaWdodH1weFwiXG4gICAgJCgnLnBhZ2UnKS5ub3QoJy5mdWxsJykubm90KCcuY3VzdG9tJykuY3NzICdoZWlnaHQnLCBcIiN7QGhlaWdodC1AaGVhZGVyLmhlaWdodH1weFwiXG5cbiAgICBAaGFuZGxlcnMoKVxuXG4gICAgIyBjYWNoZSBvdXIgcHJlc2V0IGltYWdlcyBmb3Igb3VyIHByZXZpZXdcbiAgICBEYXRhLmxvYWRIRigpXG5cbiAgICAjIGRldGVjdCBpZiB3ZSBhcmUgY29taW5nIGZyb20gYW4gZXhpc3Rpbmcgc2hhcmVcbiAgICBpZiBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSBpc250IFwiL1wiXG4gICAgICBoYXNoID0gZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgnLycsICcnKVxuICAgICAgSW5kZXguaGFzaCA9IGhhc2hcbiAgICAgIF8ub24gJy5wYWdlX3N1Ym1pdCdcbiAgICAgIF8ub2ZmICcucGFnZV93ZWxjb21lLCAucGFnZV9zdGVwcydcbiAgICAgICQoJy5wYWdlX3N1Ym1pdCA+IC5pbm5lciA+IC5pbWFnZSA+IC5pbm5lcicpLmF0dHIgJ3NyYycsIFwiL2ltYWdlLyN7aGFzaH0uanBnXCJcbiAgICAgICQoJy5wYWdlX3N1Ym1pdCA+IC5pbm5lciA+IC5jdGEnKS5vbiAnY2xpY2snLCAtPlxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy8nXG5cbiAgaGFuZGxlcnM6IC0+XG5cbiAgICAkKCcucGFnZV93ZWxjb21lID4gLmlubmVyID4gLmN0YScpLm9uICdjbGljaycsIEB3ZWxjb21lSGFuZGxlclxuICAgICQoJy5wYWdlX3RpdGxlID4gLmlubmVyID4gLm1pZGRsZScpLm9uICdjbGljaycsICcuY3RhLm9uJywgQHRpdGxlSGFuZGxlclxuICAgICQoJy5wYWdlX3RpdGxlID4gLmlubmVyID4gLm1pZGRsZSA+IC50ZXh0YXJlYSA+IHRleHRhcmVhJykub24gJ2tleXVwIGlucHV0IHByb3BlcnR5Y2hhbmdlJywgQGNoYXJIYW5kbGVyXG5cbiAgICAkKCcucGFnZV9zdGVwcyA+IC50aXRsZSA+IC5lZGl0JykuY2xpY2sgQHdlbGNvbWVIYW5kbGVyXG4gICAgJCgnLnBhZ2Vfc3RlcHMgPiAuc3RlcCcpLmNsaWNrIEBzdGVwSGFuZGxlclxuICAgICQoJy5wYWdlX3N0ZXBzID4gLmN0YV9wcmV2aWV3JykuY2xpY2sgQHByZXZpZXdIYW5kbGVyXG5cbiAgcHJldmlld0hhbmRsZXI6IC0+XG4gICAgXy50ICdidXR0b25zJywgJ3ByZXZpZXcnLCAncHJlc3NlZCdcbiAgICAjIyNcbiAgICBpZiBEYXRhLnN0ZXBzLmxlbmd0aCA8IDFcbiAgICAgIE5vdGljZS5pICdQbGVhc2UgZmlsbCBvdXQgYXQgbGVhc3QgMSBzdGVwIHRvIGNvbnRpbnVlJ1xuICAgICAgcmV0dXJuIHRydWVcbiAgICAjIyNcbiAgICBpZiBEYXRhLnRpdGxlIGlzIGZhbHNlIG9yIERhdGEudGl0bGUgaXMgJydcbiAgICAgIE5vdGljZS5pICdQbGVhc2Ugc3BlY2lmeSBhIHRpdGxlJ1xuICAgICAgcmV0dXJuIHRydWVcblxuICAgIFByZXZpZXcuaSgpXG5cbiAgd2VsY29tZUhhbmRsZXI6IC0+XG4gICAgXy50ICdidXR0b25zJywgJ2dldCBzdGFydGVkJywgJ3ByZXNzZWQnXG4gICAgXy5vZmYgJy5wYWdlX3N0ZXBzJ1xuICAgIF8ub2ZmICcucGFnZV93ZWxjb21lJ1xuICAgIF8ub24gJy5wYWdlX3RpdGxlJ1xuICAgIGlmIERhdGEudGl0bGUgaXNudCAnJyBhbmQgRGF0YS50aXRsZSBpc250IGZhbHNlXG4gICAgICAkKCcucGFnZV90aXRsZSA+IC5pbm5lciA+IC5taWRkbGUgPiAudGV4dGFyZWEgPiB0ZXh0YXJlYScpLnZhbCBEYXRhLnRpdGxlXG5cbiAgY2hhckhhbmRsZXI6IC0+XG5cbiAgICB2YWwgPSAkKHRoaXMpLnZhbCgpXG4gICAgaWYgdmFsLmxlbmd0aCA+IDAgYW5kIHZhbC5sZW5ndGggPD0gNjBcbiAgICAgIF8ub24gJy5wYWdlX3RpdGxlID4gLmlubmVyID4gLm1pZGRsZSA+IC5jdGEnXG4gICAgZWxzZVxuICAgICAgXy5vZmYgJy5wYWdlX3RpdGxlID4gLmlubmVyID4gLm1pZGRsZSA+IC5jdGEnXG5cbiAgICBpZiB2YWwubGVuZ3RoID4gNjBcbiAgICAgIF8ub24gJy5jaGFycydcbiAgICBlbHNlXG4gICAgICBfLm9mZiAnLmNoYXJzJ1xuXG5cbiAgICAkKCcuY2hhcnMgPiAuY291bnQnKS50ZXh0IFwiI3t2YWwubGVuZ3RofSBvZiA2MFwiXG5cbiAgdGl0bGVIYW5kbGVyOiAtPlxuXG4gICAgXy50ICdidXR0b25zJywgJ2FkZCBpbWFnZXMnLCAncHJlc3NlZCdcblxuICAgIHRpdGxlID0gJCgnLnBhZ2VfdGl0bGUgPiAuaW5uZXIgPiAubWlkZGxlID4gLnRleHRhcmVhID4gdGV4dGFyZWEnKS52YWwoKVxuXG4gICAgaWYgdGl0bGUubGVuZ3RoID4gNjBcbiAgICAgIE5vdGljZS5pICdQbGVhc2UgbGltaXQgeW91ciB0aXRsZSB0byB1bmRlciA2MCBjaGFyYWN0ZXJzJ1xuICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICBfLm9mZiAnLnBhZ2VfdGl0bGUgPiAuaW5uZXIgPiAubWlkZGxlID4gLmN0YSA+IC5jb3B5J1xuICAgIF8ub24gJy5wYWdlX3RpdGxlID4gLmlubmVyID4gLm1pZGRsZSA+IC5jdGEgPiAuY29weWInXG5cbiAgICBEYXRhLnRpdGxlID0gdGl0bGVcbiAgICBpZiBEYXRhLnRpdGxlIGlzbnQgJycgYW5kIERhdGEudGl0bGUgaXNudCBmYWxzZVxuICAgICAgJCgnLnBhZ2Vfc3RlcHMgPiAudGl0bGUgPiAuY29weScpLmh0bWwgRGF0YS50aXRsZVxuICAgICAgY29uZmlnLnNoYXJlLmRnZW5lcmF0ZWQgPSBjb25maWcuc2hhcmUuZGVzY3JpcHRpb24ucmVwbGFjZSAne3t0aXRsZX19JywgRGF0YS50aXRsZVxuICAgICAgY29uZmlnLnNoYXJlLnR3aXR0ZXJfZGdlbmVyYXRlZCA9IGNvbmZpZy5zaGFyZS50d2l0dGVyX2Rlc2NyaXB0aW9uLnJlcGxhY2UgJ3t7dGl0bGV9fScsIERhdGEudGl0bGVcbiAgICAgIGNvbmZpZy5zaGFyZS5waW50ZXJlc3RfZGdlbmVyYXRlZCA9IGNvbmZpZy5zaGFyZS5waW50ZXJlc3RfZGVzY3JpcHRpb24ucmVwbGFjZSAne3t0aXRsZX19JywgRGF0YS50aXRsZVxuICAgICAgU2hhcmUuaGFzaGlkID0gZmFsc2UgaWYgU2hhcmUuaGFzaGlkIGlzbnQgZmFsc2VcblxuICAgIF8ub2ZmICcucGFnZV90aXRsZSdcbiAgICBfLm9uICcucGFnZV9zdGVwcydcblxuICBzdGVwSGFuZGxlcjogLT5cbiAgICBzdGVwID0gJCh0aGlzKS5kYXRhICdzdGVwJ1xuICAgIF8udCAnYnV0dG9ucycsIFwic3RlcCAjICN7c3RlcH1cIiwgJ3ByZXNzZWQnXG4gICAgU3RlcC5pIHN0ZXBcblxuIiwiTm90aWNlID1cblxuICB0eXBlczogWydpbmZvJywnc3VjY2VzcycsJ3dhcm5pbmcnXVxuXG4gIGVsOiBmYWxzZVxuXG4gIG9uOiBmYWxzZVxuICBwcm9ncmVzczogZmFsc2VcbiAgdGltZW91dDogZmFsc2VcbiAgY2xvc2U6IHRydWVcblxuICBkZWZhdWx0OlxuICAgIHR5cGU6ICdpbmZvJ1xuICAgIHByb2dyZXNzOiBmYWxzZVxuICAgIHRpbWVvdXQ6IDMwMDBcblxuICBpOiAoY29weSxvcHRpb25zPXt9KSAtPlxuXG4gICAgQG9wdGlvbnMgPSBPYmplY3QuYXNzaWduIHt9LCBAZGVmYXVsdFxuXG4gICAgZm9yIGtleSwgcGFyYW0gb2Ygb3B0aW9uc1xuICAgICAgQG9wdGlvbnNba2V5XSA9IHBhcmFtXG5cbiAgICBAZWwgPSAkKCcubm90aWNlJykgaWYgQGVsIGlzIGZhbHNlXG5cbiAgICBmb3IgZHR5cGUgaW4gQHR5cGVzXG4gICAgICBAZWwucmVtb3ZlQ2xhc3MgZHR5cGVcbiAgICBAZWwuYWRkQ2xhc3MgQG9wdGlvbnMudHlwZVxuICAgIEBlbC5maW5kKCcuY29weSA+IC5tZXNzYWdlJykuaHRtbCBjb3B5XG5cbiAgICBpZiBAb3B0aW9ucy5wcm9ncmVzcyBpc250IGZhbHNlXG4gICAgICBpZiBAcHJvZ3Jlc3MgaXMgZmFsc2VcbiAgICAgICAgXy5vbiBAZWwuZmluZCgnLm5vdGljZV9wcm9ncmVzcycpXG4gICAgICAgIEBwcm9ncmVzcyA9IHRydWVcbiAgICAgIGlmIEBjbG9zZSBpcyB0cnVlXG4gICAgICAgIF8ub2ZmIEBlbC5maW5kKCcuY2xvc2UnKVxuICAgICAgICBAY2xvc2UgPSBmYWxzZVxuICAgICAgaWYgQG9uIGlzIGZhbHNlXG4gICAgICAgIHNldFRpbWVvdXQgPT5cbiAgICAgICAgICBAZWwuZmluZCgnLmZ1bGwnKS5jc3MoJ3dpZHRoJywgQG9wdGlvbnMucHJvZ3Jlc3MqMTAwICsgJyUnKVxuICAgICAgICAsIDEwMFxuICAgICAgZWxzZVxuICAgICAgICBAZWwuZmluZCgnLmZ1bGwnKS5jc3MoJ3dpZHRoJywgQG9wdGlvbnMucHJvZ3Jlc3MqMTAwICsgJyUnKVxuXG4gICAgaWYgQG9wdGlvbnMucHJvZ3Jlc3MgaXMgZmFsc2UgYW5kIEBwcm9ncmVzcyBpcyB0cnVlXG4gICAgICBAZWwuZmluZCgnLmZ1bGwnKS5jc3MoJ3dpZHRoJywgJzAlJylcbiAgICAgIF8ub2ZmIEBlbC5maW5kKCcubm90aWNlX3Byb2dyZXNzJylcbiAgICAgIEBwcm9ncmVzcyA9IGZhbHNlXG4gICAgICBfLm9uIEBlbC5maW5kKCcuY2xvc2UnKVxuICAgICAgQGNsb3NlID0gdHJ1ZVxuXG4gICAgaWYgQG9uIGlzIGZhbHNlXG4gICAgICBfLm9uIEBlbFxuICAgICAgQGhhbmRsZXJzLm9uKClcbiAgICAgIEBvbiA9IHRydWVcblxuICAgIGlmIEBvcHRpb25zLnRpbWVvdXQgaXNudCBmYWxzZSBhbmQgQG9wdGlvbnMucHJvZ3Jlc3MgaXMgZmFsc2VcbiAgICAgIEB0aW1lb3V0ID0gc2V0VGltZW91dCA9PlxuICAgICAgICBAZCgpXG4gICAgICAsIEBvcHRpb25zLnRpbWVvdXRcblxuICBoYW5kbGVyczpcbiAgICBvbjogLT5cbiAgICAgICQoJy5ub3RpY2UnKS5vbiAnY2xpY2snLCAnLmlubmVyID4gLmNsb3NlID4gLmlubmVyJywgTm90aWNlLmRcbiAgICBvZmY6IC0+XG4gICAgICAkKCcubm90aWNlJykub2ZmICdjbGljaycsICcuaW5uZXIgPiAuY2xvc2UgPiAuaW5uZXInLCBOb3RpY2UuZFxuXG4gIGQ6IC0+XG4gICAgY2xlYXJUaW1lb3V0IE5vdGljZS50aW1lb3V0IGlmIE5vdGljZS50aW1lb3V0IGlzbnQgZmFsc2VcbiAgICBOb3RpY2UudGltZW91dCA9IGZhbHNlXG4gICAgTm90aWNlLmhhbmRsZXJzLm9mZigpXG4gICAgXy5vbiBOb3RpY2UuZWwuZmluZCgnLmNsb3NlJylcbiAgICBOb3RpY2UuY2xvc2UgPSB0cnVlXG4gICAgXy5vZmYgTm90aWNlLmVsLmZpbmQoJy5ub3RpY2VfcHJvZ3Jlc3MnKVxuICAgIE5vdGljZS5wcm9ncmVzcyA9IGZhbHNlXG4gICAgXy5vZmYgTm90aWNlLmVsLCBvZmZpbmc6IHRydWUsIG9mZnRpbWU6IDAuMlxuICAgIE5vdGljZS5vbiA9IGZhbHNlXG4iLCJQYWdlID0gKHBhZ2UpIC0+XG5cbiAgXy5vZmYgJy5wYWdlLCAubW9kZXMgPiAub3V0ZXIgPiAuaW5uZXIgLm1vZGUnXG4gIF8ub24gXCIucGFnZS5wYWdlXyN7cGFnZX0sIC5tb2RlcyA+IC5vdXRlciA+IC5pbm5lciA+IC5tb2RlLm1vZGVfI3twYWdlfVwiXG5cblxuIiwiUHJldmlldyA9XG4gIGNyb3BwZWQ6IGZhbHNlXG4gIGZ1bGxoZWlnaHQ6IDBcbiAgZ2FwOiA0MFxuXG4gIGk6IC0+XG5cbiAgICBfLm9mZiAnLnBhZ2Vfc3RlcHMnXG4gICAgXy5vbiAnLnBhZ2VfcHJldmlldydcblxuICAgIEBmdWxsaGVpZ2h0ID0gMFxuXG4gICAgQGhhbmRsZXJzLmkoKVxuXG4gICAgRGF0YS5jYW52YXMgPSBAc3RhY2soKVxuICAgIFByZXZpZXcuY3JvcCBEYXRhLmNhbnZhcy50b0RhdGFVUkwgJ2ltYWdlL2pwZWcnXG5cbiAgZDogLT5cbiAgICBjb25zb2xlLmxvZyAnUHJldmlldy5kJ1xuICAgIFByZXZpZXcuaGFuZGxlcnMuZCgpXG4gICAgXy5vbiAnLnBhZ2Vfc3RlcHMnXG4gICAgXy5vZmYgJy5wYWdlX3ByZXZpZXcnXG5cbiAgaGFuZGxlcnM6XG5cbiAgICBpOiAtPlxuXG4gICAgICAkKCcucGFnZV9wcmV2aWV3ID4gLmJ1dHRvbnMgPiAuYnV0dG9uLmN0YV9iYWNrJykub24gJ2NsaWNrJywgUHJldmlldy5kXG4gICAgICAkKCcucGFnZV9wcmV2aWV3ID4gLmJ1dHRvbnMgPiAuYnV0dG9uLmN0YV9zaGFyZScpLm9uICdjbGljaycsIFByZXZpZXcuc2hhcmVIYW5kbGVyXG4gICAgICAkKCcucGFnZV9wcmV2aWV3ID4gLmltYWdlJykub24gJ3RvdWNoc3RhcnQnLCBQcmV2aWV3LnRvdWNoSGFuZGxlclxuXG4gICAgZDogLT5cbiAgICAgIF8udCAnYnV0dG9ucycsICdiYWNrJywgJ3ByZXNzZWQnXG5cbiAgICAgICQoJy5wYWdlX3ByZXZpZXcgPiAuYnV0dG9ucyA+IC5idXR0b24uY3RhX2JhY2snKS5vZmYgJ2NsaWNrJywgUHJldmlldy5kXG4gICAgICAkKCcucGFnZV9wcmV2aWV3ID4gLmJ1dHRvbnMgPiAuYnV0dG9uLmN0YV9zaGFyZScpLm9mZiAnY2xpY2snLCBQcmV2aWV3LnNoYXJlSGFuZGxlclxuICAgICAgJCgnLnBhZ2VfcHJldmlldyA+IC5pbWFnZScpLm9mZiAndG91Y2hzdGFydCcsIFByZXZpZXcudG91Y2hIYW5kbGVyXG5cbiAgdG91Y2hIYW5kbGVyOiAtPlxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICBzaGFyZUhhbmRsZXI6IC0+XG4gICAgXy50ICdidXR0b25zJywgJ3NoYXJlJywgJ3ByZXNzZWQnXG5cbiAgICBpZiBTaGFyZS5oYXNoaWQgaXNudCBmYWxzZVxuICAgICAgU2hhcmUuaSgpXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgRGF0YS56aXAgLT5cblxuICAgICAgRGF0YS5qc3ppcC5nZW5lcmF0ZUFzeW5jIHR5cGU6ICdibG9iJywgY29tcHJlc3Npb246ICdERUZMQVRFJywgY29tcHJlc3Npb25PcHRpb25zOiBsZXZlbDogOVxuICAgICAgICAudGhlbiAoYmxvYikgLT5cbiAgICAgICAgICBTaGFyZS5pbWFnZVVwbG9hZCBibG9iLCAtPlxuICAgICAgICAgICAgU2hhcmUuaSgpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyAnU2hhcmUuaSgpJ1xuXG4gICAgIyMjXG4gICAgTm90aWNlLmkgJ1VwbG9hZGluZyBJbWFnZXMnLCBwcm9ncmVzczogMC4yXG5cbiAgICBzZXRUaW1lb3V0IC0+XG4gICAgICBOb3RpY2UuaSAnUHJvY2Vzc2luZyBJbWFnZXMnLCBwcm9ncmVzczogMC43XG4gICAgLCAyMDAwXG5cbiAgICBzZXRUaW1lb3V0IC0+XG4gICAgICBOb3RpY2UuaSAnUmVhZHkgdG8gc2hhcmUnLCBwcm9ncmVzczogMVxuICAgICwgMzAwMFxuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgIFNoYXJlLmkoKVxuICAgICwgMzUwMFxuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgIE5vdGljZS5kKClcbiAgICAsIDM2MDBcbiAgICAjIyNcblxuICBzdGFjazogKHJlc3VsdCkgLT5cblxuICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2NhbnZhcydcbiAgICBjYW52YXMud2lkdGggPSAxMDAwXG4gICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQgJzJkJ1xuICAgIF9VUkwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkxcblxuICAgIGhlaWdodCA9IDBcblxuICAgICMgY2FsY3VsYXRlIG91ciBlc3RpbWF0ZWQgaGVpZ2h0XG4gICAgXG4gICAgaGVpZ2h0ICs9IERhdGEuaGVhZGVyLmhlaWdodFxuICAgIGZvciBzdGVwIGluIERhdGEuc3RlcHNcbiAgICAgIGNoZWlnaHQgPSAxMDAwICogc3RlcC5pbWFnZS5oZWlnaHQgLyBzdGVwLmltYWdlLndpZHRoXG4gICAgICBoZWlnaHQgKz0gKGNoZWlnaHQgKyAgRGF0YS5nYXApXG4gICAgaGVpZ2h0ICs9IERhdGEuZm9vdGVyLmhlaWdodFxuXG4gICAgIyBtZWFzdXJlIG91ciB0aXRsZSBoZWlnaHRcbiAgICB0aXRsZUxpbmVIZWlnaHQgPSA2MFxuICAgIHRpdGxlSGVpZ2h0ID0gdGl0bGVMaW5lSGVpZ2h0XG4gICAgdGl0bGVMZW5ndGhNYXggPSA4MDBcbiAgICB0aXRsZUJvdHRvbUdhcCA9IDQwXG4gICAgdGl0bGVDb3B5ID0gRGF0YS50aXRsZS50b1VwcGVyQ2FzZSgpXG5cbiAgICAjIHRpdGxlIG11bHRpbGluZSBzdXBwb3J0XG4gICAgY3R4LmZvbnQgPSAnNDAwIDQwcHggTW9udHNlcnJhdCdcbiAgICBjdHguZmlsbFN0eWxlID0gY29uZmlnLmNvbG9yLmdvbGQxXG4gICAgdGl0bGVNZWFzdXJlID0gY3R4Lm1lYXN1cmVUZXh0IHRpdGxlQ29weVxuXG4gICAgaWYgdGl0bGVNZWFzdXJlLndpZHRoID49IHRpdGxlTGVuZ3RoTWF4XG4gICAgICB0aXRsZUxpbmVzID0gTWF0aC5mbG9vcih0aXRsZU1lYXN1cmUud2lkdGggLyB0aXRsZUxlbmd0aE1heCkgKyAxXG4gICAgICB0aXRsZUNvcHlzID0gUHJldmlldy50ZXh0U3BsaXQgdGl0bGVDb3B5LCB0aXRsZUxpbmVzXG4gICAgICB0aXRsZUhlaWdodCA9ICh0aXRsZUxpbmVIZWlnaHQgKiB0aXRsZUxpbmVzKVxuXG4gICAgaGVpZ2h0ICs9IHRpdGxlSGVpZ2h0XG5cbiAgICAjIHNldCBvdXIgY2FudmFzIGhlaWdodCwgdGhpcyBoYXMgdG8gYmUgZG9uZSBiZWZvcmUgZHJhd0ltYWdlKCknc1xuICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHRcblxuICAgIGN0eC5kcmF3SW1hZ2UgRGF0YS5oZWFkZXIsIDAsIFByZXZpZXcuZnVsbGhlaWdodFxuXG4gICAgUHJldmlldy5mdWxsaGVpZ2h0ICs9IERhdGEuaGVhZGVyLmhlaWdodFxuXG4gICAgIyBmaXJzdCBsZXRzIGRyYXcgb3VyIHRpdGxlXG4gICAgY3R4LmZpbGxTdHlsZSA9IGNvbmZpZy5jb2xvci5iZWlnZTJcbiAgICBjdHguZmlsbFJlY3QgMCwgUHJldmlldy5mdWxsaGVpZ2h0LCAxMDAwLCB0aXRsZUhlaWdodCArIHRpdGxlQm90dG9tR2FwXG5cbiAgICBQcmV2aWV3LmZ1bGxoZWlnaHQgKz0gdGl0bGVIZWlnaHQgKyB0aXRsZUJvdHRvbUdhcFxuXG4gICAgZm9yIHN0ZXAgaW4gRGF0YS5zdGVwc1xuXG4gICAgICAjIGRyYXcgb3VyIHN0ZXBcbiAgICAgIGNoZWlnaHQgPSAxMDAwICogc3RlcC5pbWFnZS5oZWlnaHQgLyBzdGVwLmltYWdlLndpZHRoXG4gICAgICBjdHguZHJhd0ltYWdlIHN0ZXAuaW1hZ2UsIDAsIFByZXZpZXcuZnVsbGhlaWdodCwgMTAwMCwgY2hlaWdodFxuXG4gICAgICBQcmV2aWV3LmZ1bGxoZWlnaHQgKz0gY2hlaWdodFxuXG4gICAgICAjIGRyYXcgb3VyIGdhcCBiZXR3ZWVuIGVhY2ggc3RlcFxuICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbmZpZy5jb2xvci5iZWlnZTJcbiAgICAgIGN0eC5maWxsUmVjdCAwLCBQcmV2aWV3LmZ1bGxoZWlnaHQtMSwgMTAwMCwgRGF0YS5nYXArMVxuXG4gICAgICBQcmV2aWV3LmZ1bGxoZWlnaHQgKz0gRGF0YS5nYXBcblxuICAgIGN0eC5kcmF3SW1hZ2UgRGF0YS5mb290ZXIsIDAsIFByZXZpZXcuZnVsbGhlaWdodC0xXG4gICAgUHJldmlldy5mdWxsaGVpZ2h0ICs9IERhdGEuZm9vdGVyLmhlaWdodFxuXG4gICAgdGhlaWdodCA9IERhdGEuaGVhZGVyLmhlaWdodFxuICAgICN0aGVpZ2h0ICs9IHRpdGxlQm90dG9tR2FwXG5cbiAgICAjIGNvcHkgcGxhY2VtZW50XG5cbiAgICBjdHguZm9udCA9ICc0MDAgNDBweCBNb250c2VycmF0J1xuICAgIGN0eC5maWxsU3R5bGUgPSBjb25maWcuY29sb3IuZ29sZDFcblxuICAgIGlmIHRpdGxlQ29weXMgaXNudCB1bmRlZmluZWRcbiAgICAgIGZvciBjb3B5IGluIHRpdGxlQ29weXNcbiAgICAgICAgdGl0bGVNZWFzdXJlID0gY3R4Lm1lYXN1cmVUZXh0IGNvcHlcbiAgICAgICAgeCA9ICgxMDAwLzIpIC0gKHRpdGxlTWVhc3VyZS53aWR0aCAvIDIpXG4gICAgICAgIHkgPSB0aGVpZ2h0ICsgdGl0bGVMaW5lSGVpZ2h0XG4gICAgICAgIGN0eC5maWxsVGV4dCBjb3B5LCB4LCB5XG4gICAgICAgIHRoZWlnaHQgKz0gdGl0bGVMaW5lSGVpZ2h0XG4gICAgZWxzZVxuICAgICAgdGl0bGVNZWFzdXJlID0gY3R4Lm1lYXN1cmVUZXh0IHRpdGxlQ29weVxuICAgICAgeCA9ICgxMDAwLzIpIC0gKHRpdGxlTWVhc3VyZS53aWR0aCAvIDIpXG4gICAgICB5ID0gdGhlaWdodCArIHRpdGxlTGluZUhlaWdodFxuICAgICAgY3R4LmZpbGxUZXh0IERhdGEudGl0bGUudG9VcHBlckNhc2UoKSwgeCwgeVxuICAgICAgdGhlaWdodCArPSB0aXRsZUxpbmVIZWlnaHRcblxuICAgIHRoZWlnaHQgKz0gdGl0bGVCb3R0b21HYXBcblxuICAgICMgdGhlbiB3ZSBkcmF3IG91ciBzdGVwc1xuICAgIGZvciBzdGVwLCBpbmRleCBpbiBEYXRhLnN0ZXBzXG4gICAgICB0aGVpZ2h0ICs9IDEwMDAgKiBzdGVwLmltYWdlLmhlaWdodCAvIHN0ZXAuaW1hZ2Uud2lkdGhcbiAgICAgIG1lYXN1cmUgPSBjdHgubWVhc3VyZVRleHQgRGF0YS5sYWJlbHNbaW5kZXhdLnRvVXBwZXJDYXNlKClcblxuICAgICAgeCA9ICgxMDAwLzIpIC0gKG1lYXN1cmUud2lkdGggLyAyKVxuICAgICAgeSA9IHRoZWlnaHQgKyAzMFxuXG4gICAgICBwYWRkaW5nID0gMTIwXG5cbiAgICAgIGN0eC5maWxsU3R5bGUgPSBjb25maWcuY29sb3IucmVkMVxuICAgICAgY3R4LmZpbGxSZWN0IHgtcGFkZGluZywgeS00NSwgbWVhc3VyZS53aWR0aCArIChwYWRkaW5nKjIpLCA2NVxuXG4gICAgICBjdHguZmlsbFN0eWxlID0gY29uZmlnLmNvbG9yLndoaXRlMVxuICAgICAgY3R4LmZpbGxUZXh0IERhdGEubGFiZWxzW2luZGV4XS50b1VwcGVyQ2FzZSgpLCB4LCB5XG5cbiAgICAgIHRoZWlnaHQgKz0gRGF0YS5nYXBcblxuICAgIHJldHVybiBjYW52YXNcblxuICBjcm9wOiAodXJsKSAtPlxuXG4gICAgQGNyb3BwZWQuY3JvcHBpZSgnZGVzdHJveScpIGlmIEBjcm9wcGVkIGlzbnQgZmFsc2VcblxuICAgIHpvb21lciA9IEluZGV4LnJ3aWR0aCA+IDEwMDAgPyB0cnVlIDogZmFsc2VcbiAgICBAY3JvcHBlZCA9ICQoJy5wYWdlX3ByZXZpZXcgPiAuaW1hZ2UnKS5jcm9wcGllXG4gICAgICB1cmw6IHVybFxuICAgICAgZW5mb3JhY2VCb3VuZGFyeTogZmFsc2VcbiAgICAgIHNob3dab29tZXI6IHpvb21lclxuICAgICAgc2V0Wm9vbTogMC4yNVxuXG4gICAgIyB3ZSB3aWxsIGFuaW1hdGUgdGhpcyBsYXRlciBvbiB0byBzY2FsZSBmcm9tIDEgdG8gMC4yMCAsIGlzc3VlICM0XG4gICAgc2V0VGltZW91dCAtPlxuICAgICAgUHJldmlldy56b29tQW5pbWF0ZSgpXG4gICAgLCAxMDBcblxuICB6b29tQW5pbWF0ZTogKGJlZm9yZSwgYWZ0ZXIpIC0+XG5cbiAgICBzcGVlZCA9IDIwXG4gICAgc3RhcnQgPSAwLjI1XG4gICAgZmluaXNoID0gMC4xNVxuICAgIGRpc3RhbmNlID0gc3RhcnQgLSBmaW5pc2hcbiAgICBjcmVtZW50ID0gZGlzdGFuY2UgLyBzcGVlZFxuXG4gICAgQGFpX2lkID0gc2V0SW50ZXJ2YWwgLT5cbiAgICAgIHN0YXJ0IC09IGNyZW1lbnRcbiAgICAgIFByZXZpZXcuY3JvcHBlZC5jcm9wcGllICdzZXRab29tJywgc3RhcnRcbiAgICAgIGlmIHN0YXJ0IDw9IGZpbmlzaFxuICAgICAgICBjbGVhckludGVydmFsIFByZXZpZXcuYWlfaWRcbiAgICAsIHNwZWVkXG5cbiAgY29weVNwbGl0OiAoY29weSwgbGluZXMpIC0+XG4gICAgXG4gICAgbWlkZGxlcyA9IFtdXG4gICAgY29weXMgPSBbXVxuICAgIGdhcCA9IE1hdGguZmxvb3IgY29weS5sZW5ndGggLyBsaW5lc1xuICAgIGZvciBudW0gaW4gWzEuLmxpbmVzXVxuXG4gICAgICBtaWRkbGUgPSBNYXRoLnJvdW5kKGdhcCAqIG51bSlcbiAgICAgIGJlZm9yZSA9IGNvcHkubGFzdEluZGV4T2YgJyAnLCBtaWRkbGVcbiAgICAgIGFmdGVyID0gY29weS5pbmRleE9mICcgJywgbWlkZGxlICsgMVxuXG4gICAgICBpZiBiZWZvcmUgPT0gLTEgfHwgKGFmdGVyICE9IC0xICYmIG1pZGRsZSAtIGJlZm9yZSA+PSBhZnRlciAtIG1pZGRsZSlcbiAgICAgICAgbWlkZGxlID0gYWZ0ZXJcbiAgICAgIGVsc2VcbiAgICAgICAgbWlkZGxlID0gYmVmb3JlXG5cbiAgICAgIG1pZGRsZXMucHVzaCBtaWRkbGVcblxuICAgIGZvciBtaWRkbGUsIGluZGV4IGluIG1pZGRsZXNcbiAgICAgIGlmIGluZGV4IGlzIDBcbiAgICAgICAgY29weXMucHVzaCBjb3B5LnN1YnN0cigwLCBtaWRkbGUpXG4gICAgICBlbHNlXG4gICAgICAgIGNvcHlzLnB1c2ggY29weS5zdWJzdHIobWlkZGxlKzEsIG1pZGRsZXNbaW5kZXgrMV0tMSlcbiAgICAgICAgI2NvcHlzLnB1c2ggY29weS5zdWJzdHIobWlkZGxlLTEpXG4gICAgICBpZiBtaWRkbGVzW2luZGV4KzFdIGlzIHVuZGVmaW5lZFxuICAgICAgICBjb250aW51ZVxuXG4gICAgcmV0dXJuIGNvcHlzXG5cbiAgcGVybXV0ZTogKGNvcHksIGxpbmVzLCBnYXApIC0+XG5cbiAgICB3b3JkcyA9IGNvcHkuc3BsaXQgJyAnXG5cbiAgICBjaHVua3MgPSBbXVxuICAgIGxlbmd0aHMgPSBbXVxuXG4gICAgZm9yIGxpbmUgaW4gWzEuLmxpbmVzXVxuICAgICAgaWYgbGluZSBpc250IGxpbmVzXG4gICAgICAgIHN0cmluZyA9IHdvcmRzLnNsaWNlKCAobGluZS0xKSpnYXAsIGxpbmUqZ2FwKS5qb2luICcgJ1xuICAgICAgZWxzZVxuICAgICAgICBzdHJpbmcgPSB3b3Jkcy5zbGljZSggKGxpbmVzLTEpKmdhcCkuam9pbiAnICdcblxuICAgICAgY2h1bmtzLnB1c2ggc3RyaW5nXG4gICAgICBsZW5ndGhzLnB1c2ggc3RyaW5nLmxlbmd0aFxuXG4gICAgc2NvcmUgPSAwXG4gICAgZm9yIGxlbiwgaSBpbiBsZW5ndGhzXG4gICAgICBpZiBsZW5ndGhzW2krMV0gaXNudCB1bmRlZmluZWRcbiAgICAgICAgc2NvcmUgKz0gTWF0aC5hYnMobGVuLWxlbmd0aHNbaSsxXSlcblxuICAgIHNjb3JlOiBzY29yZSwgY2h1bmtzOiBjaHVua3MsIGdhcDogZ2FwXG5cbiAgdGV4dFNwbGl0OiAoY29weSwgbGluZXMpIC0+XG4gICAgd29yZHMgPSBjb3B5LnNwbGl0ICcgJ1xuICAgIGxpbWl0ID0gTWF0aC5jZWlsIHdvcmRzLmxlbmd0aCAvIGxpbmVzXG4gICAgcGVybXV0ZXMgPSBbXVxuICAgIHNjb3JlcyA9IFtdXG5cbiAgICBmb3IgcCBpbiBbMS4ubGltaXRdXG4gICAgICByZXN1bHQgPSBAcGVybXV0ZSBjb3B5LCBsaW5lcywgcFxuICAgICAgcGVybXV0ZXMucHVzaCByZXN1bHRcbiAgICAgIHNjb3Jlcy5wdXNoIHJlc3VsdC5zY29yZVxuXG4gICAgc2NvcmVzLnNvcnQgKGEsIGIpIC0+XG4gICAgICBhIC0gYlxuXG4gICAgZm9yIHBlcm11dGUgaW4gcGVybXV0ZXNcbiAgICAgIHJldHVybiBwZXJtdXRlLmNodW5rcyBpZiBwZXJtdXRlLnNjb3JlIGlzIHNjb3Jlc1swXVxuXG4iLCJTaGFyZSA9XG5cbiAgZmlsdGVyOiAxXG4gIGJsb2I6IGZhbHNlXG4gIGhhc2hpZDogZmFsc2VcbiAgcGlkOiBmYWxzZVxuXG4gIGk6IC0+XG4gICAgXy5vbiAnLnBhZ2Vfc2hhcmVzLCAuY2xlYXJtb2RhbCdcbiAgICAkKCcucGFnZV9zaGFyZXMgPiAuY2xvc2UnKS5vbiAnY2xpY2snLCBAZFxuICAgICQoJy5jb250YWluZXInKS5vbiAnY2xpY2snLCAnLnBhZ2Vfc2hhcmVzLm9uID4gLmlubmVyID4gLnNoYXJlbGlzdCA+IC5zaGFyZScsIEBzaGFyZVxuXG4gIGQ6IC0+XG4gICAgXy5vZmYgJy5wYWdlX3NoYXJlcywgLmNsZWFybW9kYWwsIC5wYWdlX3RoYW5reW91J1xuICAgICQoJy5wYWdlX3NoYXJlcyA+IC5jbG9zZScpLm9mZiAnY2xpY2snLCBAZFxuICAgICQoJy5jb250YWluZXInKS5vZmYgJ2NsaWNrJywgJy5wYWdlX3NoYXJlcy5vbiA+IC5pbm5lciA+IC5zaGFyZWxpc3QgPiAuc2hhcmUnLCBAc2hhcmVcblxuICBzaGFyZTogLT5cblxuICAgIHR5cGUgPSAkKHRoaXMpLmRhdGEgJ3R5cGUnXG4gICAgY29uc29sZS5sb2cgJ1NoYXJlLnNoYXJlKCkgaGFuZGxlcidcblxuICAgIHN3aXRjaCB0eXBlXG4gICAgICB3aGVuICdmYWNlYm9vaycgdGhlbiBTaGFyZS5mYWNlYm9vaygpXG4gICAgICB3aGVuICd0d2l0dGVyJyB0aGVuIFNoYXJlLnR3aXR0ZXIoKVxuICAgICAgd2hlbiAncGludGVyZXN0JyB0aGVuIFNoYXJlLnBpbnRlcmVzdCgpXG4gICAgICB3aGVuICdkbCcsICdpZycgdGhlbiBTaGFyZS5kb3dubG9hZCh0eXBlKVxuXG4gICAgXy5vbiAnLnBhZ2VfdGhhbmt5b3UnXG5cbiAgaW1hZ2VVcGxvYWQ6IChibG9iLCBjYWxsYmFjaykgLT5cblxuICAgIGZkID0gbmV3IEZvcm1EYXRhKClcbiAgICBmZC5hcHBlbmQgJ2ZpbGUnLCBibG9iXG4gICAgZmQuYXBwZW5kICd0aXRsZScsIERhdGEudGl0bGVcblxuICAgIFNoYXJlLnBpZCA9IF8ucmFuZCgwLDIpXG5cbiAgICBfLnBvc3RcbiAgICAgIHhocjogLT5cbiAgICAgICAgeGhyID0gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgIHhoci51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lciAncHJvZ3Jlc3MnLCAoZSkgLT5cbiAgICAgICAgICBjb21wbGV0ZSA9IGUubG9hZGVkIC8gZS50b3RhbFxuICAgICAgICAgIGlmIGNvbXBsZXRlIDwgMSB0aGVuIE5vdGljZS5pIGNvbmZpZy5jb3B5LnByb2dyZXNzLnVwbG9hZGluZ1tTaGFyZS5waWRdLCBwcm9ncmVzczogY29tcGxldGVcbiAgICAgICAgICBpZiBjb21wbGV0ZSBpcyAxIHRoZW4gTm90aWNlLmkgY29uZmlnLmNvcHkucHJvZ3Jlc3MucHJvY2Vzc2luZ1tTaGFyZS5waWRdLCBwcm9ncmVzczogY29tcGxldGVcbiAgICAgICAgLCBmYWxzZVxuICAgICAgICByZXR1cm4geGhyXG5cbiAgICAgIHVybDogJy9hcGkvdXBsb2FkJ1xuICAgICAgZGF0YTogZmRcbiAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgY29udGVudFR5cGU6IGZhbHNlXG4gICAgICBwcm9jZXNzRGF0YTogZmFsc2VcbiAgICAgIGVycm9yOiAtPlxuICAgICAgICBOb3RpY2UuZCgpXG4gICAgICBzdWNjZXNzOiAocmVzdWx0KSAtPlxuICAgICAgICBOb3RpY2UuaSBjb25maWcuY29weS5wcm9ncmVzcy5jb21wbGV0ZSwgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICAgIFNoYXJlLmhhc2hpZCA9IHJlc3VsdC5kYXRhLmhhc2hpZFxuICAgICAgICBjYWxsYmFjayhyZXN1bHQpXG5cbiAgZmFjZWJvb2s6IC0+XG4gICAgXy50ICdidXR0b25zJywgJ3NoYXJlIGZhY2Vib29rJywgJ3ByZXNzZWQnXG5cbiAgICBGQi51aVxuICAgICAgbWV0aG9kOiAnc2hhcmUnXG4gICAgICBtb2JpbGVfaWZyYW1lOiB0cnVlXG4gICAgICBocmVmOiBkb2N1bWVudC5sb2NhdGlvbi5vcmlnaW4gKyAnLycgKyBTaGFyZS5oYXNoaWQsXG4gICAgICByZWRpcmVjdF91cmk6IGRvY3VtZW50LmxvY2F0aW9uLmhyZWZcbiAgICAgIGRpc3BsYXk6ICd0b3VjaCdcbiAgICAsIChyZXNwb25zZSkgLT5cbiAgICAgIGNvbnNvbGUubG9nIHJlc3BvbnNlXG5cbiAgICAjc2hhcmUgPSBcImh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9kaWFsb2cvc2hhcmU/YXBwX2lkPSN7Y29uZmlnLm1ldGEuZmFjZWJvb2tfYXBwX2lkfSZkaXNwbGF5PXBvcHVwJmhyZWY9I3tfLmVuY29kZShkb2N1bWVudC5sb2NhdGlvbi5vcmlnaW4gKyBcIi9cIiArIFNoYXJlLmhhc2hpZCl9XCJcbiAgICAjd2luZG93Lm9wZW4gc2hhcmVcblxuICB0d2l0dGVyOiAtPlxuICAgIF8udCAnYnV0dG9ucycsICdzaGFyZSB0d2l0dGVyJywgJ3ByZXNzZWQnXG4gICAgc2hhcmUgPSBcImh0dHA6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQvP3VybD1cIiArIF8uZW5jb2RlKGRvY3VtZW50LmxvY2F0aW9uLm9yaWdpbiArIFwiL1wiICsgU2hhcmUuaGFzaGlkKSArIFwiJnRleHQ9I3tjb25maWcuc2hhcmUudHdpdHRlcl9kZ2VuZXJhdGVkfSZoYXNodGFncz0je2NvbmZpZy5zaGFyZS5oYXNodGFnfVwiXG4gICAgd2luZG93Lm9wZW4gc2hhcmVcblxuICBwaW50ZXJlc3Q6IC0+XG4gICAgXy50ICdidXR0b25zJywgJ3NoYXJlIHBpbnRlcmVzdCcsICdwcmVzc2VkJ1xuICAgIHNoYXJlID0gXCJodHRwOi8vcGludGVyZXN0LmNvbS9waW4vY3JlYXRlL2J1dHRvbi8/dXJsPVwiICsgXy5lbmNvZGUoZG9jdW1lbnQubG9jYXRpb24ub3JpZ2luICsgXCIvXCIgKyBTaGFyZS5oYXNoaWQpICsgXCImZGVzY3JpcHRpb249I3tjb25maWcuc2hhcmUucGludGVyZXN0X2RnZW5lcmF0ZWR9Jm1lZGlhPVwiICsgXy5lbmNvZGUoZG9jdW1lbnQubG9jYXRpb24ub3JpZ2luICsgXCIvaW1hZ2UvXCIgKyBTaGFyZS5oYXNoaWQgKyBcIi5qcGdcIilcbiAgICB3aW5kb3cub3BlbiBzaGFyZVxuXG4gIGRvd25sb2FkOiAodHlwZSkgLT5cbiAgICBfLnQgJ2J1dHRvbnMnLCAnc2hhcmUgZG93bmxvYWQnLCAncHJlc3NlZCdcblxuICAgIGlmIC9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpIG9yIHR5cGUgaXMgJ2lnJ1xuICAgICAgd2luZG93Lm9wZW4gZG9jdW1lbnQubG9jYXRpb24ub3JpZ2luICsgXCIvI3t0eXBlfS8je1NoYXJlLmhhc2hpZH1cIlxuICAgIGVsc2VcbiAgICAgIGxvY2F0aW9uLmhyZWYgPSBkb2N1bWVudC5sb2NhdGlvbi5vcmlnaW4gKyBcIi9kb3dubG9hZC8je1NoYXJlLmhhc2hpZH0uanBnXCJcblxuIiwiXG5TcGlubmVyID1cblxuICBzdGF0ZTogZmFsc2VcblxuICBlbDoge31cblxuICBpOiAoZWwsIG92ZXJyaWRlKSAtPlxuXG4gICAgQGVsID0gJCgnLnNwaW5uZXInKVxuXG4gICAgcmVjdCA9IGVsWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICBjb29yZHMgPVxuICAgICAgdG9wOiBcIiN7cmVjdC50b3AgKyAkKHdpbmRvdykuc2Nyb2xsVG9wKCl9cHhcIlxuICAgICAgbGVmdDogXCIje3JlY3QubGVmdH1weFwiXG4gICAgICB3aWR0aDogXCIje3JlY3Qud2lkdGh9cHhcIlxuICAgICAgaGVpZ2h0OiBcIiN7cmVjdC5oZWlnaHR9cHhcIlxuXG4gICAgaWYgb3ZlcnJpZGUgaXNudCB1bmRlZmluZWRcbiAgICAgIGZvciBrZXksIGNvb3JkIG9mIG92ZXJyaWRlXG4gICAgICAgIGNvb3Jkc1trZXldID0gY29vcmRcblxuICAgIEBlbC5jc3MgY29vcmRzXG5cbiAgICBfLm9uIEBlbFxuICAgIEBzdGF0ZSA9IHRydWVcblxuICBkOiAtPlxuICAgIF8ub2ZmIEBlbFxuICAgIEBzdGF0ZSA9IGZhbHNlXG4iLCJTdGVwID1cbiAgc3RlcDogZmFsc2VcblxuICByYXRpbzogWzEuNSwxXVxuXG4gIGk6IChzdGVwKSAtPlxuXG4gICAgQHN0ZXAgPSBzdGVwXG5cbiAgICAjIHRha2UgY2FyZSBvZiBvdXIgc3RlcCB0aXRsZSBhbmQgYmFja2dyb3VuZCBpbWFnZVxuICAgIF8ub2ZmICcucGFnZV9zdGVwID4gLnN1YnRpdGxlID4gLmNvcHknXG4gICAgXy5vbiBcIi5wYWdlX3N0ZXAgPiAuc3VidGl0bGUgPiAuY29weV8je3N0ZXB9XCJcbiAgICBfLm9uICcucGFnZV9zdGVwID4gLmltYWdlJ1xuXG4gICAgXy5vZmYgJy5wYWdlX3N0ZXAgPiAuaW5zdHJ1Y3Rpb25zID4gLmluc3RydWN0J1xuICAgIF8ub24gXCIucGFnZV9zdGVwID4gLmluc3RydWN0aW9ucyA+IC5pbnN0cnVjdC5pbnN0cnVjdF8je3N0ZXB9XCJcblxuICAgICQoJy5wYWdlX3N0ZXAgPiAuaW1hZ2UnKS5yZW1vdmVDbGFzcyAnc3RlcF8xIHN0ZXBfMiBzdGVwXzMnXG4gICAgJCgnLnBhZ2Vfc3RlcCA+IC5pbWFnZScpLmFkZENsYXNzIFwic3RlcF8je3N0ZXB9XCJcblxuICAgIEltZy5jcm9wcGVkLmNyb3BwaWUoJ2Rlc3Ryb3knKSBpZiBJbWcuY3JvcHBlZCBpc250IGZhbHNlXG5cbiAgICBpZiBEYXRhLnN0ZXBzW0BzdGVwLTFdIGlzbnQgdW5kZWZpbmVkXG4gICAgICBfLm9mZiAnLnBhZ2Vfc3RlcCA+IC5pbWFnZSdcbiAgICAgIEltZy5jcm9wIERhdGEuc3RlcHNbQHN0ZXAtMV0uaW1hZ2Uuc3JjXG5cbiAgICBfLm9mZiAnLnBhZ2Vfc3RlcHMnXG4gICAgXy5vbiAnLnBhZ2Vfc3RlcCdcblxuICAgICQoJy5wYWdlX3N0ZXAgPiAuaW1hZ2UnKS5jc3MgJ2hlaWdodCcsIFwiI3tJbmRleC53aWR0aC9TdGVwLnJhdGlvWzBdfXB4XCJcblxuICAgIEBoYW5kbGVycy5pKClcblxuICBoYW5kbGVyczpcblxuICAgIGk6IC0+XG4gICAgICAkKCcucGFnZV9zdGVwID4gLmJ1dHRvbnMgPiAuYnV0dG9uLmN0YV9uZXdpbWFnZScpLm9uICdjbGljaycsIFN0ZXAuY2hvb3NlRmlsZVxuICAgICAgJCgnLnBhZ2Vfc3RlcCA+IC5idXR0b25zID4gLmJ1dHRvbi5jdGFfY29uZmlybScpLm9uICdjbGljaycsIFN0ZXAuY29uZmlybVxuICAgICAgJCgnLnBhZ2Vfc3RlcCA+IC5jYW5jZWwnKS5vbiAnY2xpY2snLCBTdGVwLmNhbmNlbFxuICAgICAgJCgnLmZpbGVfaW5wdXQnKS5vbiAnY2hhbmdlJywgSW1nLmNoYW5nZVxuXG4gICAgZDogLT5cbiAgICAgICQoJy5wYWdlX3N0ZXAgPiAuYnV0dG9ucyA+IC5idXR0b24uY3RhX25ld2ltYWdlJykub2ZmICdjbGljaycsIFN0ZXAuY2hvb3NlRmlsZVxuICAgICAgJCgnLnBhZ2Vfc3RlcCA+IC5idXR0b25zID4gLmJ1dHRvbi5jdGFfY29uZmlybScpLm9mZiAnY2xpY2snLCBTdGVwLmNvbmZpcm1cbiAgICAgICQoJy5wYWdlX3N0ZXAgPiAuY2FuY2VsJykub2ZmICdjbGljaycsIFN0ZXAuY2FuY2VsXG4gICAgICAkKCcuZmlsZV9pbnB1dCcpLm9mZiAnY2hhbmdlJywgSW1nLmNoYW5nZVxuICAgICAgJCgnLmZpbGVfaW5wdXQnKS52YWwgJydcblxuICBjaG9vc2VGaWxlOiAtPlxuICAgIF8udCAnYnV0dG9ucycsICdjaG9vc2UgbmV3IGltYWdlICcsICdwcmVzc2VkJ1xuICAgICQoJy5wYWdlX3N0ZXAgPiBmb3JtID4gaW5wdXQuZmlsZV9pbnB1dCcpLnRyaWdnZXIgJ2NsaWNrJ1xuXG4gIGNhbmNlbDogLT5cbiAgICBfLnQgJ2J1dHRvbnMnLCAnY2FuY2VsIGltYWdlICcsICdwcmVzc2VkJ1xuICAgIFN0ZXAuaGFuZGxlcnMuZCgpXG4gICAgXy5vZmYgJy5wYWdlX3N0ZXAnXG4gICAgXy5vbiAnLnBhZ2Vfc3RlcHMnXG5cbiAgY29uZmlybTogLT5cblxuICAgIF8udCAnYnV0dG9ucycsICdjb25maXJtIGltYWdlJywgJ3ByZXNzZWQnXG4gICAgRGF0YS5zYXZlIFN0ZXAuc3RlcCwgKHJlc3VsdCkgLT5cbiAgICAgIFNoYXJlLmhhc2hpZCA9IGZhbHNlIGlmIFNoYXJlLmhhc2hpZCBpc250IGZhbHNlXG4gICAgICBTdGVwLmNhbmNlbCgpXG5cbiJdfQ==
