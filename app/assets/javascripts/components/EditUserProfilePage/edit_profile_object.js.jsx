var Formats = ["mens_singles",
               "womens_singles",
               "mens_doubles",
               "womens_doubles",
               "mixed_doubles"];

var Genders = ["male", "female"];

var formatStrings = ["Men's Singles",
                     "Women's Singles",
                     "Men's Doubles",
                     "Women's Doubles",
                     "Mixed Doubles"
                    ];

var genderStrings = ["Male", "Female"];

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
      formatsSought: [(this.props.edit_current_user.genders_sought.indexOf("Men's Singles") > -1),
                      (this.props.edit_current_user.genders_sought.indexOf("Women's Singles") > -1),
                      (this.props.edit_current_user.genders_sought.indexOf("Men's Doubles") > -1),
                      (this.props.edit_current_user.genders_sought.indexOf("Women's Doubles") > -1),
                      (this.props.edit_current_user.genders_sought.indexOf("Mixed Doubles") > -1)],
      possibleGenders: [(this.props.edit_current_user.gender === "Male"),
                      (this.props.edit_current_user.gender === "Female")]
    };
  },

  componentDidMount: function(){

      React.initializeTouchEvents(true);

      var that = this;

      var updateSlider = document.getElementById('slider-update');

    	var updateSliderValue = document.getElementById('slider-update-value');

    	settings = {
    		range: {
    			'min': 1,
    			'max': 7
    		},
        connect: "lower",
    		start: that.state.rating,
    		margin: 1,
    		step: .5
    	};

      function bindValue () {
      	updateSlider.noUiSlider.on('update', function( values, handle ) {
      		updateSliderValue.innerHTML = Math.round(values[handle]*10)/10;
          that.setState({rating:  Math.round(values[handle]*10)/10});
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
      		valueInput.innerHTML = (values[handle]*10)/10;
          new_range[1] = (values[handle]*10)/10;
      	} else {
      		valueSpan.innerHTML = (values[handle]*10)/10;
          new_range[0] = (values[handle]*10)/10;
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
        connect: "lower",
        start: that.state.discovery_radius,
        margin: 1,
        step: 1
      };

      function bindDiscoveryValue ( ) {
        discovery.noUiSlider.on('update', function( values, handle ) {
          discoveryValue.innerHTML = (values[handle]*100)/100;
          that.setState({discovery_radius: (values[handle]*100)/100});
        });
      }

      noUiSlider.create(discovery, settings);

      bindDiscoveryValue();

  },

  componentWillMount: function(){
    React.initializeTouchEvents(true);
  },

  handleFormatChange: function (event) {
    var name_of_class = $(event.target).parent().attr('class');
    var this_class = this;
    Formats.forEach(function(format){
      if (name_of_class === format) {
      newFormatsSought = this_class.state.formatsSought;
      newFormatsSought[this.indexOf(format)] = !newFormatsSought[this.indexOf(format)];
        this_class.setState(
          {formatsSought: newFormatsSought}
        );
      }
    }, Formats)
  },

  updateUser: function (event) {
    event.preventDefault();
    var user = {};
    var genders_sought = [];

    Object.keys(this.state).forEach(function (key) {
      user[key] = this.state[key];
    }.bind(this));

    var formatsSought = this.state.formatsSought;

    for (i = 0; i < formatsSought.length; i++) {
      if (formatsSought[i]) {
        genders_sought.push(formatStrings[i]);
      }
    }

    formatStrings.forEach(function(formatString){
      delete user[formatString];
    });

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
    var name_of_class = $(event.target).parent().attr('class');
    var this_class = this;
    Genders.forEach(function(gender){
      if (name_of_class === gender) {
      newGenders = this_class.state.possibleGenders;
        if ((newGenders[0] === false) && (newGenders[1] === false)) {
          newGenders[this.indexOf(gender)] = (name_of_class === gender);
        } else {
          newGenders[this.indexOf(gender)] = !newGenders[this.indexOf(gender)];
          newGenders[1 - this.indexOf(gender)] = !newGenders[1 - this.indexOf(gender)];
        }
        this_class.setState(
          {possibleGenders: newGenders,
          gender: gender.charAt(0).toUpperCase() + gender.slice(1)}
        );
      }
    }, Genders)
  },

  toggleButton: function(event){
    $target = $(event.target);
    $parent = $target.parent();
    if ($parent.attr('id') === 'clicked') {
      $parent.attr('id', 'not-clicked');
    } else if ($parent.attr('id') === 'not-clicked'){
      $parent.attr('id', 'clicked');
    }
    if (Formats.indexOf($parent.attr('class')) > -1) {
      this.handleFormatChange(event);
    } else {
      this.handleGenderChange(event);
    }
  },


  render: function() {
    this_class = this;
    return (
       <div>
         <div id={"editWrapper"}>
             <button onClick={this.updateUser} id={"goToProfileButton"}>Done Editting</button>
             <img src={this.state.profile_picture_url} id={"editProfilePicture"}></img>
             <button onClick={this.uploadPicture} id={"changeProfilePicture"}>Change Profile Picture</button>
          </div>

          <div id={"textarea-container"}>
            <textarea value={this.state.profile_description} placeholder={this.props.edit_current_user.profile_description} onChange={this.handleDescriptionChange}></textarea>
          </div>

          <div id={"gender-container"}>
            <p>Gender</p>
            {Genders.map(function(gender){
              if (this_class.state.possibleGenders[Genders.indexOf(gender)]) {
                return (<div id={"clicked"} className={gender}><p onClick={this_class.toggleButton}>{genderStrings[Genders.indexOf(gender)]}</p></div>);
              } else {
                return (<div id={"not-clicked"} className={gender}><p onClick={this_class.toggleButton}>{genderStrings[Genders.indexOf(gender)]}</p></div>);
              }
            })}
            <p>Formats Sought</p>
            {Formats.map(function(format){
              if (this_class.state.formatsSought[Formats.indexOf(format)]) {
                return (<div id={"clicked"} className={format}><p onClick={this_class.toggleButton}>{formatStrings[Formats.indexOf(format)]}</p></div>);
              } else {
                return (<div id={"not-clicked"} className={format}><p onClick={this_class.toggleButton}>{formatStrings[Formats.indexOf(format)]}</p></div>);
              }
            })}
          </div>
          <div id={"slider-container"}>
            <p> NTRP Rating </p>
            <div id={"slider-update"}></div>
            <div id={"slider-update-value"}></div>
            <p> NTRP Ratings Sought </p>
            <div id={"range"}></div>
            <div id={"range_value_wrapper"}>
              <div id={"value-span"}></div>
              <p> - </p>
              <div id={"value-input"}></div>
            </div>
            <p> Discovery Radius (Miles)</p>
            <div id={"discovery_radius_update"}></div>
            <div id={"discovery_radius_update_value"}></div>
          </div>
        </div>
    );
  }

});
