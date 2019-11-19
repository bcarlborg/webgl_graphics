var express = require('express'),
app = express(),
port = process.env.PORT || 4000;

console.log('your site is running at port: ', port);
app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/src/lib'));
app.use(express.static(__dirname + '/src/media'));
app.use(express.static(__dirname + '/src/js'));
app.use(express.static(__dirname + '/src/js/helpers'));
app.use(express.static(__dirname + '/src/js/games/orbits'));
app.use(express.static(__dirname + '/src/js/games'));
app.use(express.static(__dirname + '/src/js/shaders'));
app.use(express.static(__dirname + '/src/js/shaders/procedural'));

app.listen(port);
