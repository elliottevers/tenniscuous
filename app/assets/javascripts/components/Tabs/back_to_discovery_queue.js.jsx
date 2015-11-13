var BackToQueue = React.createClass({

  mixins: [ReactRouter.History],

  handleClick: function(event){
    event.preventDefault;
    this.history.pushState(null, '/discovery_queue', {});
  },

  render: function (){
    var Button = ReactBootstrap.Button;
      return (
        <div>
          <Button bsStyle="info" id={"backToQueue"} onClick={this.handleClick}>Back</Button>
        </div>
      );
    }
});
