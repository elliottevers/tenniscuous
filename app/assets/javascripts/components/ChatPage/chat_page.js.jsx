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
    this.setState({newMessage: event.target.value});
  },

  handleMessageSubmit: function(event) {
    var that = this;
    ApiUtil.sendMessage(parseInt(that.props.params.id), that.state.newMessage, that.state.numMessages);
  },

  loadMessages: function(event){
    var that = this;
    var conversation_id = parseInt(this.props.params.id);
    ApiUtil.fetchConversation(conversation_id, true);

  },

  render: function () {
    var Button = ReactBootstrap.Button;
    var Input = ReactBootstrap.Input;
    var Grid = ReactBootstrap.Grid;
    var Row = ReactBootstrap.Row;
    var Col = ReactBootstrap.Col;
    var that = this;
    if (this.state.conversation.messages){
      return (

      <div>
        <CustomTabs className={'text-center'} tabList={tabList} activeTab={2}/>
        <ChatMatchHeader
        other_user_id={this.state.conversation.other_user_id}
        other_user_username={this.state.conversation.other_user_username}
        other_user_picture_url={this.state.conversation.other_user_profile_picture_url}
        />
        <Grid>
          <Row>
            <Col xs={4} xsOffset={4}>
              <Button onClick={this.loadMessages} bsStyle="primary">Load Previous Messages</Button>
            </Col>
          </Row>
        </Grid>
        <div className={"messages-wrapper"}>
          <ul>
            {this.state.conversation.messages.map(function (message) {
              return <Message body={message.body} user_id={message.user_id}/>;
            })}
          </ul>
        </div>
        <Grid>
          <Row>
            <Col xs={7}>
              <Input type="text" value={this.state.newMessage} placeholder="New Message" onChange={this.handleMessageChange} labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
            </Col>
            <Col xs={3}>
              <Button onClick={this.handleMessageSubmit} bsStyle="primary">Send Message</Button>
            </Col>
          </Row>
        </Grid>
      </div>

      );
    } else {
      return (
      <CustomTabs className={'text-center'} tabList={tabList} activeTab={2}/>
      );
    }
  }
});
