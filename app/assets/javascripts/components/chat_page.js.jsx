var ChatPage = React.createClass({

  mixins: [ReactRouter.History],

  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {

    return { conversation: ConversationStore.conversation()};
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

  handleClick: function(){
    this.history.pushState(null, "/matches", {});
  },

  render: function () {
    var Button = ReactBootstrap.Button;
    if (this.state.conversation === {}){
      return (
        <CustomTabs className={'text-center'} tabList={tabList} activeTab={2}/>
      );
    } else {
      return (
          <div>
          <CustomTabs className={'text-center'} tabList={tabList} activeTab={2}/>
          <Button onClick={this.handleClick} bsStyle="warning">Back to Matches</Button>
          <MatchHeader
          other_user_id={this.state.conversation.other_user_id}
          other_user_username={this.state.conversation.other_user_username}
          other_user_picture_url={this.state.conversation.other_user_profile_picture_url}
          />
          </div>
      );
    }
  }
});
