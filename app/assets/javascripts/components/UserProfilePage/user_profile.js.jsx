window.UserProfile = React.createClass({

  mixins: [ReactRouter.History],

  handleClick: function(event){
    event.preventDefault;
    this.history.pushState(null, '/profile/edit', {});
  },

  render: function(){
    return (
      <div>
        <CustomTabs tabList={tabList} activeTab={0}/>
        <Profile user={JSON.parse(sessionStorage.getItem("current_user"))}/>
      </div>
    );
  }
});
