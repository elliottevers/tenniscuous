window.root_url = "https://tenniscuous.herokuapp.com/";

window.notifyNewMatch = function () {
  if (sessionStorage.getItem('hasNewMatch')) {
    $('[data-pulse="false"]').attr('data-pulse', true);
  } else {
    $('[data-pulse="true"]').attr('data-pulse', false);
  }
};
