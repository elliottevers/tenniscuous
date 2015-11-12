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

  toggleButton: function(event){
    $target = $(event.target);
    if ($target.attr('id') === 'clicked') {
      $target.attr('id', 'not-clicked');
    } else if ($target.attr('id') === 'not-clicked'){
      $target.attr('id', 'clicked');
    }
    this.handleChange(event);
  },


  render: function() {
    var ratingsSought = [this.state.ratings_sought[0],this.state.ratings_sought[1]];
    var ratings_sought_array = "[" + this.state.ratings_sought[0].toString() + "," + this.state.ratings_sought[1].toString() + "]";

    var Input = ReactBootstrap.Input;
    var Button = ReactBootstrap.Button;
    var Image = ReactBootstrap.Image;
    var Grid = ReactBootstrap.Grid;
    var Row = ReactBootstrap.Row;
    var Col = ReactBootstrap.Col;

    var mens_singles_state = "";
    if (this.state.MensSingles) {
      mens_singles_state = "clicked";
    } else {
      mens_singles_state = "not-clicked";
    }
    var womens_singles_state = "";
    if (this.state.WomensSingles) {
      womens_singles_state = "clicked";
    } else {
      womens_singles_state = "not-clicked";
    }
    var mens_doubles_state = "";
    if (this.state.MensDoubles) {
      mens_doubles_state = "clicked";
    } else {
      mens_doubles_state = "not-clicked";
    }
    var womens_doubles_state = "";
    if (this.state.WomensDoubles) {
      womens_doubles_state = "clicked";
    } else {
      womens_doubles_state = "not-clicked";
    }
    var mixed_doubles_state = "";
    if (this.state.MixedDoubles) {
      mixed_doubles_state = "clicked";
    } else {
      mixed_doubles_state = "not-clicked";
    }

    return (
      <div>
       <Grid>
         <div id={"editWrapper"}>
             <Button bsStyle="info" onClick={this.updateUser} id={"goToProfileButton"}>Done Editting</Button>
             <Image src={this.state.profile_picture_url} id={"editProfilePicture"}></Image>
             <Button bsStyle="primary" onClick={this.uploadPicture} id={"changeProfilePicture"}>Change Profile Picture</Button>
          </div>
          <Row>
            <Input
              type="textarea"
              value={this.state.profile_description}
              placeholder={this.props.edit_current_user.profile_description}
              onChange={this.handleDescriptionChange} />
          </Row>
          <Row>
            <Input type="select" ref="select" onChange={this.handleGenderChange} value={this.state.gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </Input>
          </Row>
          <Row>
            <Col xs={2}>
              <div id={mens_singles_state} className={"mens_singles"} onClick={this.toggleButton}><p>test</p></div>
            </Col>
            <Col xs={2}>
              <div id={womens_singles_state} className={"womens_singles"} onClick={this.toggleButton}><p>test</p></div>
            </Col>
            <Col xs={2}>
              <div id={mens_doubles_state} className={"mens_doubles"} onClick={this.toggleButton}><p>test</p></div>
            </Col>
            <Col xs={2}>
              <div id={womens_doubles_state} className={"womens_doubles"} onClick={this.toggleButton}><p>test</p></div>
            </Col>
            <Col xs={2}>
              <div id={mixed_doubles_state} className={"mixed_doubles"} onClick={this.toggleButton}><p>test</p></div>
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
              <span id="NTRP">My NTRP Level: <span id="ratingSliderVal">{this.state.rating}</span></span><br/>
            </Col>
          </Row>
          <Row>
            <Col xs={4} xsOffset={4}>
              <input onChange={this.handleRatingChange} id="rating" data-slider-id="NTRP" type="text" data-slider-value={this.state.rating} data-slider-min={1} data-slider-max={7} data-slider-step={.5}/>
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
              <span id="NTRP">NTRP Levels Sought: <span id="ratings_soughtSliderVal">{this.state.ratings_sought[0] + '-' + this.state.ratings_sought[1]}</span></span><br/>
            </Col>
          </Row>
          <Row>
            <Col xs={4} xsOffset={4}>
              <input id="ratings_sought" data-slider-id={"ratings_sought_"} ype="text" className="span2" value="" data-slider-min={1} data-slider-max={7} data-slider-step={.5} data-slider-value={ratings_sought_array}/>
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
              <span id="inMiles">Miles: <span id="discovery_radiusSliderVal">{this.state.discovery_radius}</span></span>
            </Col>
          </Row>
          <Row>
            <Col xs={4} xsOffset={4}>
              <input id="discovery_radius" data-slider-id={"discovery_radius_"} type="text" data-slider-min={0} data-slider-max={25} data-slider-step={1} data-slider-value={this.state.discovery_radius}/>
            </Col>
          </Row>
        </Grid>
        </div>
    );
  }

});
