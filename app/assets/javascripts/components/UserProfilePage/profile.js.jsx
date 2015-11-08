window.Profile = React.createClass({

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

  render: function () {
      var Grid = ReactBootstrap.Grid;
      var Row = ReactBootstrap.Row;
      var Col = ReactBootstrap.Col;
      return(
        <div>
          <ProfileObject current_user={this.state.user}/>
        </div>
      );
  }
});
