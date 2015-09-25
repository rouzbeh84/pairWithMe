var React = require('react');
var Questions = require("./Questions.js");
var Resources = require("./Resources.js");
var Guide = React.createClass({
	render: function(){
		// this is the parent function for guide page
		return (
			<div>
				<h1>
					Guide Page
				</h1>
				<p>
					To start using this site you need to have a GitHub account to sign in. Once signed in it will create your profiles information based on your GitHub account and return you to your brand new profile page. Click the profile editor button to enter in if you want to be a student, partner or teacher. You should also enter in what skills you have and what skills you are looking to learn on this page.
				</p>
				<p>
					Once you have your profile how you like it, head on over to the search page to look for what you want to use on your next project and what kind of partner you are looking for. After hitting the search button we will find the very best matches for you to begin your pair programming journey!
				</p>
				<Questions/>
				<Resources/>
			</div>
		);
	},
});
module.exports= Guide;
