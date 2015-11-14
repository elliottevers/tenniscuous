var BackToQueue = React.createClass({

  mixins: [ReactRouter.History],

  handleClick: function(event){
    event.preventDefault;
    this.history.pushState(null, '/discovery_queue', {});
  },

  render: function (){
      return (
        <div>
          <button id={"backToQueue"} onClick={this.handleClick}>Back</button>
        </div>
      );
    }
});
