var FellowUserProfile = React.createClass({

  mixins: [ReactRouter.History],

  handleClick: function(){
    this.history.pushState(null, "/discovery_queue", {});
  },

  render: function () {
    var user_id = parseInt(this.props.params.id);
    var user = {id: user_id};
    var Button = ReactBootstrap.Button;
    return (
        <div>
        <Button onClick={this.handleClick} bsStyle="warning">Back</Button>
        <Profile isCurrentUser={false} user={user} />
        </div>
    );
  }
});
