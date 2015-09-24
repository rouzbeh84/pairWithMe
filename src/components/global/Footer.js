// var React = require('react');
// var Router= require('react-router');
// var Route = Router.Route;
// var Link = Router.Link;
// var Footer = React.createClass({
// 	"getInitialState": function(){
// 		return {active: window.location.pathname}
// 	},
// 	"active": function(event){
// 		this.setState({
// 			active: $(event.target).attr('href')
// 		});
// 	},
// 	render: function(){
// 	return (
// 			<div className="header clearfix row">
//       <nav className="navbar navbar-default navbar-fixed-bottom">
//       <div className="container">
//         <ul className="nav nav-pills pull-left">
// 						<li role="presentation" className={this.state.active === '/' ? 'active' : ''}>
// 							<Link to="/" onClick={this.active}>Home</Link>
// 						</li>
// 						<li role="presentation" className={this.state.active === '/guide' ? 'active' : ''}>
// 							<Link to="guide" onClick={this.active}>Guide</Link>
// 						</li>
// 						<li role="presentation" className={this.state.active === '/profile' ? 'active' : ''}>
// 							<Link to="profile" onClick={this.active}>Profile</Link>
// 						</li>

// 						<li role="presentation" className={this.state.active === '/recentProjects' ? 'active' : ''}>
// 							<Link to="recentprojects" onClick={this.active}>Recent Projects</Link>
// 						</li>

// 						<li role="presentation" className={this.state.active === '/search' ? 'active' : ''}>
// 							<Link to="search" onClick={this.active}>Search</Link>
// 						</li>
// 						<li role="presentation">
// 							<a href="/auth/github">GitHub Login</a>
// 						</li>
//         </ul>
//        </div>
//       </nav>
//       </div>

// 		);
// 	},
// });
// module.exports= Footer;
