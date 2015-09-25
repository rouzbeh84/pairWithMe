var React = require('react');
var Users = React.createClass({
	getInitialState: function() {
		return {
			picture: '',
			name: '',
			github: '',
			email: ''
		};
	},
	handle: function() {
		window.location.pathname = '/profile/'+ this.props.name
	},
	render: function() {
		var plus = "mailto:"+this.props.email
		return (
			<div className="col-xs-12 col-sm-4 col-md-3">
				<div className="bordered-box text-center">
					<img src={this.props.picture} className="img-rounded profile-pic"/>
					<p>{this.props.name}<br/>
					<a href={plus}>Email</a><br/>
					<a href={this.props.github}>GitHub</a>
					</p>
					<button className="project-page-btn" onClick={this.handle}>Profile Page</button>
				</div>
			</div>
		);
	},
});
module.exports = Users;
