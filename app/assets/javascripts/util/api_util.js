window.ApiUtil = {

  destroyUser: function(id, callback) {
    $.ajax({
      url: "api/users/" + id,
      method: "DELETE",
      success: function(user){
        sessionStorage.setItem("current_user", null);
        callback();
      },
      error: function(){
        window.location.replace(root_url);
      }
    })

  },

  createUser: function(user, callback) {
    $.ajax({
      url: "api/users",
      method: "POST",
      data: {user: user},
      success: function(user){
        if (user.id === undefined) {
          sweetAlert(user.errors);
        } else {
          sessionStorage.setItem("current_user", JSON.stringify(user));
          callback();
        }
      },
      error: function(){

      }
    })
  },

  createSession: function(user, callback) {

    $.ajax({
      url: "api/session",
      method: "POST",
      data: {user: user},
      success: function (user) {
        sessionStorage.setItem("current_user", JSON.stringify(user));
        callback();
      },
      error: function(){
        window.location.replace(root_url);
      }
    })
  },

  destroySession: function(callback) {
    $.ajax({
      url: "api/session",
      method: "DELETE",
      success: function (message) {
        sessionStorage.setItem("current_user", null);
        callback();
      },
      error: function(message){
        window.location.replace(root_url);
      }
    })
  },

  updateUser: function(user, callback) {

    $.ajax({
      url: "api/users/" + user.id,
      method: "PATCH",
      data: {user: user},
      success: function (user) {
        sessionStorage.setItem("current_user", JSON.stringify(user));
        callback();
      },
      error: function(){

      }
    })
  },

  updateUserAccept: function(user){
    var message = "acceptance";
    $.ajax({
      url: "api/users/" + user.id,
      method: "PATCH",
      data: {user: user, message: message},
      success: function(payload){
        user_id = JSON.parse(sessionStorage.getItem("current_user")).id;

        if (payload.has_new_match) {

          publisher = client.publish('/hasNewMatch', {
            has_new_match: payload.has_new_match,
            current_user_id: payload.current_user_id,
            other_user_id: payload.other_user_id
          });

        }
      },
      error: function(){

      }
    })
  },

  updateUserReject: function(user){
    var message = "rejection";
    $.ajax({
      url: "api/users/" + user.id,
      method: "PATCH",
      data: {user: user, message: message},
      success: function(returned_user){
      },
      error: function(){

      }
    })
  },

  fetchAllUsers: function(callback){
    $.ajax({
      url: "api/users",
      method: "GET",
      success: function (users_identifiers) {
        ApiActions.AllUsersFetched(users_identifiers);
      },
      error: function(){
        window.location.replace(root_url);
      }
    })
  },

  fetchUser: function(id, callback){
    $.ajax({
      url: "api/users/" + id,
      method: "GET",
      success: function (user) {
        ApiActions.UserFetched(user);
      },
      error: function(payload){
        console.log(payload)
        window.location.replace(root_url);
      }
    })
  },

  fetchAllConversations: function(callback){
    $.ajax({
      url: "api/conversations",
      method: "GET",
      success: function (conversations_identifiers) {
        ApiActions.allConversationsFetched(conversations_identifiers);
      },
      error: function(){
        window.location.replace(root_url);
      }
    })
  },

  fetchConversation: function(id, loadMoreMessages){
    $.ajax({
      url: "api/conversations/" + id,
      method: "GET",
      data: {loadMoreMessages: loadMoreMessages},
      success: function (conversation_information) {
        ApiActions.ConversationFetched(conversation_information);
      },
      error: function(){

      }
    })
  },

  sendMessage: function(conversation_id, message, numMessages) {
    $.ajax({
      url: "api/conversations/" + conversation_id + "/messages",
      method: "POST",
      data: {body: message,
        conversation_id: conversation_id,
        numMessages: numMessages
      },
      success: function (conversation_information) {
        publisher = client.publish('/conversation', {
          conversation_information: conversation_information
        });
      },
      error: function(){

      }
    })
  },

  deleteConversation: function(conversation_id, callback) {
    $.ajax({
      url: "api/conversations/" + conversation_id,
      method: "DELETE",
      success: function (conversation) {
        callback();
      },
      error: function(){

      }
    })
  }
}
