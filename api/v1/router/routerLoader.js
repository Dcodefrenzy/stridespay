
var path = require('path');

exports.load=(req, res)=>{
  res.sendFile(path.join(__dirname+"../../../../view/serve.html"));
}