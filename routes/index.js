var translator = require('../lib/roman-translator.js'),
    utils = require('../lib/utils.js');

exports.index = function(req, res) {
  res.render('index', { title: 'Roman Number Translator', version: utils.getVersion() })
};

exports.toDecimal = function(req, res) {
    console.log('received:' + req.body.number);
    try {
        var decimal = translator.toDecimal(req.body.number);
        console.log('sending:' + decimal);
        res.send(decimal.toString());
    } catch (err) {
        console.log('error:' + err.message);
        res.send(err.message, 500);
    }
};

exports.fromDecimal = function(req, res) {
    console.log('received:' + req.body.number);
    try
    {
        var roman = translator.toRoman(req.body.number);
        console.log('sending:' + roman);
        res.send(roman.toString());
    } catch (err) {
        console.log('error:' + err.message);
        res.send(err.message, 500);
    }
};