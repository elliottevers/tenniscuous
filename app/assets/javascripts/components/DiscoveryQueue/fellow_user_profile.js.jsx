var FellowUserProfile = React.createClass({

  mixins: [ReactRouter.History],

  handleClick: function(){
    if (window.location.href.indexOf("?chat") > -1) {
      this.history.pushState(null, "/matches", {});
    } else {
      this.history.pushState(null, "/discovery_queue", {});
    }
  },

  render: function () {
    var user_id = parseInt(this.props.params.id);
    var user = {id: user_id};
    return (
        <div>
          <CustomTabs className={'text-center'} tabList={tabList} activeTab={1}/>
          <div id={"fellow_user_profile_wrapper"}>
            <button id={"toPreviousPage"} onClick={this.handleClick}>Back</button>
            <Profile isCurrentUser={false} user={user} />
          </div>
        </div>
    );
  }
});
