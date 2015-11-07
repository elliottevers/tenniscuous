window.MatchesPage = React.createClass({

  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return { conversations: ConversationStore.all()};
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());

  },

  componentDidMount: function () {
    ConversationStore.addConversationsIndexChangeListener(this._onChange);
    var user = JSON.parse(sessionStorage.getItem("current_user"));
    ApiUtil.fetchAllConversations();
  },

  componentWillUnmount: function () {
    ConversationStore.removeConversationsIndexChangeListener(this._onChange);
  },


  render: function(){
    return (
      <div>
        <CustomTabs className={'text-center'} tabList={tabList} activeTab={2}/>
        {this.state.conversations.map(function (conversation) {
          return <MatchPane
                  conversation_id={conversation.conversation_id}
                  other_user_id={conversation.other_user_id}
                  other_user_username={conversation.other_user_username}
                  other_user_picture_url={conversation.other_user_profile_picture_url}
                  />;
        })}
      </div>
    );
  }
});
