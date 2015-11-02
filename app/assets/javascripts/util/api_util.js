
window.ApiUtil = {

  destroyUser: function(id, callback) {
    $.ajax({
      url: "api/users/" + id,
      method: "DELETE",

      success: function(user){
        callback();
      }
    })

  },

  createUser: function(user, callback) {
    $.ajax({
      url: "api/users",
      method: "POST",
      data: {user: user},
      success: function(user_id){
        ApiActions.setCurrentUser(user_id);
        callback();
      },
      error: function(message){
        alert("username or password is invalid");
      }
    })
  },

  createSession: function(user, callback) {

    $.ajax({
      url: "api/session",
      method: "POST",
      data: {user: user},
      success: function (user) {
        var user_identifiers = {id: user.id, username: user.username, profile_picture_url: user.profile_picture_url};
        sessionStorage.setItem("current_user", JSON.stringify(user_identifiers));
        ApiActions.setCurrentUser(user_identifiers);
        callback();
      },
      error: function (message) {
        alert("incorrect credentials");
      }
    })
  },

  destroySession: function(callback) {
    $.ajax({
      url: "api/session",
      method: "DELETE",
      success: function (message) {
        ApiActions.setCurrentUser(null);
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
      }
    })
  },

  updateUserAccept: function(user){
    var message = "acceptance";
    $.ajax({
      url: "api/users/" + user.id,
      method: "PATCH",
      data: {user: user, message: message},
      success: function(returned_user){
        if(user.last_accepted_user === returned_user.last_accepted_user){

        }
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
      }
    })
  },

  fetchAllUsers: function(){
    $.ajax({
      url: "api/users",
      method: "GET",
      success: function (users_identifiers) {
        ApiActions.AllUsersFetched(users_identifiers);
      }
    })
  },

  fetchUser: function(id, callback){
    $.ajax({
      url: "api/users/" + id,
      method: "GET",
      success: function (user) {
        ApiActions.UserFetched(user);
      }
    })
  }
}
