
var path = require('path');

exports.load=(req, res)=>{
	console.log(__dirname, "/view/serve.html");
  res.sendFile(path.join(__dirname, "../../../view/serve.html"));
}
