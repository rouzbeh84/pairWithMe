var React = require('react');
var Projects = React.createClass({
	getInitialState: function() {
		return {
			title: '',
			descrition: '',
			tools: '',
			github: '',
			route: ''
		};
	},
	handle: function(){
		 window.location.pathname = '/project/'+ this.props.route
	},
	render: function() {
		console.log("props ~>", this.props.title);
		return(
			<div className={this.props.className}>
				<div className="bordered">
				<p><strong>Title: </strong>{this.props.title}</p>
				<p><strong>Description: </strong>{this.props.description}</p>
				<p><strong>Tools Used: </strong> {this.props.tools}</p>
				<button className="project-page-btn" onClick={this.handle}>Project Path</button>
			</div>
			</div>
			);

	},

});
module.exports=Projects;