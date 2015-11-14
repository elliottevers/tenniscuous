window.ChatMatchHeader = React.createClass({

  mixins: [ReactRouter.History],


  handleClick: function(){
    this.history.pushState(null, "/matches", {});
  },

  unmatchUser: function(event){
    var that = this;
    ApiUtil.deleteConversation(parseInt(that.props.params.id), that.history.pushState(null, "/matches", {}));
  },

  render: function () {

    var url = this.props.other_user_picture_url;
    var divImage = {backgroundImage : 'url(' + url + ')'};

    return(
      <div>
        <div className={"chat-panel"}>
          <button onClick={this.handleClick}>Back to Matches</button>
          <img onClick={this.handlePictureClick} src={this.props.other_user_picture_url}></img>
          <p>{this.props.other_user_username}</p>
          <button onClick={this.unmatchUser}>Unmatch User</button>
        </div>
      </div>
    );
  }
});
