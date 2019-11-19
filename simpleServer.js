var express = require('express'),
app = express(),
port = process.env.PORT || 4000;
// console.log('your site is running at port: ', port);
app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/src/lib'));
app.use(express.static(__dirname + '/src/media'));
app.use(express.static(__dirname + '/src/js'));

app.listen(port);
