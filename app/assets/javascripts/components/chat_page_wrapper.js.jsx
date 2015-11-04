var ChatPageWrapper = React.createClass({

  mixins: [ReactRouter.History],

  handleClick: function(){
    this.history.pushState(null, "/matches", {});
  },

  render: function () {
    var conversation_id = parseInt(this.props.params.id);
    var conversation = {id: conversation_id};
    var Button = ReactBootstrap.Button;
    return (
        <div>
        <Button onClick={this.handleClick} bsStyle="warning">Back</Button>
        <ChatPage conversation={conversation} />
        </div>
    );
  }
});
