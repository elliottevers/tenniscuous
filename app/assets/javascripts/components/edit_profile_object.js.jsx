window.EditProfileObject = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function () {

    return {
      profile_description: this.props.edit_current_user.profile_description,
      gender: this.props.edit_current_user.gender,
      genders_sought: this.props.edit_current_user.genders_sought,
      rating: this.props.edit_current_user.rating,
      ratings_sought: this.props.edit_current_user.ratings_sought,
      MensSingles: false,
      WomensSingles: false,
      MensDoubles: false,
      WomensDoubles: false,
      MixedDoubles: false
    };
  },

  componentDidUpdate: function () {
    var m = (this.props.edit_current_user.genders_sought.indexOf("Men's Singles") > -1);
    var w = (this.props.edit_current_user.genders_sought.indexOf("Women's Singles") > -1);
    var mm = (this.props.edit_current_user.genders_sought.indexOf("Men's Doubles") > -1);
    var ww = (this.props.edit_current_user.genders_sought.indexOf("Women's Doubles") > -1);
    var mw = (this.props.edit_current_user.genders_sought.indexOf("Mixed Doubles") > -1);
    if (
      this.state.MensSingles != m ||
      this.state.WomensSingles != w ||
      this.state.MensDoubles != mm ||
      this.state.WomensDoubles != ww ||
      this.state.MixedDoubles != mw
    ) {
      this.setState({
        MensSingles: m,
        WomensSingles: w,
        MensDoubles: mm,
        WomensDoubles: ww,
        MixedDoubles: mw
      });
    }
  },


  handleClick: function (event) {
    console.log(event.target);
    console.log(event.target.className);
  },

  updateUser: function (event) {
    event.preventDefault();
    var user = {};
    Object.keys(this.state).forEach(function (key) {
      user[key] = this.state[key];
    }.bind(this))
    user.id = this.props.edit_current_user.id;
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
    $("#ratings").slider({value: this.props.edit_current_user.rating});
    $("#ratings_sought").slider({ id: "ratings_sought_slider", min: 1, max: 7, range: true, value: [1, 7] });
    $("#discovery_radius").slider({ id: "radius", min: 0, max: 20, value: 10 });
    return (
      <div>

      <Button bsStyle="info" onClick={this.updateUser}>Done Editting</Button>

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
          <label onChange= {this.handleClick}  className="btn btn-primary">
            <input className="mens_singles" checked={this.state.MensSingles}  type="checkbox"> Men's Singles </input>
          </label>
          <label className="btn btn-primary">
            <input className="womens_singles" checked={this.state.WomensSingles} onChange= {this.handleClick} type="checkbox"> Women's Singles </input>
          </label>
          <label className="btn btn-primary">
            <input className="mens_doubles" checked={this.state.MensDoubles} onChange= {this.handleClick} type="checkbox"> Men's Doubles </input>
          </label>
          <label className="btn btn-primary" >
            <input className="womens_doubles" checked={this.state.WomensDoubles} onChange= {this.handleClick} type="checkbox"> Women's Doubles </input>
          </label>
          <label className="btn btn-primary">
            <input className="mixed_doubles" checked={this.state.MixedDoubles} onChange= {this.handleClick} type="checkbox"> Mixed Doubles </input>
          </label>
        </div>

        <input onChange={this.handleRatingChange} id="rating" data-slider-id='NTRP' type="text" data-slider-min="1" data-slider-max="7" data-slider-step=".5"/><br/>

        <input id="ratings_sought" type="text" className="span2" value="" data-slider-min="1" data-slider-max="7" data-slider-step=".5" data-slider-value="[1,7]"/><br/>

        <input id="discovery_radius" type="text"/><br/>

      </div>
    );
  }

});
