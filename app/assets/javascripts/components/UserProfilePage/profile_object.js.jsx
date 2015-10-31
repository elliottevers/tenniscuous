window.ProfileObject = React.createClass({

  render: function () {
    var Panel = ReactBootstrap.Panel;
    var Image = ReactBootstrap.Image;
    return(
      <div>
        <Image src={this.props.current_user.profile_picture_url}></Image>
        <Panel>Username: {this.props.current_user.username}</Panel>
        <Panel>Description: {this.props.current_user.profile_description}</Panel>
        <Panel>Gender: {this.props.current_user.gender}</Panel>
        <Panel>Genders Sought: {this.props.current_user.genders_sought}</Panel>
        <Panel>Rating: {this.props.current_user.rating}</Panel>
        <Panel>Ratings Sought: {this.props.current_user.ratings_sought}</Panel>
      </div>
    );
  }
});
