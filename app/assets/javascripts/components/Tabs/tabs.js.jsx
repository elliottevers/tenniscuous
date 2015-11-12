var tabList = [
    {'id':1, 'name':'Profile', 'url':'/profile' },
    {'id':2, 'name':'Discovery Queue', 'url':'/discovery_queue' },
    {'id':3, 'name':'Matches', 'url':'/matches' },
    {'id':4, 'name':'Account', 'url':'/account' }
];

var CustomTabs = React.createClass({

  mixins: [ReactRouter.History],

  handleSelect: function (event) {
    this.history.pushState(null, this.props.tabList[event.target.id].url, {});
  },

  render: function () {
    var Img = ReactBootstrap.Img;
    var tabList = this.props.tabList;
    var Tabs = ReactBootstrap.Tabs;
    var Tab = ReactBootstrap.Tab;
    var Grid = ReactBootstrap.Grid;
    var Row = ReactBootstrap.Row;
    var Col = ReactBootstrap.Col;
    return (
    <div>
      <Grid id={"tabs"}>
        <Row>
          <Col xs={3}>
              <img className={"nav"} id={0} onClick={this.handleSelect} src={"http://res.cloudinary.com/dax4cembx/image/upload/v1447309312/profile_generic_pubnvf.png"}>
              </img>
          </Col>
          <Col xs={3}>
              <img className={"nav"} id={1} onClick={this.handleSelect} src={"http://res.cloudinary.com/dax4cembx/image/upload/v1447309276/queue_heads_t9b4lg.png"}>
              </img>
          </Col>
          <Col xs={3}>
              <img className={"nav"} id={2} data-pulse={false} onClick={this.handleSelect} src={"http://res.cloudinary.com/dax4cembx/image/upload/v1447309303/chat_icons_poivie.png"}>
              </img>
          </Col>
          <Col xs={3}>
              <img className={"nav"} id={3} onClick={this.handleSelect} src={"http://res.cloudinary.com/dax4cembx/image/upload/v1447303709/cog_cxunjv.png"}>
              </img>
          </Col>
        </Row>
      </Grid>
    </div>

    );
  }
});
