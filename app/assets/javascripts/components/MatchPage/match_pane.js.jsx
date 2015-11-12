window.MatchPane = React.createClass({

  mixins: [ReactRouter.History],

  handlePictureClick: function(){
    var id = this.props.conversation_id;
    this.history.pushState(null, "/matches/" + id, {});
  },

  render: function () {

    var url = this.props.other_user_picture_url;
    var divImage = {backgroundImage : 'url(' + url + ')'};
    var Panel = ReactBootstrap.Panel;
    var Image = ReactBootstrap.Image;

    return(
      <div>
        <Panel>
          <Image onClick={this.handlePictureClick} src={this.props.other_user_picture_url} className={"match-image"} alt={"Cinque Terre"}></Image>
          <p>{this.props.other_user_username}</p>
        </Panel>
      </div>
    );
  }
});
