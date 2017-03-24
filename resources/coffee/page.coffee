Page = (page) ->

  _.off '.page, .modes > .outer > .inner .mode'
  _.on ".page.page_#{page}, .modes > .outer > .inner > .mode.mode_#{page}"


