window.UserProfile = React.createClass({

  render: function(){
    return (
      <div>
        <CustomTabs tabList={tabList} activeTab={0}/>
        <Profile user={JSON.parse(sessionStorage.getItem("current_user"))}/>
      </div>
    );
  }
});
