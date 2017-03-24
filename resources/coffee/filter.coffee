Filter = ->

  return false if Img.cropped is false

  Img.cropped.croppie('result', 'blob').then (blob) ->

    Share.blob = blob

    _URL = window.URL || window.webkitURL

    img = new Image()
    img.onload = ->
      
      canvas = $('.page_filter > .canvas > canvas')[0]
      canvas.width = Index.width
      canvas.height = Index.width
      ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, Index.width, Index.width)
      Page 'filter'
      _.off '.page_welcome'
      Spinner.d()
      Index.mode = 'filter'

      _.on '.page_filter > .filters'

      if Index.slicked is false
        Index.slicked = $('.page_filter > .filters > .inner').slick
          initialSlide: 0
          mobileFirst: true
          swipe: true
          swipeToSlide: true
          arrows: false
          draggable: true
          infinite: true
          slidesToShow: 1
          slidesToScroll: 1
        Index.slicked.on 'afterChange', Share.filterHandler
        $('.filters > .index').html "1 / #{config.filters.length}"

    img.src = _URL.createObjectURL(blob)
  
