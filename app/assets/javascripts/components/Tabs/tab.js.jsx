var Tab = React.createClass({

  mixins: [ReactRouter.History],

  handleSelect: function (event) {
    this.history.pushState(null, tabList[event.target.id].url, {});
  },

  render: function(){
    return (
      <div>
        <img
          className={"nav"}
          id={this.props.id}
          onClick={this.handleSelect}
          src={this.props.src}
          data-pulse={false}> </img>
      </div>
    );
  }
});
