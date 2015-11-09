var EditButton = React.createClass({

  mixins: [ReactRouter.History],

  handleClick: function(event){
    event.preventDefault;
    this.history.pushState(null, '/profile/edit', {});
  },

  render: function (){
    var Button = ReactBootstrap.Button;
    if (this.props.isCurrentUser) {
      return (
        <div>
          <Button bsStyle="info" onClick={this.handleClick}>Edit Profile</Button>
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
