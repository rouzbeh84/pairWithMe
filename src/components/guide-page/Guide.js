var React = require('react');
var HowTo = require("./HowTo.js");
var Questions = require("./Questions.js");
var Guide = React.createClass({
	render: function(){
		// this is the parent function for guide page
		return (
			<div>
				<h1>
					Guide Page
				</h1>
				<HowTo/>
				<Questions/>
			</div>
		);
	},
});
module.exports= Guide;
