Preview =
  cropped: false
  fullheight: 0
  gap: 40

  i: ->

    _.off '.page_steps'
    _.on '.page_preview'

    @fullheight = 0

    @handlers.i()

    Data.canvas = @stack()
    Preview.crop Data.canvas.toDataURL 'image/jpeg'

  d: ->
    console.log 'Preview.d'
    Preview.handlers.d()
    _.on '.page_steps'
    _.off '.page_preview'

  handlers:

    i: ->

      $('.page_preview > .buttons > .button.cta_back').on 'click', Preview.d
      $('.page_preview > .buttons > .button.cta_share').on 'click', Preview.shareHandler
      $('.page_preview > .image').on 'touchstart', Preview.touchHandler

    d: ->
      _.t 'buttons', 'back', 'pressed'

      $('.page_preview > .buttons > .button.cta_back').off 'click', Preview.d
      $('.page_preview > .buttons > .button.cta_share').off 'click', Preview.shareHandler
      $('.page_preview > .image').off 'touchstart', Preview.touchHandler

  touchHandler: ->
    event.preventDefault()

  shareHandler: ->
    _.t 'buttons', 'share', 'pressed'

    if Share.hashid isnt false
      Share.i()
      return true

    Data.zip ->

      Data.jszip.generateAsync type: 'blob', compression: 'DEFLATE', compressionOptions: level: 9
        .then (blob) ->
          Share.imageUpload blob, ->
            Share.i()
            console.log 'Share.i()'

    ###
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
    ###

  stack: (result) ->

    canvas = document.createElement 'canvas'
    canvas.width = 1000
    ctx = canvas.getContext '2d'
    _URL = window.URL || window.webkitURL

    height = 0

    # calculate our estimated height
    
    height += Data.header.height
    for step in Data.steps
      cheight = 1000 * step.image.height / step.image.width
      height += (cheight +  Data.gap)
    height += Data.footer.height

    # measure our title height
    titleLineHeight = 60
    titleHeight = titleLineHeight
    titleLengthMax = 800
    titleBottomGap = 40
    titleCopy = Data.title.toUpperCase()

    # title multiline support
    ctx.font = '400 40px Montserrat'
    ctx.fillStyle = config.color.gold1
    titleMeasure = ctx.measureText titleCopy

    if titleMeasure.width >= titleLengthMax
      titleLines = Math.floor(titleMeasure.width / titleLengthMax) + 1
      titleCopys = Preview.textSplit titleCopy, titleLines
      titleHeight = (titleLineHeight * titleLines)

    height += titleHeight

    # set our canvas height, this has to be done before drawImage()'s
    canvas.height = height

    ctx.drawImage Data.header, 0, Preview.fullheight

    Preview.fullheight += Data.header.height

    # first lets draw our title
    ctx.fillStyle = config.color.beige2
    ctx.fillRect 0, Preview.fullheight, 1000, titleHeight + titleBottomGap

    Preview.fullheight += titleHeight + titleBottomGap

    for step in Data.steps

      # draw our step
      cheight = 1000 * step.image.height / step.image.width
      ctx.drawImage step.image, 0, Preview.fullheight, 1000, cheight

      Preview.fullheight += cheight

      # draw our gap between each step
      ctx.fillStyle = config.color.beige2
      ctx.fillRect 0, Preview.fullheight-1, 1000, Data.gap+1

      Preview.fullheight += Data.gap

    ctx.drawImage Data.footer, 0, Preview.fullheight-1
    Preview.fullheight += Data.footer.height

    theight = Data.header.height
    #theight += titleBottomGap

    # copy placement

    ctx.font = '400 40px Montserrat'
    ctx.fillStyle = config.color.gold1

    if titleCopys isnt undefined
      for copy in titleCopys
        titleMeasure = ctx.measureText copy
        x = (1000/2) - (titleMeasure.width / 2)
        y = theight + titleLineHeight
        ctx.fillText copy, x, y
        theight += titleLineHeight
    else
      titleMeasure = ctx.measureText titleCopy
      x = (1000/2) - (titleMeasure.width / 2)
      y = theight + titleLineHeight
      ctx.fillText Data.title.toUpperCase(), x, y
      theight += titleLineHeight

    theight += titleBottomGap

    # then we draw our steps
    for step, index in Data.steps
      theight += 1000 * step.image.height / step.image.width
      measure = ctx.measureText Data.labels[index].toUpperCase()

      x = (1000/2) - (measure.width / 2)
      y = theight + 30

      padding = 120

      ctx.fillStyle = config.color.red1
      ctx.fillRect x-padding, y-45, measure.width + (padding*2), 65

      ctx.fillStyle = config.color.white1
      ctx.fillText Data.labels[index].toUpperCase(), x, y

      theight += Data.gap

    return canvas

  crop: (url) ->

    @cropped.croppie('destroy') if @cropped isnt false

    zoomer = Index.rwidth > 1000 ? true : false
    @cropped = $('.page_preview > .image').croppie
      url: url
      enforaceBoundary: false
      showZoomer: zoomer
      setZoom: 0.25

    # we will animate this later on to scale from 1 to 0.20 , issue #4
    setTimeout ->
      Preview.zoomAnimate()
    , 100

  zoomAnimate: (before, after) ->

    speed = 20
    start = 0.25
    finish = 0.15
    distance = start - finish
    crement = distance / speed

    @ai_id = setInterval ->
      start -= crement
      Preview.cropped.croppie 'setZoom', start
      if start <= finish
        clearInterval Preview.ai_id
    , speed

  copySplit: (copy, lines) ->
    
    middles = []
    copys = []
    gap = Math.floor copy.length / lines
    for num in [1..lines]

      middle = Math.round(gap * num)
      before = copy.lastIndexOf ' ', middle
      after = copy.indexOf ' ', middle + 1

      if before == -1 || (after != -1 && middle - before >= after - middle)
        middle = after
      else
        middle = before

      middles.push middle

    for middle, index in middles
      if index is 0
        copys.push copy.substr(0, middle)
      else
        copys.push copy.substr(middle+1, middles[index+1]-1)
        #copys.push copy.substr(middle-1)
      if middles[index+1] is undefined
        continue

    return copys

  permute: (copy, lines, gap) ->

    words = copy.split ' '

    chunks = []
    lengths = []

    for line in [1..lines]
      if line isnt lines
        string = words.slice( (line-1)*gap, line*gap).join ' '
      else
        string = words.slice( (lines-1)*gap).join ' '

      chunks.push string
      lengths.push string.length

    score = 0
    for len, i in lengths
      if lengths[i+1] isnt undefined
        score += Math.abs(len-lengths[i+1])

    score: score, chunks: chunks, gap: gap

  textSplit: (copy, lines) ->
    words = copy.split ' '
    limit = Math.ceil words.length / lines
    permutes = []
    scores = []

    for p in [1..limit]
      result = @permute copy, lines, p
      permutes.push result
      scores.push result.score

    scores.sort (a, b) ->
      a - b

    for permute in permutes
      return permute.chunks if permute.score is scores[0]

