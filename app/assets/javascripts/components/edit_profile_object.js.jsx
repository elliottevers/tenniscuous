window.EditProfileObject = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function () {
    return {
      profile_description: this.props.current_user.profile_description,
      gender: this.props.current_user.gender,
      genders_sought: this.props.current_user.genders_sought,
      rating: this.props.current_user.rating,
      ratings_sought: this.props.current_user.ratings_sought
    };
  },

  updateUser: function (event) {
    event.preventDefault();
    var user = {};
    Object.keys(this.state).forEach(function (key) {
      user[key] = this.state[key];
    }.bind(this))
    user.id = this.props.current_user.id;
    ApiUtil.updateUser(user, function () {
      this.history.pushState(null, "/profile", {});
    }.bind(this));
  },

  handleDescriptionChange: function(event) {
    this.setState({profile_description: event.target.value});
  },

  handleGenderChange: function(event) {
    this.setState({gender: event.target.value});
  },

  handleGendersSoughtChange: function(event) {

  },

  handleRatingChange: function(event) {
    this.setState({rating: event.target.value});
  },

  handleRatingsSoughtChange: function(event) {
    this.setState({ratings_sought: event.target.value});
  },

  render: function() {
    var Input = ReactBootstrap.Input;
    var Button = ReactBootstrap.Button;
    $('#rating').slider({
    	formatter: function(value) {
    		return 'Current value: ' + value;
    	}
    });
    $("#ratings").slider({});
    $("#ratings_sought").slider({ id: "ratings_sought_slider", min: 1, max: 7, range: true, value: [1, 7] });
    $("#discovery_radius").slider({ id: "radius", min: 0, max: 20, value: 10 });
    return (
      <div>
      <Button bsStyle="info" onClick={this.updateUser}>Done Editting</Button>
      <Input
        type="textarea"
        value={this.state.profile_description}
        placeholder={this.props.current_user.profile_description}
        onChange={this.handleDescriptionChange} />
        <Input type="select" ref="select" onChange={this.handleGenderChange} value={this.state.gender}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
        </Input>
        <div class="btn-group" data-toggle="buttons">
          <label className="btn btn-primary active">
            <input type="checkbox" autocomplete="off" checked> Men's Singles  </input>
          </label>
          <label className="btn btn-primary">
            <input type="checkbox" autocomplete="off"> Women's Singles </input>
          </label>
          <label className="btn btn-primary">
            <input type="checkbox" autocomplete="off"> Men's Doubles </input>
          </label>
          <label className="btn btn-primary">
            <input type="checkbox" autocomplete="off"> Women's Doubles </input>
          </label>
          <label className="btn btn-primary">
            <input type="checkbox" autocomplete="off"> Mixed Doubles </input>
          </label>
        </div>
        <input id="rating" data-slider-id='NTRP' type="text" data-slider-min="1" data-slider-max="7" data-slider-step=".5" data-slider-value="1"/><br/>
        <input id="ratings_sought" type="text" className="span2" value="" data-slider-min="1" data-slider-max="7" data-slider-step=".5" data-slider-value="[1,7]"/><br/>
        <input id="discovery_radius" type="text"/><br/>
      </div>
    );
  }

});
