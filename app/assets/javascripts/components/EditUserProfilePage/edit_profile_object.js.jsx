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

      var updateSlider = document.getElementById('slider-update');

    	var updateSliderValue = document.getElementById('slider-update-value');

    	settings = {
    		range: {
    			'min': 1,
    			'max': 7
    		},
    		start: that.state.rating,
    		margin: 1,
    		step: .5
    	};

      function bindValue () {
      	updateSlider.noUiSlider.on('update', function( values, handle ) {
      		updateSliderValue.innerHTML = values[handle];
          that.setState({rating: values[handle]});
      	});
      }

      noUiSlider.create(updateSlider, settings);

      bindValue();

      var slider = document.getElementById('range');

      noUiSlider.create(slider, {
      	start: [ that.state.ratings_sought[0], that.state.ratings_sought[1] ],
      	step: .5,
      	margin: .5,
      	connect: true,
      	orientation: 'horizontal',
      	behaviour: 'tap-drag',
      	range: {
      		'min': 1,
      		'max': 7
      	}
      });

      var valueInput = document.getElementById('value-input');
      var	valueSpan = document.getElementById('value-span');

      slider.noUiSlider.on('update', function( values, handle ) {
        var new_range = that.state.ratings_sought;
      	if ( handle ) {
      		valueInput.innerHTML = values[handle];
          new_range[1] = values[handle];
      	} else {
      		valueSpan.innerHTML = values[handle];
          new_range[0] = values[handle];
      	}
        that.setState({ratings_sought: new_range});
      });

      valueInput.addEventListener('change', function(){
      	slider.noUiSlider.set([null, this.value]);
      });

      var discovery = document.getElementById('discovery_radius_update');
      var discoveryValue = document.getElementById('discovery_radius_update_value');

      settings = {
        range: {
          'min': 1,
          'max': 50
        },
        start: that.state.discovery_radius,
        margin: 1,
        step: 1
      };

      function bindDiscoveryValue ( ) {
        discovery.noUiSlider.on('update', function( values, handle ) {
          discoveryValue.innerHTML = values[handle];
          that.setState({discovery_radius: values[handle]});
        });
      }

      noUiSlider.create(discovery, settings);

      bindDiscoveryValue();

  },

  handleChange: function (event) {
    var name_of_class = $(event.target).parent().attr('class');
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
    $parent = $target.parent();
    if ($parent.attr('id') === 'clicked') {
      $parent.attr('id', 'not-clicked');
    } else if ($parent.attr('id') === 'not-clicked'){
      $parent.attr('id', 'clicked');
    }
    this.handleChange(event);
  },


  render: function() {

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
         <div id={"editWrapper"}>
             <button onClick={this.updateUser} id={"goToProfileButton"}>Done Editting</button>
             <img src={this.state.profile_picture_url} id={"editProfilePicture"}></img>
             <button onClick={this.uploadPicture} id={"changeProfilePicture"}>Change Profile Picture</button>
          </div>

          <textarea value={this.state.profile_description} placeholder={this.props.edit_current_user.profile_description} onChange={this.handleDescriptionChange}></textarea>

          <select ref="select" onChange={this.handleGenderChange} value={this.state.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
          </select>

          <div id={mens_singles_state} className={"mens_singles"}><p onClick={this.toggleButton}>Men's Singles</p></div>
          <div id={womens_singles_state} className={"womens_singles"}><p onClick={this.toggleButton}>Women's Singles</p></div>
          <div id={mens_doubles_state} className={"mens_doubles"}><p onClick={this.toggleButton}>Men's Doubles</p></div>
          <div id={womens_doubles_state} className={"womens_doubles"}><p onClick={this.toggleButton}>Women's Doubles</p></div>
          <div id={mixed_doubles_state} className={"mixed_doubles"}><p onClick={this.toggleButton}>Mixed Doubles</p></div>

          <div id={"slider-update"}></div>
          <div id={"slider-update-value"}></div>
          <div id={"range"}></div>
          <div id={"value-span"}></div>
          <div id={"value-input"}></div>
          <div id={"discovery_radius_update"}></div>
          <div id={"discovery_radius_update_value"}></div>
        </div>
    );
  }

});
