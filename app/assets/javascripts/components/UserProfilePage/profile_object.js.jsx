window.ProfileObject = React.createClass({

  render: function () {
    var Panel = ReactBootstrap.Panel;
    var Image = ReactBootstrap.Image;
    var Grid = ReactBootstrap.Grid;
    var Row = ReactBootstrap.Row;
    var Col = ReactBootstrap.Col;
    return(
      <div>
      <Grid>
        <Row>
          <Col xs={4} xsOffset={4}>
            <Image src={this.props.current_user.profile_picture_url} className={"img-responsive"} circle></Image>
          </Col>
        </Row>
      </Grid>
        <Panel>Username: {this.props.current_user.username}</Panel>
        <Panel>Description: {this.props.current_user.profile_description}</Panel>
        <Panel>Gender: {this.props.current_user.gender}</Panel>
        <Panel>Genders Sought: {this.props.current_user.genders_sought}</Panel>
        <Panel>Rating: {this.props.current_user.rating}</Panel>
        <Panel>Ratings Sought: {this.props.current_user.ratings_sought}</Panel>
        <Panel>Discovery Radius: {this.props.current_user.discovery_radius}</Panel>
      </div>
    );
  }
});
