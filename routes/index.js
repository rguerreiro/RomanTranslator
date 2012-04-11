var translator = require('../lib/roman-translator.js'),
    utils = require('../lib/utils.js');

exports.index = function(req, res) {
    res.render('index', { title: 'Roman Number Translator', version: utils.getVersion(), env: process.env.NODE_ENV || 'development' })
};

exports.toDecimal = function(req, res) {
    console.log('received:' + req.body.number);
    var decimal = translator.toDecimal(req.body.number);
    console.log('sending:' + decimal);
    res.send(decimal.toString());
};

exports.fromDecimal = function(req, res) {
    console.log('received:' + req.body.number);
    var roman = translator.toRoman(req.body.number);
    console.log('sending:' + roman);
    res.send(roman.toString());
};