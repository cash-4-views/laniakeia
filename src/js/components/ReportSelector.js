var React = require("react");

var ReportHeader = React.createClass({

	onSubmit: function(e) {
		"use strict";

		e.preventDefault();

		var selectedDate = React.findDOMNode(this.refs.reportselect).value;
		console.log(selectedDate);
		this.props.selectReport(selectedDate);
	},

	render: function() {
		"use strict";

		var datesList = [],
				dates 		= this.props.dates;

		// Value should actually just be date, but currently workaround b/c database stored
		// as yYYYY_MM rather than _YYYY_MM
		for(var date in dates) {
			datesList.push( <option key={dates[date]} value={dates[date]}>{dates[date]}</option> );
		}

		return (
			<h3 className="sub-header">Select a report
			  <div className="row placeholders">
			    <form className="form-horizontal" onSubmit={this.onSubmit}>
			      <fieldset>
			        <div className="form-group">
			          <label className="col-md-2 control-label">Report</label>
			          <div className="col-md-3">
			            <select id="YYYY_MM" ref="reportselect" className="form-control input-md">
			              {datesList}
			            </select>
			          </div>
			          <div className="col-md-1">
			            <button id="submit" type="submit" className="btn btn-primary" onSubmit={this.onSubmit}>Select</button>
			          </div>
			        </div>
			      </fieldset>
			    </form>
			  </div>
			</h3>
			);
	}

});

module.exports = ReportHeader;