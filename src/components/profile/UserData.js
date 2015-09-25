var React = require('react');
var UserData = React.createClass({
	getInitialState: function() {
		return {
			knownTags: [],
			wantTags: [],
			teacher: '',
			collab: '',
			student: ''
		};
	},
	render: function() {

		return (
				<div className="row">
					<div className="col-xs-12">
						<div className="col-xs-10 col-xs-offset-1 user-type">
							<div className="col-xs-12 col-sm-4 text-center">
								<strong>{this.props.teacher}</strong>
							</div>
							<div className="col-xs-12 col-sm-4 text-center">
								<strong>{this.props.collab}</strong>
							</div>
							<div className="col-xs-12 col-sm-4 text-center">
								<strong>{this.props.student}</strong>
							</div>
						</div>
						<div className="col-xs-10 col-xs-offset-1 bordered-box">
							<strong>Skills Have: </strong>{this.props.knownTags}
						</div>
						<div className="col-xs-10 col-xs-offset-1 bordered-box">
							<strong>Skills Wanted: </strong>{this.props.wantTags}
						</div>
					</div>
				</div>

		);
	}
});
module.exports = UserData;
