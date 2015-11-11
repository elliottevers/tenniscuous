window.DiscoveryQueue = React.createClass({


  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return { users: UserStore.all()};
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());

  },

  componentDidMount: function () {
    UserStore.addUsersIndexChangeListener(this._onChange);
    var user = JSON.parse(sessionStorage.getItem("current_user"));
    ApiUtil.fetchAllUsers();
  },

  componentWillUnmount: function () {
    UserStore.removeUsersIndexChangeListener(this._onChange);
  },


  handleRadiusChange: function(event){
    event.preventDefault;
    this.setState({new_discovery_radius: event.target.value});
  },

  handleSubmit: function(event){
    event.preventDefault;
    var user = JSON.parse(sessionStorage.getItem("current_user"));
    user.discovery_radius = parseInt(this.state.new_discovery_radius);
    $.when(ApiUtil.updateUser(user)).then(ApiUtil.fetchAllUsers());
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
    }, 1000);

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
    }, 1000);

  },

  handleBallClick: function(){
    var $ball = $(".ball");
    $ball.removeClass('ball').addClass('bouncy-ball');
    window.setTimeout(function(){
      $ball.removeClass('bouncy-ball').addClass('ball');
    }, 3000);
  },

  handleCardChange: function(type){
    if (type === "accept") {
      this.handleAccept();
    } else if (type === "reject") {
      this.handleReject();
    }
  },

  render: function () {
    var Grid = ReactBootstrap.Grid;
    var Col = ReactBootstrap.Col;
    var Row = ReactBootstrap.Row;

    return(

      <div>
        <CustomTabs className={'text-center'} tabList={tabList} activeTab={1}/>
        <Grid>
          <Row>
            <Col xs={6} xsOffset={3}>
              {this.state.users.map(function (user) {
                return <DiscoveryCard id={user.id} username={user.username} picture={user.picture}/>;
              })}
              <div className="ballWrapper">
                <div className={"ball"} onClick={this.handleBallClick}></div>
                <div className={"ballShadow"}></div>
              </div>
            </Col>
          </Row>
          <Row>
            <LikeDislikeBar onChange={this.handleCardChange} />
          </Row>
        </Grid>
      </div>

    );

  }
});
