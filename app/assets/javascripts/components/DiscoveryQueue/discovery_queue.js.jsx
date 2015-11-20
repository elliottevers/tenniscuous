window.DiscoveryQueue = React.createClass({

  mixins: [ReactRouter.History],

  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return { users: UserStore.all()};
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  componentWillMount: function(){
    React.initializeTouchEvents(true);
  },

  componentDidMount: function () {
    UserStore.addUsersIndexChangeListener(this._onChange);
    var user = JSON.parse(sessionStorage.getItem("current_user"));
    ApiUtil.fetchAllUsers();
  },

  componentWillUnmount: function () {
    UserStore.removeUsersIndexChangeListener(this._onChange);
  },

  handleSubmit: function(event){
    event.preventDefault;
    var user = JSON.parse(sessionStorage.getItem("current_user"));
    user.discovery_radius = parseInt(this.state.new_discovery_radius);
    ApiUtil.updateUser(user, ApiUtil.fetchAllUsers);
  },

  handleAccept: function() {
    var $photo = $("div.photo:last");
    var user_id = $photo.attr('id');
    $photo.addClass('rotate-right');
    var user = JSON.parse(sessionStorage.getItem("current_user"));
    user.last_accepted_user = user_id;
    ApiUtil.updateUserAccept(user);
    window.setTimeout(function(){
      $photo.remove();
    }, 500);

  },

  handleReject: function() {
    var $photo = $("div.photo:last");
    var user_id = $photo.attr('id');
    $photo.addClass('rotate-left');
    var user = JSON.parse(sessionStorage.getItem("current_user"));
    user.last_seen_user = user_id;
    ApiUtil.updateUserReject(user);
    window.setTimeout(function(){
      $photo.remove();
    }, 500);

  },

  handleBallClick: function(){

    var $ball = $(".ball");

    $ball.removeClass('ball').addClass('bouncy-ball');

    window.setTimeout(function(){

      $ball.removeClass('bouncy-ball').addClass('ball');

      var user = {};

      user.id = JSON.parse(sessionStorage.getItem("current_user")).id;

      navigator.geolocation.getCurrentPosition(function(position) {

        var user_position = [position.coords.latitude, position.coords.longitude];

        user.position = user_position;

        ApiUtil.updateUser(user, window.location.reload.bind(window.location));
      });

    }, 5050);
  },

  handleCardChange: function(type){
    if (type === "accept") {
      this.handleAccept();
    } else if (type === "reject") {
      this.handleReject();
    }
  },

  render: function () {

    return(

      <div id={"discovery-container"}>
        <CustomTabs className={'text-center'} tabList={tabList} activeTab={1}/>
        <div id={"ball-and-cards"}>
          {this.state.users.map(function (user) {
            return <DiscoveryCard id={user.id} username={user.username} picture={user.picture}/>;
          })}
          <div className="ballWrapper">
            <div className={"ball"} onClick={this.handleBallClick}>
              <p>Tenniscuous</p>
            </div>
            <p>Search for players around you</p>
          </div>
        </div>
        <LikeDislikeBar onChange={this.handleCardChange} />
      </div>

    );

  }
});
