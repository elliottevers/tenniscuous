window.Profile = React.createClass({

  mixins: [ReactRouter.History],

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
        <Grid>
         <Row>
          <Col xs={1} xsOffset={7}>
            <EditButton isCurrentUser={this.props.isCurrentUser}/>
          </Col>
         </Row>
         </Grid>
          <ProfileObject current_user={this.state.user}/>
        </div>
      );
  }
});
