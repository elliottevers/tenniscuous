window.ProfileObject = React.createClass({

  render: function () {
    if (!this.props.current_user.ratings_sought) {
      ratings_sought = [" "," "];
    } else {
      ratings_sought = this.props.current_user.ratings_sought;
    }
    if (!this.props.current_user.genders_sought) {
      genders_sought = "";
    } else {
      genders_sought = this.props.current_user.genders_sought.join(", ");
    }
    return(
      <div>
        <img src={this.props.current_user.profile_picture_url}></img>
        <div className={"description-container"}>
            <h4>{this.props.current_user.username}</h4>
            <p>{this.props.current_user.profile_description}</p>
          <div className={"bottom_border"}></div>
        </div>
        <div className={"profile_container"}>
          <div className={"user_datum_container"}>
            <div className={"user_datum"}>
              <p>Gender</p>
              <p>{this.props.current_user.gender}</p>
            </div>
            <div className={"bottom_border"}></div>
          </div>
          <div className={"user_datum_container"}>
            <div className={"user_datum"}>
              <p>Formats Sought</p>
              <p>{genders_sought}</p>
            </div>
            <div className={"bottom_border"}></div>
          </div>
          <div className={"user_datum_container"}>
            <div className={"user_datum"}>
              <p>NTRP Level</p>
              <p>{this.props.current_user.rating}</p>
            </div>
            <div className={"bottom_border"}></div>
          </div>
          <div className={"user_datum_container"}>
            <div className={"user_datum"}>
              <p>NTRP Levels Sought</p>
              <p>{ratings_sought[0]}</p>
              <p> - </p>
              <p>{ratings_sought[1]}</p>
            </div>
            <div className={"bottom_border"}></div>
          </div>
          <div className={"user_datum_container"}>
            <div className={"user_datum"}>
              <p>Discovery Radius (Miles)</p>
              <p>{this.props.current_user.discovery_radius}</p>
            </div>
            <div className={"bottom_border"}></div>
          </div>
        </div>
      </div>
    );
  }
});
