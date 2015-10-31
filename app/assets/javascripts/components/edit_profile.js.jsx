window.EditProfile = React.createClass({

  getInitialState: function () {
    return {edit_user: this.props.edit_user};
  },

  _onChange: function () {
    this.setState({edit_user: UserStore.user()});
  },

  componentDidMount: function () {
    UserStore.addUserShowChangeListener(this._onChange);
    ApiUtil.fetchUser(this.props.edit_user.id);
  },

  componentWillUnmount: function () {
    UserStore.removeUserShowChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <EditProfileObject edit_current_user={this.state.edit_user}/>
      </div>
    );
  }

});
