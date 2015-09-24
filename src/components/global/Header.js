var React = require('react');
var Router= require('react-router');
var LoginStatus = require('./LoginStatus.js')
var Route = Router.Route;
var Link = Router.Link;
var LoginStatus = require('./LoginStatus.js');
var Header = React.createClass({
	/* this renders a link to all of our routes */
	"getInitialState": function(){
		return {active: window.location.pathname}
	},
	"active": function(event){
		this.setState({
			active: $(event.target).attr('href')
		});
	},
	render: function(){
	
		var profile = <a href="/auth/github/" >Profile</a>;
		var search = <a href="/auth/github/" >Search</a>;;
		if(document.cookie){
			search = <Link to="search" onClick={this.active}>Search</Link>;
			profile = <Link to="profile" onClick={this.active}>Profile</Link>;
						
		}
		return (
			<div className="header clearfix row header">
				<h3>
				<Link to="/" className="pull-left pair" onClick={this.active}>Pair With Me</Link>
				</h3>
      <nav>
        <ul className="nav nav-pills pull-right">
						<li role="presentation" className={this.state.active === '/' ? 'active' : ''}>
							<Link to="/" onClick={this.active}>Home</Link>
						</li>
						<li role="presentation" className={this.state.active === '/guide' ? 'active' : ''}>
							<Link to="guide" onClick={this.active}>Guide</Link>
						</li>
						<li role="presentation" className={this.state.active === '/profile' ? 'active' : ''}>
						{profile}
						</li>
						<li role="presentation" className={this.state.active === '/recentProjects' ? 'active' : ''}>
							<Link to="recentprojects" onClick={this.active}>Projects</Link>
						</li>
						<li role="presentation" className={this.state.active === '/search' ? 'active' : ''}>
						{search}
						</li>


						<LoginStatus />
        </ul>
      </nav>
    </div>
		);
	},
});
module.exports = Header;
