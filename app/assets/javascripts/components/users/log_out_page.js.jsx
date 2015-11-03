window.LogOutPage = React.createClass({

  render: function () {
    return(
      <div>
        <CustomTabs tabList={tabList} activeTab={3}/>
        <SignOut/>
        <DeleteAccount/>
      </div>
    );
  }
});
