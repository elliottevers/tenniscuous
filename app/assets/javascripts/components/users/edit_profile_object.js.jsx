window.EditProfileObject = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function () {

    return {
      profile_picture_url: this.props.edit_current_user.profile_picture_url,
      profile_description: this.props.edit_current_user.profile_description,
      gender: this.props.edit_current_user.gender,
      genders_sought: this.props.edit_current_user.genders_sought,
      rating: this.props.edit_current_user.rating,
      ratings_sought: this.props.edit_current_user.ratings_sought,
      discovery_radius: this.props.edit_current_user.discovery_radius,
      MensSingles: (this.props.edit_current_user.genders_sought.indexOf("Men's Singles") > -1),
      WomensSingles: (this.props.edit_current_user.genders_sought.indexOf("Women's Singles") > -1),
      MensDoubles: (this.props.edit_current_user.genders_sought.indexOf("Men's Doubles") > -1),
      WomensDoubles: (this.props.edit_current_user.genders_sought.indexOf("Women's Doubles") > -1),
      MixedDoubles: (this.props.edit_current_user.genders_sought.indexOf("Mixed Doubles") > -1)
    };
  },

  componentDidMount: function(){

      var that = this;

      $("#rating").slider();

      $("#ratings_sought").slider({id: "ratings_sought"});

      $("#discovery_radius").slider();

      $("#rating").on("slide", function(slideEvt) {
        that.setState({rating: slideEvt.value})
        $("#ratingSliderVal").text(slideEvt.value);
      });

      $("#ratings_sought").on("slide", function(slideEvt) {
        that.setState({ratings_sought: slideEvt.value})
        $("#ratings_soughtSliderVal").text(slideEvt.value[0] + '-' + slideEvt.value[1]);
      });

      $("#discovery_radius").on("slide", function(slideEvt) {
        that.setState({discovery_radius: slideEvt.value})
        $("#discovery_radiusSliderVal").text(slideEvt.value);
      });

  },

  handleChange: function (event) {
    target = event.target;
    var name_of_class = target.className;
    if (name_of_class === "mens_singles") {
      this.setState({MensSingles: !this.state.MensSingles});
    } else if (name_of_class === "womens_singles") {
      this.setState({WomensSingles: !this.state.WomensSingles});
    } else if (name_of_class === "mens_doubles") {
      this.setState({MensDoubles: !this.state.MensDoubles});
    } else if (name_of_class === "womens_doubles") {
      this.setState({WomensDoubles: !this.state.WomensDoubles});
    } else if (name_of_class === "mixed_doubles") {
      this.setState({MixedDoubles: !this.state.MixedDoubles});
    }
  },

  updateUser: function (event) {
    event.preventDefault();
    var user = {};
    var genders_sought = [];
    Object.keys(this.state).forEach(function (key) {
      user[key] = this.state[key];
    }.bind(this));
    if (this.state.MensSingles){
      genders_sought.push("Men's Singles");
    }
    if (this.state.WomensSingles){
      genders_sought.push("Women's Singles");
    }
    if (this.state.MensDoubles){
      genders_sought.push("Men's Doubles");
    }
    if (this.state.WomensDoubles){
      genders_sought.push("Women's Doubles");
    }
    if (this.state.MixedDoubles){
      genders_sought.push("Mixed Doubles");
    }
    delete user['MensSingles'];
    delete user['WomensSingles'];
    delete user['MensDoubles'];
    delete user['WomensDoubles'];
    delete user['MixedDoubles'];
    user.genders_sought = genders_sought;
    user.id = this.props.edit_current_user.id;


    ApiUtil.updateUser(user, function () {
      this.history.pushState(null, "/profile", {});
    }.bind(this));
  },

  uploadPicture: function(event){
    event.preventDefault();
    var that = this;
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function(error, result){
      var data = result[0];
      that.setState({profile_picture_url: data.url});
    });
  },

  handleDescriptionChange: function(event) {
    this.setState({profile_description: event.target.value});
  },

  handleGenderChange: function(event) {
    this.setState({gender: event.target.value});
  },
  
  render: function() {
    var ratingsSought = [this.state.ratings_sought[0],this.state.ratings_sought[1]];
    var ratings_sought_array = "[" + this.state.ratings_sought[0].toString() + "," + this.state.ratings_sought[1].toString() + "]";

    var Input = ReactBootstrap.Input;
    var Button = ReactBootstrap.Button;
    var Image = ReactBootstrap.Image;


    return (
      <div>

        <Button bsStyle="info" onClick={this.updateUser}>Done Editting</Button>

        <Image src={this.state.profile_picture_url} className={"img-circle"} alt={"Cinque Terre"} width={250} height={250}></Image>
        <Button bsStyle="primary" onClick={this.uploadPicture}>Change Profile Picture</Button>
        <Input
          type="textarea"
          value={this.state.profile_description}
          placeholder={this.props.edit_current_user.profile_description}
          onChange={this.handleDescriptionChange} />

          <Input type="select" ref="select" onChange={this.handleGenderChange} value={this.props.edit_current_user.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
          </Input>

          <div className="btn-group">
            <label className="btn btn-primary">
              <input className="mens_singles" checked={this.state.MensSingles} onChange= {this.handleChange} type="checkbox"> Men's Singles </input>
            </label>
            <label className="btn btn-primary">
              <input className="womens_singles" checked={this.state.WomensSingles} onChange= {this.handleChange} type="checkbox"> Women's Singles </input>
            </label>
            <label className="btn btn-primary">
              <input className="mens_doubles" checked={this.state.MensDoubles} onChange= {this.handleChange} type="checkbox"> Men's Doubles </input>
            </label>
            <label className="btn btn-primary" >
              <input className="womens_doubles" checked={this.state.WomensDoubles} onChange= {this.handleChange} type="checkbox"> Women's Doubles </input>
            </label>
            <label className="btn btn-primary">
              <input className="mixed_doubles" checked={this.state.MixedDoubles} onChange= {this.handleChange} type="checkbox"> Mixed Doubles </input>
            </label>
          </div>

          <input onChange={this.handleRatingChange} id="rating" data-slider-id="NTRP" type="text" data-slider-value={this.state.rating} data-slider-min={1} data-slider-max={7} data-slider-step={.5}/><br/>

          <span id="NTRP">NTRP Level: <span id="ratingSliderVal">{this.state.rating}</span></span><br/>

          <input id="ratings_sought" type="text" className="span2" value="" data-slider-min={1} data-slider-max={7} data-slider-step={.5} data-slider-value={ratings_sought_array}/><br/>

          <span id="NTRP">NTRP Levels Sought: <span id="ratings_soughtSliderVal">{this.state.ratings_sought[0] + '-' + this.state.ratings_sought[1]}</span></span><br/>

          <input id="discovery_radius" type="text" data-slider-min={0} data-slider-max={20} data-slider-step={1} data-slider-value={this.state.discovery_radius}/><br/>

          <span id="inMiles">Miles: <span id="discovery_radiusSliderVal">{this.state.discovery_radius}</span></span>

        </div>
    );
  }

});
