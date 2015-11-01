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
  }

}