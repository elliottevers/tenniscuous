window.ApiActions = {

  UserFetched: function (user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_FETCHED,
      user_information: user
    });
  },

  setCurrentUser: function (user_identifiers) {
    AppDispatcher.dispatch({
      actionType: UserConstants.CURRENT_USER_FETCHED,
      user_identifiers: user_identifiers
    });
  },

  AllUsersFetched: function (users_identifiers){
    AppDispatcher.dispatch({
      actionType: UserConstants.ALL_USERS_FETCHED,
      users_identifiers: users_identifiers
    });
  },

  allConversationsFetched: function(conversations_identifiers){
    AppDispatcher.dispatch({
      actionType: ConversationConstants.ALL_CONVERSATIONS_FETCHED,
      conversations_identifiers: conversations_identifiers
    });
  },

  ConversationFetched: function(conversation_information){
    if (conversation_information.current_user_id === JSON.parse(sessionStorage.getItem("current_user")).id){
      conversation_information.other_user_id = conversation_information.other_user_id;
      conversation_information.other_user_username = conversation_information.other_user_username;
      conversation_information.other_user_profile_picture_url = conversation_information.other_user_profile_picture_url;
    } else {
      conversation_information.other_user_id = conversation_information.current_user_id;
      conversation_information.other_user_username = conversation_information.current_user_username;
      conversation_information.other_user_profile_picture_url = conversation_information.current_user_profile_picture_url;
    }
    AppDispatcher.dispatch({
      actionType: ConversationConstants.CONVERSATION_FETCHED,
      conversation_information: conversation_information
    });
  },

  messageCreated: function(){
    AppDispatcher.dispatch({
      actionType: ConversationConstants.MESSAGE_CREATED
    });
  }

}
