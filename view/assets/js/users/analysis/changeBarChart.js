define(function(require, exports, module) {
	return changeFinanlcials = (event, token, link, year)=>{
			const {getRequest} = require("request");
			const {loading} = require("../../loading");
			const {loginForm} = require("../../logins");
			const {getBarChart} = require("./barChart");
				console.log(year)
				const y = new Date(year).getFullYear();
			getBarChart({token:token, _id:''}, link, y);

	}
});