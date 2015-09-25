var React = require('react');
var Router= require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var UserInfo = require("../profile/UserInfo.js");
var ProfileForm = require("./ProfileForm");
var ProfileEditor = React.createClass({

	render: function() {
		return (
			<div className="bordered-box">
			<h3 className="text-center">Profile Editor</h3>
				<div>
					<a href={this.props.picture}></a>
				</div>
				<div className="row">
					<div className="col-xs-12 text-center">
						<p>
						<Link to="profile" className="edit-profile-btn"> Profile </Link>
						</p>
					</div>
				</div>
				<ProfileForm/>
			</div>
		);
	}

});

module.exports = ProfileEditor;