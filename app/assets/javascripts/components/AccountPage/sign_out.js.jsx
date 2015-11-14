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
    return(
      <div>
        <button onClick={this.handleClick}>Log Out</button>
      </div>
    );
  }
});
