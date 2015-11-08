var tabList = [
    {'id':1, 'name':'Profile', 'url':'/profile' },
    {'id':2, 'name':'Discovery Queue', 'url':'/discovery_queue' },
    {'id':3, 'name':'Matches', 'url':'/matches' },
    {'id':4, 'name':'Account', 'url':'/account' }
];

var CustomTabs = React.createClass({

  mixins: [ReactRouter.History],

  handleSelect: function (key) {
    this.history.pushState(null, this.props.tabList[key].url, {});
  },

  render: function () {

    var tabList = this.props.tabList;
    var Tabs = ReactBootstrap.Tabs;
    var Tab = ReactBootstrap.Tab;
    var Grid = ReactBootstrap.Grid;
    var Row = ReactBootstrap.Row;
    var Col = ReactBootstrap.Col;
    return (
    <Grid>
      <Row>
        <Col xs={3}>
          <Tabs activeKey={this.props.activeTab} onSelect={this.handleSelect}>
            <Tab eventKey={0} title={tabList[0].name}></Tab>
          </Tabs>
        </Col>
        <Col xs={3}>
          <Tabs activeKey={this.props.activeTab} onSelect={this.handleSelect}>
            <Tab eventKey={1} title={tabList[1].name}></Tab>
          </Tabs>
        </Col>
        <Col xs={3}>
          <Tabs activeKey={this.props.activeTab} onSelect={this.handleSelect}>
            <Tab eventKey={2} title={tabList[2].name}></Tab>
          </Tabs>
        </Col>
        <Col xs={3}>
          <Tabs activeKey={this.props.activeTab} onSelect={this.handleSelect}>
            <Tab eventKey={3} title={tabList[3].name}></Tab>
          </Tabs>
        </Col>
     </Row>
    </Grid>
    );
  }
});
