var translator = require('../lib/roman-translator.js');

exports.index = function(req, res) {
  res.render('index', { title: 'Roman Number Translator' })
};

exports.toDecimal = function(req, res) {
    console.log('received:' + req.body.number);
    try {
        var decimal = translator.toDecimal(req.body.number);
        console.log('sending:' + decimal);
        res.send(decimal.toString());
    } catch (err) {
        res.send(err);
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
        res.send(err);
    }
};