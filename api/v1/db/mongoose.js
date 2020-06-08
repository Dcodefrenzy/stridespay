let mongoose = require("mongoose");
mongoose.promise = global.promise;


mongoose.connect('mongodb://localhost/stridespay', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


module.exports = {mongoose};