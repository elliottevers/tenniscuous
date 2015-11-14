var ChatPageWrapper = React.createClass({

  mixins: [ReactRouter.History],

  handleClick: function(){
    this.history.pushState(null, "/matches", {});
  },

  render: function () {
    var conversation_id = parseInt(this.props.params.id);
    var conversation = {id: conversation_id};
    return (
        <div>
        <button onClick={this.handleClick}>Back</button>
        <ChatPage conversation={conversation} />
        </div>
    );
  }
});
