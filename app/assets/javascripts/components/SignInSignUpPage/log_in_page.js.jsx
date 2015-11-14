window.LogInPage = React.createClass({

  mixins: [ReactRouter.History],

  handleClick: function (event) {
      event.preventDefault;
      this.history.pushState(null, '/create_account', {});
  },

  render: function () {
      return(
        <div>
          <SignIn/>
          <button onClick={this.handleClick}>Create Account</button>
        </div>
      )
  }
});
