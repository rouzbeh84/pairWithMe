var React = require('react');
var UsersInfo = require('../profile/UserInfo.js');
var UsersData = require('../profile/UserData.js');
var Projects = require('../recent-projects/Projects.js');
var UsersProfile = React.createClass({
	contextTypes: {
		router: React.PropTypes.func.isRequired
	},
	getInitialState: function() {
		return {
			username : '',
			githubLink : '',
			picture: '',
			email: '',
			knownTags: [],
			wantTags: [],
			teacher: '',
			collab: '',
			student: '',
			projects: []
		};
	},
	componentDidMount: function() {
		// using param allows us to get the current value in the url for a specific route
		var params = this.context.router.getCurrentParams();
		$.getJSON('/api/profile/'+params.user, function(data){
			if(data.teacher) {
				var teach = "Teacher";
			}
			if(data.collaborator) {
				var collaborator = "Partner";
			}
			if(data.student) {
				var learn = "Student"
			}
			var known = data.known.map(function (element, index) {
				return (<div className="btn btn-xs tags">{element.tagName +" "}</div>);
			});
			var wanted = data.want.map( function (element,index) {
				return (<div className="btn btn-xs tags">{element.tagName +" "}</div>);
			});
			var ownedproject = data.ownedproject;
			this.setState({
				username: data.username,
				githubLink: data.githubProfileURL,
				picture: data.githubProfileImage,
				email: data.email,
				knownTags: known,
				wantTags: wanted,
				teacher: teach,
				collab: collaborator,
				student: learn,
				projects: ownedproject
			});
		}.bind(this));
	},
	render: function() {
		// allows us to open up an email upon clicking
		var plus = "mailto:"+this.state.email
		var otherProjs = this.state.projects.map(function(element, index){
			return(<Projects className="col-xs-12 col-sm-6 col-md-4" title={element.projectName.slice(0,17)} tools={element.tools.slice(0,17)} description={element.description.slice(0,17)} route={element.id} key={index}/>)
		})
		return (
			<div>
				<UsersInfo name={this.state.username} github={this.state.githubLink} picture={this.state.picture}/>
				<div className="text-center">
				<a href={plus}>Email</a><br/>
				</div>
				<UsersData knownTags={this.state.knownTags} wantTags={this.state.wantTags} teacher={this.state.teacher} collab={this.state.collab} student={this.state.student}/>
				{otherProjs}
			</div>
		);
	}

});

module.exports = UsersProfile;
