var translator = require('../lib/roman-translator.js'),
    base = require('./common.js');

exports["translator initialization"] = function(test){
    test.notEqual(translator, null);
    test.done();
};

exports["lowest roman number"] = function(test){
    test.equal(translator.toDecimal('I'), 1);
    test.done();
};

exports["highest roman number"] = function(test){
    test.equal(translator.toDecimal('MMMDCCCLXXXVIII'), 3888);
    test.done();
};

exports["using all roman numbers once"] = function(test){
    test.equal(translator.toDecimal('MDCLXVI'), 1666);
    test.done();
};

exports["higher than 3888"] = function(test){
    test.throws(function() {
        translator.toDecimal('MMMM');
    }, /Regular roman numbers can only go a maximum of 3888 or MMMDCCCLXXXVIII/);
    test.done();
};

exports["invalid character"] = function(test){
    test.throws(function() {
        translator.toDecimal('A');
    }, /Character 'A' in position 0 isn't a valid one/);
    test.done();
};

exports["invalid character at the end"] = function(test){
    test.throws(function() {
        translator.toDecimal('MMXXIIA');
    }, /Character 'A' in position 6 isn't a valid one/);
    test.done();
};

base.run_test(__filename);