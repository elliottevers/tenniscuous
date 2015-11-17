var tabList = [
    {"id":0,"image":"http://res.cloudinary.com/dax4cembx/image/upload/v1447309312/profile_generic_pubnvf.png","url":"/profile"},
    {"id":1,"image":"http://res.cloudinary.com/dax4cembx/image/upload/v1447309276/queue_heads_t9b4lg.png","url":"/discovery_queue"},
    {"id":2,"image":"http://res.cloudinary.com/dax4cembx/image/upload/v1447309303/chat_icons_poivie.png","url":"/matches"},
    {"id":3,"image":"http://res.cloudinary.com/dax4cembx/image/upload/v1447709579/revised_cog_dn6dir.png","url":"/account"}
];

var CustomTabs = React.createClass({

  mixins: [ReactRouter.History],

  render: function () {
    return (
      <div id={"tabs"}>
        {tabList.map(function(tab){
            return <Tab
              className={"nav"}
              id={tab.id}
              src={tab.image}/>
        },tabList)}
      </div>
    );
  }
});
