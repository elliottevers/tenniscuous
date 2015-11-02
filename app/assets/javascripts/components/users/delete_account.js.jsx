window.DeleteAccount = React.createClass({

  mixins: [ReactRouter.History],

  handleClick: function(event){
    event.preventDefault();
    var that = this;
    var user = JSON.parse(sessionStorage.getItem("current_user"));
    ApiUtil.destroyUser(user.id, function () {
      this.history.pushState(null, "/", {});
    }.bind(that));
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
