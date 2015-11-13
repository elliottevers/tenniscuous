window.client = new Faye.Client('/faye')

jQuery ->
  client.subscribe '/conversation', (payload) ->
    ApiActions.ConversationFetched(payload.conversation_information) if JSON.parse(sessionStorage.getItem("current_user")).id is (payload.conversation_information.current_user_id or payload.conversation_information.other_user_id)
