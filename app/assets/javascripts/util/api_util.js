
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
        sessionStorage.setItem("current_user", JSON.stringify(user));
        callback();
      },
      error: function(){
        alert("Make sure your password is long enough!");
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
      error: function (message) {
        alert("Your username or password are incorrect!");
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
        history.pushState(null, "/", {});
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
        if (payload.payload.has_new_match) {
          publisher = client.publish('/hasNewMatch', {
            has_new_match: payload.payload.has_new_match,
            current_user_id: payload.payload.current_user_id,
            other_user_id: payload.payload.other_user_id
          });
        }
      },
      error: function(){
        history.pushState(null, "/", {});
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
        history.pushState(null, "/", {});
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
      error: function(){
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
        history.pushState(null, "/", {});
      }
    })
  },

  sendMessage: function(conversation_id, message, numMessages) {
    $.ajax({
      url: "api/conversations/" + conversation_id + "/messages",
      method: "POST",
      data: {body: message, conversation_id: conversation_id, numMessages: numMessages},
      success: function (conversation_information) {
        publisher = client.publish('/conversation', {
          conversation_information: conversation_information
        });
      },
      error: function(){
        history.pushState(null, "/", {});
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
        history.pushState(null, "/", {});
      }
    })
  }
}
