var React = require('react');
var IndividualProjects = React.createClass({
	contextTypes: {
	router: React.PropTypes.func.isRequired
	},


	getInitialState: function() {
		return {
			name: '',
			github: '',
			description: '',
			tools: '',
			learn: '',
			partner: ''
		};
	},
	componentDidMount: function() {
		var params = this.context.router.getCurrentParams();
		console.log(params);
		$.getJSON('/recentProjects/' + params.id  , function(data){

			console.log(data);
			this.setState({
				name: data.projectName,
				github: data.githubLink,
				description: data.description,
				tools: data.tools,
				learn: data.learn,
				partner: data.partner
			});
		}.bind(this));
	},
	render: function(){
		return (
			<div>
				<div className="row">
	 				<div className="form-group col-xs-12 col-sm-8">
	 					<label>Title</label>
						  <p className="bordered"> {this.state.name} </p>
	 				</div>
	 			</div>
				<div className="row">
					<div className="form-group col-xs-12 col-sm-8">
					  <label>GitHubLink</label>
					    <p className="bordered"> {this.state.github} </p>
					</div>
				</div>
				<div className="row">
					<div className="form-group col-xs-12 col-sm-8">
					  <label>Description</label>
					    <p className="bordered" row='3'>{this.state.description}</p>
					</div>
				</div>
				<div className="row">
					<div className="form-group col-xs-12 col-sm-8">
				    <label>Tools Used</label>
		  	    <p className="bordered">{this.state.tools}</p>
					</div>
				</div>
				<div className="row">
					 <div className="form-group col-xs-12 col-sm-8">
					   <label>What we learned</label>
					   <p className="bordered">{this.state.learn}</p>
					 </div>
				</div>
				<div className="row">
					 <div className="form-group col-xs-12 col-sm-8">
					   <label>Partners User Name</label>
					   <p className="bordered">{this.state.partner}</p>
					 </div>
				</div>
      </div>
		);
	},
});
module.exports = IndividualProjects;