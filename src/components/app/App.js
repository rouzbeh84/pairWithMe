var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Header = require('./../global/Header.js');
var Footer = require('./../global/Footer.js');
// this is are parent component that hosts the route
var App = React.createClass({
	render: function() {
    return (
      <div>
					<Header/>
					<RouteHandler/>
      </div>
    );
	}
});
module.exports = App;
