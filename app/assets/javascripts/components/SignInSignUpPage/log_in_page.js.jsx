window.LogInPage = React.createClass({

  mixins: [ReactRouter.History],

  handleClick: function (event) {
      event.preventDefault;
      this.history.pushState(null, '/create_account', {});
  },

  render: function () {
    var Button = ReactBootstrap.Button;
      return(
        <div>
          <SignIn/>
          <Button onClick={this.handleClick} bsStyle="primary">Create Account</Button>
        </div>
      )
  }
});
