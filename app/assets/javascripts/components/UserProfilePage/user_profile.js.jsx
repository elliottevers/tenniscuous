window.UserProfile = React.createClass({

  mixins: [ReactRouter.History],

  handleClick: function(event){
    event.preventDefault;
    this.history.pushState(null, '/profile/edit', {});
  },

  render: function(){
    var Button = ReactBootstrap.Button;
    return (
      <div>
        <CustomTabs tabList={tabList} activeTab={0}/>
        <Button onClick={this.handleClick} bsStyle="info"> Edit Information </Button>
        <Profile user={JSON.parse(sessionStorage.getItem("current_user"))}/>
      </div>
    );
  }
});
