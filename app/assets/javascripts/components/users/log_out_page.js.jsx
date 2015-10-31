window.LogOutPage = React.createClass({

  render: function () {
    return(
      <div>
        <CustomTabs tabList={tabList} activeTab={2}/>
        <SignOut/>
        <DeleteAccount/>
      </div>
    );
  }
});
