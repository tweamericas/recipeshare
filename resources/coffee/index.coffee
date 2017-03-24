Index =
  height: false
  width: false
  rwidth: false
  header:
    height: false
  hash: false

  i: ->

    # cache our window
    @width = @rwidth = $(window).width()
    @width = 600 if @width > 600
    @height = $(window).height()
    @header.height = $('header').height()

    # set our .page and .page.full heights to accomodate ios bottom bars
    # why we cant do this in css is the big mystery
    $('.page.full').css 'height', "#{@height}px"
    $('.page').not('.full').not('.custom').css 'height', "#{@height-@header.height}px"

    @handlers()

    # cache our preset images for our preview
    Data.loadHF()

    # detect if we are coming from an existing share
    if document.location.pathname isnt "/"
      hash = document.location.pathname.replace('/', '')
      Index.hash = hash
      _.on '.page_submit'
      _.off '.page_welcome, .page_steps'
      $('.page_submit > .inner > .image > .inner').attr 'src', "/image/#{hash}.jpg"
      $('.page_submit > .inner > .cta').on 'click', ->
        location.href = '/'

  handlers: ->

    $('.page_welcome > .inner > .cta').on 'click', @welcomeHandler
    $('.page_title > .inner > .middle').on 'click', '.cta.on', @titleHandler
    $('.page_title > .inner > .middle > .textarea > textarea').on 'keyup input propertychange', @charHandler

    $('.page_steps > .title > .edit').click @welcomeHandler
    $('.page_steps > .step').click @stepHandler
    $('.page_steps > .cta_preview').click @previewHandler

  previewHandler: ->
    _.t 'buttons', 'preview', 'pressed'
    ###
    if Data.steps.length < 1
      Notice.i 'Please fill out at least 1 step to continue'
      return true
    ###
    if Data.title is false or Data.title is ''
      Notice.i 'Please specify a title'
      return true

    Preview.i()

  welcomeHandler: ->
    _.t 'buttons', 'get started', 'pressed'
    _.off '.page_steps'
    _.off '.page_welcome'
    _.on '.page_title'
    if Data.title isnt '' and Data.title isnt false
      $('.page_title > .inner > .middle > .textarea > textarea').val Data.title

  charHandler: ->

    val = $(this).val()
    if val.length > 0 and val.length <= 60
      _.on '.page_title > .inner > .middle > .cta'
    else
      _.off '.page_title > .inner > .middle > .cta'

    if val.length > 60
      _.on '.chars'
    else
      _.off '.chars'


    $('.chars > .count').text "#{val.length} of 60"

  titleHandler: ->

    _.t 'buttons', 'add images', 'pressed'

    title = $('.page_title > .inner > .middle > .textarea > textarea').val()

    if title.length > 60
      Notice.i 'Please limit your title to under 60 characters'
      return false

    _.off '.page_title > .inner > .middle > .cta > .copy'
    _.on '.page_title > .inner > .middle > .cta > .copyb'

    Data.title = title
    if Data.title isnt '' and Data.title isnt false
      $('.page_steps > .title > .copy').html Data.title
      config.share.dgenerated = config.share.description.replace '{{title}}', Data.title
      config.share.twitter_dgenerated = config.share.twitter_description.replace '{{title}}', Data.title
      config.share.pinterest_dgenerated = config.share.pinterest_description.replace '{{title}}', Data.title
      Share.hashid = false if Share.hashid isnt false

    _.off '.page_title'
    _.on '.page_steps'

  stepHandler: ->
    step = $(this).data 'step'
    _.t 'buttons', "step # #{step}", 'pressed'
    Step.i step

