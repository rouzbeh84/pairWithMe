var React = require('react');
var HomeHero = require('./HomeHero.js');
var Projects = require('../recent-projects/Projects.js');
var Home = React.createClass({
	getInitialState: function() {
		return {
			projects: []
		};
	},
	componentDidMount: function() {
		// lists the first 3 projects added
		$.getJSON('/api/projects', function(data){
			this.setState({projects:data.splice(0,3)})
		}.bind(this));
	},
	render: function() {
		// maps out the project info to properly display each item in the array of projects by sending to Projects component
		// slices the characers to 17 characters to keep size management 
		var projectList = this.state.projects.map(function(element, index){
			return (<Projects className="col-xs-12 col-md-4" title={element.projectName.slice(0,17)} description={element.description.slice(0,17)} tools={element.tools.slice(0,17)} route={element.id} key={index}/>)
		});
		return (
		<div>
			<div className="row">
				<HomeHero/>
			</div>
			<div className="row">
				{projectList}
			</div>
		</div>
		);
	},
});
module.exports = Home;
