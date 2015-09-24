var React = require('react');
var Projects = require('./Projects.js');
var RecentProjects = React.createClass({
	getInitialState: function() {
		return {
		projects: []
		};
	},
	componentDidMount: function() {
		// returns all projects for project page
		$.getJSON('/api/projects', function(data){
			this.setState({projects:data})
		}.bind(this));
	},
	render: function() {
		var projectList = this.state.projects.map(function(element, index){
			return (<Projects className="col-xs-12" title={element.projectName} description={element.description} tools={element.tools} route={element.id} key={index}/>)
		});

		return(
			<div>
				{projectList}	
			</div>
			);
	},
});
module.exports = RecentProjects;