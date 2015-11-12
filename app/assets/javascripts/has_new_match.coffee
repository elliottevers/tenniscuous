window.client = new Faye.Client('/faye')

jQuery ->
  client.subscribe '/hasNewMatch', (payload) ->
    console.log("coffeescript works")
    window.hasNewMatch = payload.has_new_match
    window.notifyNewMatch()
