window.CreateAccount = React.createClass({

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

      ApiUtil.createUser(user, function () {
        that.history.pushState(null, "/profile", {});
      });
    });

  },

  render: function () {
    return(
      <div>
        <h2>Create Account</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input value={this.state.username} type="text" onChange={this.handleUsernameChange}/>
          <br/>
          <label>Password</label>
          <input value={this.state.password} type="password" onChange={this.handlePasswordChange}/>
          <br/>
          <button type="submit" bsStyle="primary">Create Account</button>
        </form>
      </div>
    );
  }
});
