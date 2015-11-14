var EditButton = React.createClass({

  mixins: [ReactRouter.History],

  handleClick: function(event){
    event.preventDefault;
    this.history.pushState(null, '/profile/edit', {});
  },

  render: function (){
    if (this.props.isCurrentUser) {
      return (
        <div>
          <button id={"goToEditProfileButton"} onClick={this.handleClick}>Edit Profile</button>
        </div>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
  }
});
