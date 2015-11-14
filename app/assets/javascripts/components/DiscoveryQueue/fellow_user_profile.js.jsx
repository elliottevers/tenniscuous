var FellowUserProfile = React.createClass({

  mixins: [ReactRouter.History],

  render: function () {
    var user_id = parseInt(this.props.params.id);
    var user = {id: user_id};
    return (
        <div>
        <CustomTabs className={'text-center'} tabList={tabList} activeTab={1}/>
        <div id={"fellow_user_profile_wrapper"}>
        <BackToQueue/>
        <Profile isCurrentUser={false} user={user} />
        </div>
        </div>
    );
  }
});
