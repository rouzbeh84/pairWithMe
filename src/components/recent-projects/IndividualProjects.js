var React = require('react');
var Router= require('react-router');
var Route = Router.Route;
var Link = Router.Link;
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
			partner1: '',
			partner2: '',
		};
	},

	componentDidMount: function() {
		// sets value to info in database
		var params = this.context.router.getCurrentParams();
		$.getJSON('/recentProjects/' + params.id  , function(data){
			this.setState({
				name: data.projectName,
				github: data.githubLink,
				description: data.description,
				tools: data.tools,
				learn: data.learned,
				partner1: data.projectowner[0].username,
				partner2: data.projectowner[1].username
			});
		}.bind(this));
	},

	render: function(){
		var space = "   |   ";
		var profile1 = "/profile/"+this.state.partner1
		var profile2 = "/profile/"+this.state.partner2
		return (
			<div>
				<div className="row">
	 				<div className="form-group col-xs-12 col-sm-8">
	 					<label>Title</label>
						  <p className="bordered-box"> {this.state.name} </p>
	 				</div>
	 			</div>
				<div className="row">
					<div className="form-group col-xs-12 col-sm-8">
					  <label>GitHubLink</label>
						  <div className="bordered-box">
						    <a href={this.state.github}>Projects Github</a>
						  </div>
					</div>
				</div>
				<div className="row">
					<div className="form-group col-xs-12 col-sm-8">
					  <label>Description</label>
					    <p className="bordered-box" row='3'>{this.state.description}</p>
					</div>
				</div>
				<div className="row">
					<div className="form-group col-xs-12 col-sm-8">
				    <label>Tools Used</label>
		  	    <p className="bordered-box">{this.state.tools}</p>
					</div>
				</div>
				<div className="row">
					 <div className="form-group col-xs-12 col-sm-8">
					   <label>What we learned</label>
					   <p className="bordered-box">{this.state.learn}</p>
					 </div>
				</div>
				<div className="row">
					 <div className="form-group col-xs-12 col-sm-8">
					   <label>Authors</label><br/>
						   <div className="bordered-box">
									<Link to={profile1}><strong>{this.state.partner1}{space}</strong></Link>
									<Link to={profile2}><strong>{this.state.partner2}</strong></Link>
								</div>
					 </div>
				</div>
      </div>
		);
	},
});
module.exports = IndividualProjects;
