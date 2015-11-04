$(function(){
  var root = document.getElementById('content');
  var RouteHandler = ReactRouter.RouteHandler;
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;

  var App = React.createClass({


    render: function(){
      return (
          <div>
            {this.props.children}
          </div>
      );
    }
  });
  var routes = (
      <Route path="/" component={App}>
      <IndexRoute component={LogInPage}/>
        <Route path="/create_account" component={CreateAccount} />
        <Route path="/profile" component={UserProfile} />
          <Route path="/profile/edit" component={EditUserProfile} />
        <Route path="/discovery_queue" component={DiscoveryQueue} />
          <Route path="/discovery_queue/:id" component={FellowUserProfile}/>
        <Route path="/matches" component={MatchesPage}/>
          <Route path="/matches/:id" component={ChatPage}/>
        <Route path="/account" component={LogOutPage}/>
      </Route>
  );
  React.render(<Router>{routes}</Router>, root);
});
