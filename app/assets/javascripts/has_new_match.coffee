window.client = new Faye.Client('/faye')

jQuery ->
  client.subscribe '/hasNewMatch', (payload) ->
    sessionStorage.setItem('hasNewMatch', payload.has_new_match)
    window.notifyNewMatch()
