var converter = require('../lib/roman-converter.js');

exports.index = function(req, res) {
	console.log('rendering index view');
	
	// http://stackoverflow.com/questions/511144/how-to-instruct-web-browsers-not-to-cache-pages
	res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.render('index');
};

exports.throwError = function(req, res) {
    throw new Error('This is an error');
};

exports.toDecimal = function(req, res) {
    console.log('received:' + req.body.number);
    var decimal = converter.toDecimal(req.body.number);
    console.log('sending:' + decimal);
    res.send(decimal.toString());
};

exports.fromDecimal = function(req, res) {
    console.log('received:' + req.body.number);
    var roman = converter.toRoman(req.body.number);
    console.log('sending:' + roman);
    res.send(roman.toString());
};