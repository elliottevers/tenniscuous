
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
        history.pushState(null, "/", {});
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
        history.pushState(null, "/", {});
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
        alert("Your username or password are incorrect");
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
      }
    })
  },

  updateUser: function(user, callback) {

    $.ajax({
      url: "api/users/" + user.id,
      method: "PATCH",
      data: {user: user},
      success: function (user) {
        ApiActions.setCurrentUser(user);
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
      success: function(has_new_match){
        if (has_new_match) {
          publisher = client.publish('/hasNewMatch', {
            has_new_match: has_new_match
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
        if(user.last_seen_user === returned_user.last_seen_user){

        }
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
        history.pushState(null, "/", {});
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
        history.pushState(null, "/", {});
      }
    })
  },

  fetchAllConversations: function(callback){
    $.ajax({
      url: "api/conversations",
      method: "GET",
      success: function (conversations_identifiers) {
        console.log(conversations_identifiers);
        ApiActions.allConversationsFetched(conversations_identifiers);
      },
      error: function(){
        history.pushState(null, "/", {});
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
