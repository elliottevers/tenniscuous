window.LogInPage = React.createClass({

  mixins: [ReactRouter.History],

  handleClick: function (event) {
      event.preventDefault;
      this.history.pushState(null, '/create_account', {});
  },

  componentWillMount: function(){
    React.initializeTouchEvents(true);
  },

  render: function () {
      return(
        <div>
          <div id={"logo-wrapper"}>
            <p>
              Tenniscuous
            </p>
          </div>
          <div id={"form-wrapper"}>
            <SignIn/>
            <button onTouchStart={this.handleClick} onClick={this.handleClick}>Create Account</button>
          </div>
        </div>
      )
  }
});
