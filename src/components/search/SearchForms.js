var React = require('react');
var Select = require('react-select');
var SearchResults = require('./SearchResults.js');

var partner = [
	{ value: 'Collaborator', label: 'Collaborator' },
	{ value: 'Student', label: 'Student' },
	{ value: 'Teacher', label: 'Teacher'}
];
var SearchForms = React.createClass({
	getInitialState: function () {
    return {
      tags: [],
      partner: '',
      learn: '',
      data: [],
      noResults: ''
    }
  },
  onChangePartner: function(value) {
    this.setState({
      partner: value
    })
  },
  onChangeTag: function(value) {
    this.setState({
      learn: value
    })
  },
  componentDidMount: function() {
    $.getJSON('/tags', function(result) {
      result = result.map(function (element, index) {
        return ({value: element.tagName, label: element.tagName})
      })
       this.setState({tags: result});
    }.bind(this))
  },
  handle: function (e) {
    e.preventDefault();
    var that = this;
    var sendObject = {};
    sendObject.partner = this.state.partner;
    sendObject.tag = this.state.learn;
    $.ajax({
      url: '/search',
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify(sendObject),
// error right now
      success: function(results) {
      	if(results.length === 0){
      		that.setState({noResults:'Sorry, No Partners Found :`('});
      		that.setState({data:[]});
      	} else {
      	that.setState({noResults:''});
        that.setState({data:results});
        }
      },

      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return(
			<div className="row">
				<div className="col-xs-12">
	      <div className="col-xs-10 col-xs-offset-1 bordered">
	      <h3 className="text-center">Search For Partners</h3>
					<div className="row">
						<div className="col-xs-8 col-xs-offset-2">
							<form id="searchForm" encType="multipart/form-data" onSubmit={this.handle} className="form-inline">
								<div className="row">
									<div className="col-xs-12 col-sm-12">
	                  <p className="text-center">Select the Type of Partner you are Looking for</p>

										<Select id="partner"
											name="form-field-name"
											value={this.state.partner}
											options={partner}
											onChange = {this.onChangePartner}
										/>
									</div>
	              </div>
	              <div className="row">
									<div className="col-xs-12 col-sm-12">
	                  <p className="text-center">Select the Skills You Want to Use In This Project</p>
										<Select
											name="form-field-name"
											value={this.state.learn}
											options={this.state.tags}
											onChange = {this.onChangeTag}
											multi={false}
										/>
									</div>
								</div>
								<div className="row">
									<div className="col-xs-12 col-sm-6 col-sm-offset-3">
										<p>
											<input type="submit" value="SUBMIT"  name="submit" className="btn btn-primary btn-lg btn-block" />
										</p>
	            </div>
								</div>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
		        <SearchResults data={this.state.data}/>
            <div className="text-center">
              <p className="noresults">
		            {this.state.noResults}
              </p>
            </div>
		      </div>
					</div>
				</div>
			</div>
		</div>
  )}
});
module.exports = SearchForms;
