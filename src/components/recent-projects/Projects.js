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
		return(
			<div className={this.props.className}>
				<div className="bordered">
				<p className="projects-text"><strong>Title: </strong>{this.props.title}</p>
				<p className="projects-text"><strong>Description: </strong>{this.props.description}</p>
				<p className="projects-text"><strong>Tools Used: </strong> {this.props.tools}</p>
				<p>
					<button className="project-page-btn" onClick={this.handle}>Project Path</button>
				</p>
			</div>
			</div>
			);

	},

});
module.exports=Projects;
