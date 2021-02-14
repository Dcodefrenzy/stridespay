define(function (require, exports, module) {
		exports.loading=(id, style)=>{

				let newstyle = style === "display-none"?"display-none":"fixed-top bg-background full-height";
				console.log(id)
				const body = document.getElementById("body");				
				const spinner = document.getElementById(id);
				
			spinner.className =newstyle;
		}
})