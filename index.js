var express = require('express')
var app = express.createServer();

var docroot = __dirname;
console.log('Serving files from ' + docroot);
app.use(express.static(docroot));
app.use(express.errorHandler({
	dumpExceptions : true,
	showStack : true
}));

app.listen(process.env.PORT || 8080);

