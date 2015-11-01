window.EditUserProfile = React.createClass({

  render: function(){
    return (
      <div>
        <CustomTabs tabList={tabList} activeTab={0}/>
        <EditProfile edit_user={JSON.parse(sessionStorage.getItem("current_user"))}/>
      </div>
    );
  }
});
