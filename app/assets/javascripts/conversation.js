(function() {
  window.client = new Faye.Client('/faye');

  jQuery(function() {
    return client.subscribe('/conversation', function(payload) {
      if ((JSON.parse(sessionStorage.getItem("current_user")).id === payload.conversation_information.current_user_id) || (JSON.parse(sessionStorage.getItem("current_user")).id === payload.conversation_information.other_user_id)) {
        return ApiActions.ConversationFetched(payload.conversation_information);
      }
    });
  });

}).call(this);
