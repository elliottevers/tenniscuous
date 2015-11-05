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
    },function(){
        var user_position = [37.7691,-122.4449];
        user.position = user_position;
        ApiUtil.createSession(user, function () {
          this.history.pushState(null, "/discovery_queue", {});
        }.bind(that));
      }, {timeout:3000});

  },

  render: function () {
    var Button = ReactBootstrap.Button;
    return(
    <div>
      <h2>Log In</h2>
      <form onSubmit={this.handleSubmit}>
        <label>Name</label>
        <input value={this.state.username} type="text" onChange={this.handleUsernameChange}/>
        <br/>
        <label>Password</label>
        <input value={this.state.password} type="password" onChange={this.handlePasswordChange}/>
        <br/>
        <Button type="submit" bsStyle="primary">Sign In</Button>
      </form>
    </div>
    );
  }
});
