window.MatchHeader = React.createClass({

  mixins: [ReactRouter.History],

  render: function () {

    var url = this.props.other_user_picture_url;
    var divImage = {backgroundImage : 'url(' + url + ')'};

    return(
      <div>
        <div className={"panel"}>
          <img onClick={this.handlePictureClick} src={this.props.other_user_picture_url} className={"img-circle"}></img>
          <p>{this.props.other_user_username}</p>
        </div>
      </div>
    );
  }
});
