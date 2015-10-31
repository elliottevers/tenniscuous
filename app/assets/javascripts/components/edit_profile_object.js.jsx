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
      this.history.pushState(null, "/discovery_queue", {});
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
    $('#ex1').slider({
    	formatter: function(value) {
    		return 'Current value: ' + value;
    	}
    });
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
        <input id="ex1" data-slider-id='ex1Slider' type="text" data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="14"/>
      </div>
    );
  }

});
