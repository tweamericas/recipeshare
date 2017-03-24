Step =
  step: false

  ratio: [1.5,1]

  i: (step) ->

    @step = step

    # take care of our step title and background image
    _.off '.page_step > .subtitle > .copy'
    _.on ".page_step > .subtitle > .copy_#{step}"
    _.on '.page_step > .image'

    _.off '.page_step > .instructions > .instruct'
    _.on ".page_step > .instructions > .instruct.instruct_#{step}"

    $('.page_step > .image').removeClass 'step_1 step_2 step_3'
    $('.page_step > .image').addClass "step_#{step}"

    Img.cropped.croppie('destroy') if Img.cropped isnt false

    if Data.steps[@step-1] isnt undefined
      _.off '.page_step > .image'
      Img.crop Data.steps[@step-1].image.src

    _.off '.page_steps'
    _.on '.page_step'

    $('.page_step > .image').css 'height', "#{Index.width/Step.ratio[0]}px"

    @handlers.i()

  handlers:

    i: ->
      $('.page_step > .buttons > .button.cta_newimage').on 'click', Step.chooseFile
      $('.page_step > .buttons > .button.cta_confirm').on 'click', Step.confirm
      $('.page_step > .cancel').on 'click', Step.cancel
      $('.file_input').on 'change', Img.change

    d: ->
      $('.page_step > .buttons > .button.cta_newimage').off 'click', Step.chooseFile
      $('.page_step > .buttons > .button.cta_confirm').off 'click', Step.confirm
      $('.page_step > .cancel').off 'click', Step.cancel
      $('.file_input').off 'change', Img.change
      $('.file_input').val ''

  chooseFile: ->
    _.t 'buttons', 'choose new image ', 'pressed'
    $('.page_step > form > input.file_input').trigger 'click'

  cancel: ->
    _.t 'buttons', 'cancel image ', 'pressed'
    Step.handlers.d()
    _.off '.page_step'
    _.on '.page_steps'

  confirm: ->

    _.t 'buttons', 'confirm image', 'pressed'
    Data.save Step.step, (result) ->
      Share.hashid = false if Share.hashid isnt false
      Step.cancel()

