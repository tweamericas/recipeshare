Data =
  steps: []
  labels: [ 'ingredients', 'prepared', 'enjoyed' ]
  title: false
  header: false
  footer: false
  gap: 40

  canvas: false
  jszip: false

  loadHF: ->
    @loadPreset 'header'
    @loadPreset 'footer'

  loadPreset: (name) ->
    img = new Image()
    img.onload = ->
      Data[name] = img
    img.src = "/image/#{name}.png"

  save: (step, callback) ->

    if Img.cropped is false
      return callback false

    _URL = window.URL || window.webkitURL

    Img.cropped.croppie('result', 'blob').then (blob) ->

      img = new Image()

      img.onload = ->

        Data.steps[step-1] =
          image: img
          blob: blob

        Data.populate step

      img.src = _URL.createObjectURL blob

      callback true

  populate: (step) ->

    _.off ".step.step_#{step} > .inner > .status > .pending"
    _.on ".step.step_#{step} > .inner > .status > .complete"

    _.off ".step.step_#{step} > .inner > .image > .svg"
    _.off ".step.step_#{step} > .inner > .image > .copy"

    $(".step.step_#{step} > .inner > .image").css 'background-image', "url(#{Data.steps[step-1].image.src})"

    if Data.steps.length >= 3
      setTimeout ->
        _.on '.page_steps > .cta_preview'
      , 200

  zip: (complete) ->

    @jszip = new JSZip()

    for step in [0..2]
      if @steps[step] isnt undefined
        @jszip.file "step#{step+1}.jpg", Data.steps[step].blob

    Data.canvas.toBlob (blob) ->
      newImg = document.createElement 'img'
      _URL = window.URL || window.webkitURL
      url = _URL.createObjectURL blob

      newImg.onload = ->
        _URL.revokeObjectURL url

      newImg.src = url
      document.body.appendChild newImg

      Data.jszip.file 'complete.jpg', blob
      complete()

    , "image/jpeg"


