var React = require('react');
var Resources = React.createClass({
	// links to resources we found helpful
	render: function(){
		return(
			<div>
				<h3>Resources for Pair Programming</h3>
					<div className='links'>
						<a href="https://www.versionone.com/agile-101/agile-software-programming-best-practices/pair-programming/">What Pair Programming is</a><hr/>
					</div>
					<div className='links'>
						<a href="http://remotepairprogramming.com/">Remote Pairing guide</a><hr/>
					</div>
					<div className='links'>
						<a href="http://cafe.elharo.com/programming/why-pair-programming-works/">Why Pair Program</a><hr/>
					</div>
				</div>
			);
	}

});
module.exports = Resources;

