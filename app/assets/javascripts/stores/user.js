(function () {
  var USERS_INDEX_CHANGE_EVENT = "usersIndexChange";
  var USER_SHOW_CHANGE_EVENT = "userShowChangeEvent";
  var CURRENT_USER_CHANGE_EVENT = "currentUserChangeEvent"

  var _users = [];
  var _current_user = {};
  var _user = {};

  var setCurrentUser = function (user_identifiers) {
    _current_user = user_identifiers;
  };

  var resetUsers = function (users_identifiers) {
    _users = users_identifiers;
  };

  var resetUser = function (user_information) {
    _user = user_information
  };

  window.UserStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _users.slice();
    },

    current_user: function () {
      return $.extend({}, _current_user);
    },

    user: function () {
      return $.extend({}, _user);
    },

    addCurrentUserChangeListener: function (callback) {
      this.on(CURRENT_USER_CHANGE_EVENT, callback);
    },

    removeCurrentUserChangeListener: function (callback) {
      this.removeListener(CURRENT_USER_CHANGE_EVENT, callback);
    },

    addUsersIndexChangeListener: function (callback) {
      window.change_listener_is_on = true;
      console.log(window.change_listener_is_on);
      this.on(USERS_INDEX_CHANGE_EVENT, callback);
    },

    removeUsersIndexChangeListener: function (callback) {
      window.change_listener_is_on = false;
      console.log(window.change_listener_is_on);
      this.removeListener(USERS_INDEX_CHANGE_EVENT, callback);
    },

    addUserShowChangeListener: function (callback) {
      this.on(USER_SHOW_CHANGE_EVENT, callback);
    },

    removeUserShowChangeListener: function (callback) {
      this.removeListener(USER_SHOW_CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function (payload) {
      switch(payload.actionType) {
        case UserConstants.ALL_USERS_FETCHED:
          resetUsers(payload.users_identifiers);
          UserStore.emit(USERS_INDEX_CHANGE_EVENT);
          break;
        case UserConstants.USER_FETCHED:
          resetUser(payload.user_information);
          UserStore.emit(USER_SHOW_CHANGE_EVENT);
          break;
        case UserConstants.CURRENT_USER_FETCHED:
          setCurrentUser(payload.user_identifiers);
          UserStore.emit(CURRENT_USER_CHANGE_EVENT);
          break;
      }
    })
  });
 })();
