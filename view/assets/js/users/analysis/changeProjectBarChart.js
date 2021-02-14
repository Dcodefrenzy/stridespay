define(function(require, exports, module) {
	return changeProject = (event, token, link, year)=>{
			const {getRequest} = require("request");
			const {loading} = require("../../loading");
			const {loginForm} = require("../../logins");
			const {getProjectBarChart} = require("./projectBarChart");
				//console.log(year)
				const y = new Date(year).getFullYear();
			getProjectBarChart({token:token, _id:''}, link, y);

	}
});