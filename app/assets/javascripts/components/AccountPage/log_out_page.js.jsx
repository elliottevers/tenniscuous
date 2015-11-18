window.LogOutPage = React.createClass({

  render: function () {
    return(
      <div>
        <CustomTabs tabList={tabList} activeTab={3}/>
        <div id={"log-out-wrapper"}>
          <SignOut/>
          <DeleteAccount/>
          <div id={"warning-message"}>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
          </div>
        </div>
      </div>
    );
  }
});
