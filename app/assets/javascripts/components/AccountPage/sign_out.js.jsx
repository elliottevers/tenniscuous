window.SignOut = React.createClass({

  mixins: [ReactRouter.History],

  handleClick: function(event){
    event.preventDefault();
    var that = this;
    ApiUtil.destroySession(function () {
      this.history.pushState(null, "/", {});
    }.bind(that));
  },

  render: function () {
    var Button = ReactBootstrap.Button;
    return(
      <div>
        <Button bsStyle="danger" onClick={this.handleClick}>Log Out</Button>
      </div>
    );
  }
});
