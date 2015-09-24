var React = require('react');
var Resources = React.createClass({
	// links to resources we found helpful
	render: function(){
		return(
			<div>
				<h3>Resources for Pair Programming</h3>
				<div className="bordered">
					<div className='row'>
						<a href="https://www.versionone.com/agile-101/agile-software-programming-best-practices/pair-programming/">What Pair Programming is</a>
					</div>
					<div className='row'>
						<a href="http://remotepairprogramming.com/">Remote Pairing guide</a>
					</div>
					<div className='row'>
						<a href="http://cafe.elharo.com/programming/why-pair-programming-works/">Why Pair Program</a>
					</div>
				</div>
			</div>
			);
	}

});
module.exports = Resources;
