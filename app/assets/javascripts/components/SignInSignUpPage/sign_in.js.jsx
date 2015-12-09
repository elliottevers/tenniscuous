window.SignIn = React.createClass({

  mixins: [ReactRouter.History],

  getInitialState: function(){
    return {
      username: "",
      password: ""
    };
  },

  handleUsernameChange: function(event){
    this.setState({
      username: event.target.value
    });
  },

  handlePasswordChange: function(event){
    this.setState({
      password: event.target.value
    });
  },

  componentWillMount: function(){
    React.initializeTouchEvents(true);
  },

  handleSubmit: function(event){

    event.preventDefault();

    var that = this;

    var user = $.extend({}, this.state);

    navigator.geolocation.getCurrentPosition(function(position) {

      var user_position = [position.coords.latitude, position.coords.longitude];

      user.position = user_position;

      ApiUtil.createSession(user, function () {
        this.history.pushState(null, "/discovery_queue", {});
      }.bind(that));
    }, function (error) {
      sweetAlert("Please let us know where you are! Try enabling geolocation.");
    });

  },

  render: function () {
    return(
    <div>
      <form onSubmit={this.handleSubmit}>
        <label>Username</label>
        <input placeholder={"Username"} value={this.state.username} type="text" onChange={this.handleUsernameChange}/>
        <br/>
        <label>Password</label>
        <input placeholder={"Password"} value={this.state.password} type="password" onChange={this.handlePasswordChange}/>
        <br/>
        <button type="submit">Sign In</button>
      </form>
    </div>
    );
  }
});
