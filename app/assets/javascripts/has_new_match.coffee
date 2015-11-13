window.client = new Faye.Client('/faye')

jQuery ->
  client.subscribe '/hasNewMatch', (payload) ->
    sessionStorage.setItem('hasNewMatch', payload.has_new_match) if ((JSON.parse(sessionStorage.getItem("current_user")).id is payload.current_user_id) or (JSON.parse(sessionStorage.getItem("current_user")).id is payload.other_user_id))
    window.notifyNewMatch() if ((JSON.parse(sessionStorage.getItem("current_user")).id is payload.current_user_id) or (JSON.parse(sessionStorage.getItem("current_user")).id is payload.other_user_id))
