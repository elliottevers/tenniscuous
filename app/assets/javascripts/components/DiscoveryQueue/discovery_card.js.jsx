window.DiscoveryCard = React.createClass({

  mixins: [ReactRouter.History],

  handlePictureClick: function(){
    var id = this.props.id;
    this.history.pushState(null, "/discovery_queue/" + id, {});
  },

  render: function () {

    var url = this.props.profile_picture_url;
    var divImage = {backgroundImage : 'url(' + url + ')'};

    return(
      <div>
        <div className={'photo'}  id={this.props.id} style={divImage} onClick={this.handlePictureClick}>
        	<div className={'meta'}>
          	<p>{this.props.username}</p>
        	</div>
        </div>
      </div>
    );
  }
});
