Img =

  cropped: false

  change: ->
    Spinner.i($('html'))

    console.log this.files

    if this.files is undefined
      Spinner.d()
      return false

    if typeof this.files isnt 'object'
      return Spinner.d()
      return false

    if this.files.length < 1
      Notice.i 'Please specify a File'
      return Spinner.d()

    if this.files[0].size > 8000000
      alert 'File size must not exceed 8MB'
      return Spinner.d()

    #EXIF.getData this.files[0], ->
    #  console.log EXIF.getAllTags(this)
    loadImage this.files[0],

      (canvas, metadata) ->

        #exif = metadata.exif.getAll()

        _URL = window.URL || window.webkitURL
        img = new Image()
        img.src = canvas.toDataURL('image/jpeg')
        img.onload = ->

          MAX_WIDTH = 1000
          MAX_HEIGHT = 1000

          canvas2 = document.createElement 'canvas'
          ctx = canvas2.getContext '2d'

          width = img.width
          height = img.height

          if width > height
            if width > MAX_WIDTH
              height *= MAX_WIDTH / width
              width = MAX_WIDTH

          else
            if height > MAX_HEIGHT
              width *= MAX_HEIGHT / height
              height = MAX_HEIGHT

          canvas2.width = width
          canvas2.height = height

          ctx.drawImage img, 0, 0, width, height
          Img.crop canvas2.toDataURL('image/jpeg')

      canvas: true
      orientation: true

  crop: (url) ->

    @cropped.croppie('destroy') if @cropped isnt false

    _.off '.page_step > .image'
    zoomer = Index.rwidth > 1000 ? true : false
    @cropped = $('.page_step > .image').croppie
      url: url
      enforaceBoundary: false
      showZoomer: zoomer
      viewport:
        width: Index.width-50
        height: (Index.width/Step.ratio[0])-50
      boundary:
        width: Index.width
        height: Index.width/Step.ratio[0]

    Spinner.d()
