window.EditProfile = React.createClass({

  getInitialState: function () {
    return {user: this.props.user};
  },

  _onChange: function () {
    this.setState({user: UserStore.user()});
  },

  componentDidMount: function () {
    UserStore.addUserShowChangeListener(this._onChange);
    ApiUtil.fetchUser(this.props.user.id);
  },

  componentWillUnmount: function () {
    UserStore.removeUserShowChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <EditProfileObject current_user={this.state.user}/>
      </div>
    );
  }

});
