var React = require('react');
var Users = require('./Users.js')
var SearchResults = React.createClass({
	render: function() {
		var userData = this.props.data.map(function(element, index){
				return(<Users picture={element.person.githubProfileImage} name={element.person.username} github={element.person.githubProfileURL} email={element.person.email} key={index}/>)
		});
		return (
			<div>
				<hr />
				{userData}
			</div>
		);
	},
});
module.exports = SearchResults;
