const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require('multer');
const cors = require("cors");
const morgan = require("morgan");
const api = require("./api/v1/api.js");
var path = require('path');
require('dotenv').config()
const loaderRouter = require("./api/v1/router/router.js");
const loadeAdminRouter = require("./api/v1/router/adminRouter.js");

const router = express.Router();

const coreOptions = {
	origin: "http://localhost:5858", 
	optionsSuccessStatus: 200
}

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(morgan('dev'));
app.use(cors(coreOptions));
 app.use(express.static("view"));
 app.use("/api/v1", api); 
 app.use("/users", loaderRouter);
 app.use("/admins", loadeAdminRouter);


/*app.get('/users/product/payment/:id', function(req,res){
  res.sendFile(path.join(__dirname, "/view/login.html"));
  //__dirname : It will resolve to your project folder.
});*/



app.post("/api/submit", function(req, res){
	console.log(req.body.name)
	res.status(200).send(req.body);
})







 app.listen(5858, function(){
    console.log("started at port 5858");
});

