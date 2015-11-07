window.client = new Faye.Client('/faye')

jQuery ->
  client.subscribe '/conversation', (payload) ->
    ApiActions.ConversationFetched(payload.conversation_information)
