define(function (require, exports, module) {
		exports.loading=(id, style)=>{

				let newstyle = style === "display-none"?"display-none":"dsh-preloader bg-white";
				console.log(id)
				const body = document.getElementById("body");				
				const spinner = document.getElementById(id);
				
			spinner.className =newstyle;
		}
})