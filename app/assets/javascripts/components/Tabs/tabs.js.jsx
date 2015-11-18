var tabList = [
    {"id":0,"image":"http://res.cloudinary.com/dax4cembx/image/upload/v1447885218/profile_icon_rtnvo3.png","url":"/profile"},
    {"id":1,"image":"http://res.cloudinary.com/dax4cembx/image/upload/v1447885218/queue_heads_nmppxg.png","url":"/discovery_queue"},
    {"id":2,"image":"http://res.cloudinary.com/dax4cembx/image/upload/v1447885218/chat_icon_q0luyj.png","url":"/matches"},
    {"id":3,"image":"http://res.cloudinary.com/dax4cembx/image/upload/v1447885218/gear_icon_8points_cfzygq.png","url":"/account"}
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
