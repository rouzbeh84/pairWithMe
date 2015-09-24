var React = require('react');
var LoginStatus = React.createClass({
// this allows the function to logout by clearing out cookies or logging in with oauth.
	getInitialState: function() {
		return {
			loginStatus: <a href="/auth/github/" className="login-link"><img src="./img/GitHub-Mark-120px-plus.png" alt="Sign in with GitHub" className="login-button"/></a>,
		};
	},
	componentDidMount: function() {
		if (document.cookie) {
			this.setState({loginStatus: <a href="/logout" onChange={this.logout}>Logout</a>});
		}
	},
	render: function(){
		return(
  		<li role="presentation" className="logout-button">
				{this.state.loginStatus}
			</li>
		);

	}
});
module.exports = LoginStatus;
