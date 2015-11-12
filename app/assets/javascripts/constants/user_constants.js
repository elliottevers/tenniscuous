window.UserConstants = {
  ALL_USERS_FETCHED: "ALL_USERS_FETCHED",
  USER_FETCHED: "USER_FETCHED",
  CURRENT_USER_FETCHED: "CURRENT_USER_FETCHED"
};

window.CloudinaryConstants = {
  PROFILE: "upload/h_200,w_200,c_thumb,r_max",
  MATCH: "upload/h_75,w_75,c_thumb,r_max",
  CONVERSATION: "upload/h_50,w_50,c_thumb,r_max",
  CARD: "upload/h_300,w_230,c_fill,r_40"
};

window.root_url = "localhost:3000";

window.notifyNewMatch = function () {
  if (window.hasNewMatch) {
    $('[data-pulse="false"]').attr('data-pulse', true);
  } else {
    $('[data-pulse="true"]').attr('data-pulse', false);
  }
  console.log("this is being run");
};
