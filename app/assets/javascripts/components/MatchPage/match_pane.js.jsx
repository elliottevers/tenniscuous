window.MatchPane = React.createClass({

  mixins: [ReactRouter.History],

  handlePictureClick: function(){
    var id = this.props.conversation_id;
    this.history.pushState(null, "/matches/" + id, {});
  },

  render: function () {

    var url = this.props.other_user_picture_url;
    var divImage = {backgroundImage : 'url(' + url + ')'};

    return(
      <div>
        <div className={"panel"}>
          <img onClick={this.handlePictureClick} src={this.props.other_user_picture_url} className={"match-image"}></img>
          <p>{this.props.other_user_username}</p>
        </div>
      </div>
    );
  }
});
