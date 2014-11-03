var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var http = require('http');
var https = require('https');
var server = http.createServer(app);

app.use('/js', express.static(__dirname + '/js'));
app.use('/styles', express.static(__dirname + '/styles'));
app.use('/public', express.static(__dirname + '/public'));

app.all('/*', function (req, res, next) {
    //used on refresh and for pretty urls
    res.sendFile('index.html', {root: __dirname});
});

server.listen(port);
console.log('I can hear your thoughts! ' + port);