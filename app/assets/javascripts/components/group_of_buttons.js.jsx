var GroupOfButtons = React.createClass({

  getInitialState: function(){
    return {
    MensSingles: this.props.MensSingles,
    WomensSingles: this.props.WomensSingles,
    MensDoubles: this.props.MensDoubles,
    WomensDoubles: this.props.WomensDoubles,
    MixedDoubles: this.props.MixedDoubles
    };
  },


  handleChange: function(event){
    this.props.handleChange(event.target);
  },

  render: function(){
    console.log(this.props);
    return (
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
      );
    }
})
