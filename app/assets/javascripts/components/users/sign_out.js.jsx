window.SignOut = React.createClass({

  handleClick: function(event){
    event.preventDefault();
    ApiUtil.destroySession();
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
