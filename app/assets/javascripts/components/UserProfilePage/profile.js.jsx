window.Profile = React.createClass({

  mixins: [ReactRouter.History],

  getInitialState: function () {
    return {user: this.props.user};
  },

  _onChange: function () {
    this.setState({user: UserStore.user()});
  },

  componentWillMount: function(){
    React.initializeTouchEvents(true);
  },

  componentDidMount: function () {
    UserStore.addUserShowChangeListener(this._onChange);
    ApiUtil.fetchUser(this.props.user.id);
  },

  componentWillUnmount: function () {
    UserStore.removeUserShowChangeListener(this._onChange);
  },

  render: function () {
      return(
        <div id={"profile_wrapper"}>
          <EditButton isCurrentUser={this.props.isCurrentUser}/>
          <ProfileObject current_user={this.state.user}/>
        </div>
      );
  }
});
