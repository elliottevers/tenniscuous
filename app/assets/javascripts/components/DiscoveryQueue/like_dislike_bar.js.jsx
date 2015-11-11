window.LikeDislikeBar = React.createClass({

  handleReject: function(){
    if (typeof this.props.onChange === 'function') {
        this.props.onChange("reject");
    }
  },

  handleAccept: function(){
    if (typeof this.props.onChange === 'function') {
        this.props.onChange("accept");
    }
  },

  render: function() {
    var Grid = ReactBootstrap.Grid;
    var Row = ReactBootstrap.Row;
    var Col = ReactBootstrap.Col;
    return (
    <Grid>
      <Row>

            <div onClick={this.handleReject} id="swipe_dislike" className={'rate'}></div>
            <div onClick={this.handleAccept} id="swipe_like" className={'rate'}></div>

      </Row>
    </Grid>
    );
  }

});
