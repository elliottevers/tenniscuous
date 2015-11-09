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
    var Panel = ReactBootstrap.Panel;
    var Image = ReactBootstrap.Image;
    var Button = ReactBootstrap.Button;
    var Grid = ReactBootstrap.Grid;
    var Row = ReactBootstrap.Row;
    var Col = ReactBootstrap.Col;

    return(
      <div>
        <Panel>
        <Grid>
          <Row>
           <Col xs={4}>
             <Button onClick={this.handleClick} bsStyle="warning">Back to Matches</Button>
           </Col>
           <Col xs={4}>
              <Image onClick={this.handlePictureClick} src={this.props.other_user_picture_url} className={"img-circle"} alt={"Cinque Terre"} width={50} height={50}></Image>
              <p>{this.props.other_user_username}</p>
           </Col>
           <Col xs={4}>
             <Button onClick={this.unmatchUser} bsStyle="danger">Unmatch User</Button>
           </Col>
          </Row>
        </Grid>
        </Panel>
      </div>
    );
  }
});
