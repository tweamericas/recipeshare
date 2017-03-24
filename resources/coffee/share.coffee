Share =

  filter: 1
  blob: false
  hashid: false
  pid: false

  i: ->
    _.on '.page_shares, .clearmodal'
    $('.page_shares > .close').on 'click', @d
    $('.container').on 'click', '.page_shares.on > .inner > .sharelist > .share', @share

  d: ->
    _.off '.page_shares, .clearmodal, .page_thankyou'
    $('.page_shares > .close').off 'click', @d
    $('.container').off 'click', '.page_shares.on > .inner > .sharelist > .share', @share

  share: ->

    type = $(this).data 'type'
    console.log 'Share.share() handler'

    switch type
      when 'facebook' then Share.facebook()
      when 'twitter' then Share.twitter()
      when 'pinterest' then Share.pinterest()
      when 'dl', 'ig' then Share.download(type)

    _.on '.page_thankyou'

  imageUpload: (blob, callback) ->

    fd = new FormData()
    fd.append 'file', blob
    fd.append 'title', Data.title

    Share.pid = _.rand(0,2)

    _.post
      xhr: ->
        xhr = new window.XMLHttpRequest()
        xhr.upload.addEventListener 'progress', (e) ->
          complete = e.loaded / e.total
          if complete < 1 then Notice.i config.copy.progress.uploading[Share.pid], progress: complete
          if complete is 1 then Notice.i config.copy.progress.processing[Share.pid], progress: complete
        , false
        return xhr

      url: '/api/upload'
      data: fd
      cache: false
      contentType: false
      processData: false
      error: ->
        Notice.d()
      success: (result) ->
        Notice.i config.copy.progress.complete, type: 'success'
        Share.hashid = result.data.hashid
        callback(result)

  facebook: ->
    _.t 'buttons', 'share facebook', 'pressed'

    FB.ui
      method: 'share'
      mobile_iframe: true
      href: document.location.origin + '/' + Share.hashid,
      redirect_uri: document.location.href
      display: 'touch'
    , (response) ->
      console.log response

    #share = "https://www.facebook.com/dialog/share?app_id=#{config.meta.facebook_app_id}&display=popup&href=#{_.encode(document.location.origin + "/" + Share.hashid)}"
    #window.open share

  twitter: ->
    _.t 'buttons', 'share twitter', 'pressed'
    share = "http://twitter.com/intent/tweet/?url=" + _.encode(document.location.origin + "/" + Share.hashid) + "&text=#{config.share.twitter_dgenerated}&hashtags=#{config.share.hashtag}"
    window.open share

  pinterest: ->
    _.t 'buttons', 'share pinterest', 'pressed'
    share = "http://pinterest.com/pin/create/button/?url=" + _.encode(document.location.origin + "/" + Share.hashid) + "&description=#{config.share.pinterest_dgenerated}&media=" + _.encode(document.location.origin + "/image/" + Share.hashid + ".jpg")
    window.open share

  download: (type) ->
    _.t 'buttons', 'share download', 'pressed'

    if /iPad|iPhone|iPod/.test(navigator.userAgent) or type is 'ig'
      window.open document.location.origin + "/#{type}/#{Share.hashid}"
    else
      location.href = document.location.origin + "/download/#{Share.hashid}.jpg"

