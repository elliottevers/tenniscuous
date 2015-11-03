window.EditProfile = React.createClass({

  getInitialState: function () {
    return {edit_user: this.props.edit_user, fetched_user: false};
  },

  _onChange: function () {
    this.setState({edit_user: UserStore.user(), fetched_user: true});
  },

  componentDidMount: function () {
    UserStore.addUserShowChangeListener(this._onChange);
    ApiUtil.fetchUser(this.state.edit_user.id);
  },

  componentWillUnmount: function () {
    UserStore.removeUserShowChangeListener(this._onChange);
  },

  render: function() {
    if (this.state.fetched_user) {
      return (
        <div>
          <EditProfileObject edit_current_user={this.state.edit_user}/>
        </div>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
  }

});
