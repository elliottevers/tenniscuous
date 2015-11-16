(function() {
  window.client = new Faye.Client('/faye');

  jQuery(function() {
    return client.subscribe('/hasNewMatch', function(payload) {
      if ((JSON.parse(sessionStorage.getItem("current_user")).id === payload.current_user_id) || (JSON.parse(sessionStorage.getItem("current_user")).id === payload.other_user_id)) {
        sessionStorage.setItem('hasNewMatch', payload.has_new_match);
      }
      if ((JSON.parse(sessionStorage.getItem("current_user")).id === payload.current_user_id) || (JSON.parse(sessionStorage.getItem("current_user")).id === payload.other_user_id)) {
        return window.notifyNewMatch();
      }
    });
  });

}).call(this);
