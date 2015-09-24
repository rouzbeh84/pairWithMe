var React = require('react');
var Select = require('react-select');

var ProjectForm = React.createClass({
	getInitialState: function() {
		return {
			name: '',
			github: '',
			description: '',
			tools: '',
			learn: '',
			partner: '',
			options: []
		}

	},
	onChangeName: function() {
   this.setState({name: event.target.value});
	},
	onChangeGithub: function(value) {
	 this.setState({github: event.target.value});
	},
	onChangeDescription: function() {
	 this.setState({description: event.target.value});
	},
	onChangeTools: function() {
	 this.setState({tools: event.target.value});
	},
	onChangeLearn: function(value) {
	 this.setState({learn: event.target.value});
	},
	onChangePartner: function(value) {
		console.log(value)
	 this.setState({partner: ''+value+''});
	},
	// sets a new state to send based on input
	componentDidMount: function() {
		// gathers all users in database for easy partner selection
    $.getJSON('/api/users', function(result) {
      result = result.map(function (element, index) {
        return ({value: element.username, label: element.username})
      })
       this.setState({options: result});
    }.bind(this))
  },
  handle: function (e) {
  	// sets key values to send to database
    e.preventDefault();
    var that = this;
    var sendObject = {};
	    sendObject.name = this.state.name;
	    sendObject.github = this.state.github;
	    sendObject.description = this.state.description;
	    sendObject.tools = this.state.tools;
	    sendObject.learn = this.state.learn;
	    sendObject.partner = this.state.partner;
    $.ajax({
      url: '/createProject',
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify(sendObject),
      success: function(data) {
        window.location.pathname = '/project/'+data;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
	render: function() {
		return (
 			<div>
 				<form id="projectForm" encType="multipart/form-data" onSubmit={this.handle}>
 					<div className="row">
						<div className="form-group col-xs-8 col-xs-offset-2 col-sm-8 text-center">
							<label htmlFor="title">Title</label>
							<textarea required pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{1,100}$" type="text" className="form-control" value={this.state.name}  placeholder="Title" onChange={this.onChangeName} id="title"/>
						</div>
 					</div>
					<div className="row">
						<div className="form-group col-xs-8 col-xs-offset-2 col-sm-8 text-center">
							<label htmlFor="ghlink">GitHubLink</label>
							<input  type="text" className="form-control" value={this.state.github} placeholder="ghlink" onChange={this.onChangeGithub} id="GitHubLink"/>
						</div>
					</div>
					<div className="row">
						<div className="form-group col-xs-8 col-xs-offset-2 col-sm-8 text-center">
						  <label htmlFor="description">Description</label>
						  <textarea required pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{50,500}$" className="form-control" rows="3" value={this.state.description} placeholder="Description" onChange={this.onChangeDescription} id="description"></textarea>
						</div>
					</div>
					<div className="row">
						<div className="form-group col-xs-8 col-xs-offset-2 col-sm-8 text-center">
						  <label htmlFor="tools">Tools Used</label>
						  <textarea required pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{1,500}$" type="text" className="form-control" value={this.state.tools} placeholder="Tools Used" onChange={this.onChangeTools} id="tools"/>
						</div>
					</div>
					<div className="row">
						<div className="form-group col-xs-8 col-xs-offset-2 col-sm-8 text-center">
						  <label htmlFor="learns">What we learned</label>
						  <textarea required pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{1,500}$" className="form-control" row="3" value={this.state.learn} placeholder="What we Learned" onChange={this.onChangeLearn} id="learns"></textarea>
						</div>
					</div>
					<div className="row">
						<div className="form-group col-xs-8 col-xs-offset-2 col-sm-8 text-center">
							<label>Paired Partner</label>
							<Select name="form-field-name" placeholder={this.state.partner} required pattern="^[a-zA-Z][a-zA-Z0-9\.]{1,50}$" options={this.state.options}  onChange={ this.onChangePartner} className="text-left" />
						</div>
					</div>
					<div className="row">
						<div className="col-xs-6 col-xs-offset-2 col-sm-6 col-sm-offset-3">
						  <input type="submit" value="SUBMIT" name="submit" className="btn btn-primary btn-lg btn-block" />
						</div>
					</div>
				</form>
			</div>
		);
	}

});

module.exports = ProjectForm;
