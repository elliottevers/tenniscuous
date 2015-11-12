window.ProfileObject = React.createClass({


  render: function () {
    var Panel = ReactBootstrap.Panel;
    var Well = ReactBootstrap.Well;
    var Image = ReactBootstrap.Image;
    var Grid = ReactBootstrap.Grid;
    var Row = ReactBootstrap.Row;
    var Col = ReactBootstrap.Col;
    return(
      <div>
        <Grid>
          <Row>
              <Image src={this.props.current_user.profile_picture_url}></Image>
          </Row>
          <Row>
            <Col xs={2} xsOffset={5}>
              <h4>{this.props.current_user.username}</h4>
            </Col>
          </Row>
          <Row>
            <Col xs={1}>
              <h4>Description</h4>
            </Col>
          </Row>
          <Row>
              <Well>{this.props.current_user.profile_description}</Well>
          </Row>
          <Row>
            <Col xs={1}>
              <h4>Gender</h4>
            </Col>
          </Row>
          <Row>
              <Well>{this.props.current_user.gender}</Well>
          </Row>
          <Row>
            <Col xs={1}>
              <h4>Genders Sought</h4>
            </Col>
          </Row>
          <Row>
              <Well>{this.props.current_user.genders_sought}</Well>
          </Row>
          <Row>
            <Col xs={1}>
              <h4>Rating</h4>
            </Col>
          </Row>
          <Row>
              <Well>{this.props.current_user.rating}</Well>
          </Row>
          <Row>
            <Col xs={1}>
              <h4>Ratings Sought</h4>
            </Col>
          </Row>
          <Row>
              <Well>{this.props.current_user.ratings_sought}</Well>
          </Row>
          <Row>
            <Col xs={1}>
              <h4>Discovery Radius</h4>
            </Col>
          </Row>
          <Row>
              <Well>{this.props.current_user.discovery_radius}</Well>
          </Row>
        </Grid>
      </div>
    );
  }
});
