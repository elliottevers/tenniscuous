window.DeleteAccount = React.createClass({

  handleClick: function(event){
    event.preventDefault();
    var current_user = UserStore.current_user();
    ApiUtil.destroyUser(current_user[0].id);
  },

  render: function () {
    var Button = ReactBootstrap.Button;
    return(
      <div>
        <Button bsStyle="danger" onClick={this.handleClick}>Delete Account</Button>
      </div>
    );
  }
});
