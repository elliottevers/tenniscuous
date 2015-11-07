var Message = React.createClass({

  determineIfCurrentUser: function(){
    if(this.props.user_id === JSON.parse(sessionStorage.getItem("current_user")).id){
      return (
        "message current_user"
      );
    } else {
      return (
        "message other_user"
      );
    }
  },

  render: function () {
    return (
      <div>
        <div className={this.determineIfCurrentUser()}>{this.props.body}</div>
      </div>
    );
  }
});
