var ChatPage = React.createClass({

  mixins: [ReactRouter.History],

  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return { conversation: ConversationStore.conversation(), newMessage: ""};
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  componentDidMount: function () {
    ConversationStore.addConversationShowChangeListener(this._onChange);
    var conversation_id = parseInt(this.props.params.id);
    ApiUtil.fetchConversation(conversation_id);
  },

  componentWillUnmount: function () {
    ConversationStore.removeConversationShowChangeListener(this._onChange);
  },

  handleMessageChange: function(event) {
    event.preventDefault();
    this.setState({newMessage: event.target.value});
  },

  handleMessageSubmit: function(event) {
    event.preventDefault();
    var that = this;
    ApiUtil.sendMessage(parseInt(that.props.params.id), that.state.newMessage, that.state.numMessages);
  },

  handleKeyDown: function(event) {
    var that = this;
    var ENTER = 13;
    if( event.keyCode == ENTER ) {
        this.handleMessageSubmit(event);
    }

  },

  loadMessages: function(event){
    var conversation_id = parseInt(this.props.params.id);
    ApiUtil.fetchConversation(conversation_id, true);
  },

  render: function () {

    if (this.state.conversation.messages){
      return (

      <div>
        <CustomTabs className={'text-center'} tabList={tabList} activeTab={2}/>

        <ChatMatchHeader
        conversation_id={this.state.conversation.conversation_id}
        other_user_id={this.state.conversation.other_user_id}
        other_user_username={this.state.conversation.other_user_username}
        other_user_picture_url={this.state.conversation.other_user_profile_picture_url}
        />

        <button id={"load-messages"} onClick={this.loadMessages}>Load Previous Messages</button>

        <div className={"messages-wrapper"}>
          <ul>
            {this.state.conversation.messages.map(function (message) {
              return <Message body={message.body} user_id={message.user_id}/>;
            })}
          </ul>
        </div>
        <div id={"send_message_wrapper"}>
          <textarea
            value={this.state.newMessage}
            placeholder={"New Message"}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleMessageChange}></textarea>
          <button onClick={this.handleMessageSubmit}>Send</button>
        </div>
      </div>

      );
    } else {
      return (
      <CustomTabs className={'text-center'} tabList={tabList} activeTab={2}/>
      );
    }
  }
});
