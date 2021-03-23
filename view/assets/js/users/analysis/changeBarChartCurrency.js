define(function(require, exports, module) {
	return changeFinanlcialsByCurrency = (event, token, link, currency)=>{
			const {getRequest} = require("request");
			const {loading} = require("../../loading");
			const {loginForm} = require("../../logins");
			const {getBarChart} = require("./barChart");
			
				const y = new Date().getFullYear();
			getBarChart({token:token, _id:''}, link, currency, y);

	}
});