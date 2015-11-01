var tabList = [
    {'id':1, 'name':'Profile', 'url':'/profile' },
    {'id':2, 'name':'Discovery Queue', 'url':'/discovery_queue' },
    {'id':3, 'name':'Account', 'url':'/account' }
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

    return (
      <Tabs activeKey={this.props.activeTab} onSelect={this.handleSelect}>
        <Tab eventKey={0} title={tabList[0].name}></Tab>
        <Tab eventKey={1} title={tabList[1].name}></Tab>
        <Tab eventKey={2} title={tabList[2].name}></Tab>
      </Tabs>
    );
  }
});
