var converter = require('../lib/roman-converter.js'),
    base = require('./common.js');

exports["translator initialization"] = function(test){
    test.notEqual(converter, null);
    test.done();
};

exports["empty roman number"] = function(test) {
    test.throws(function() {
        converter.toDecimal('');
    }, /Empty string/);
    test.done();
};

exports["null roman number"] = function(test) {
    test.throws(function() {
        converter.toDecimal(null);
    }, /Empty string/);
    test.done();
};

exports["lowest roman number"] = function(test){
    test.equal(converter.toDecimal('I'), 1);
    test.done();
};

exports["highest roman number"] = function(test){
    test.equal(converter.toDecimal('MMMDCCCLXXXVIII'), 3888);
    test.done();
};

exports["using all roman numbers once"] = function(test){
    test.equal(converter.toDecimal('MDCLXVI'), 1666);
    test.done();
};

exports["lowered roman numbers"] = function(test){
    test.equal(converter.toDecimal('mdclxvi'), 1666);
    test.done();
};

exports["mixed case roman numbers"] = function(test){
    test.equal(converter.toDecimal('MDclxVI'), 1666);
    test.done();
};

exports["max allowed M"] = function(test) {
    test.equal(converter.toDecimal('MMM'), 3000);
    test.done();
};

exports["more than max allowed M"] = function(test) {
    test.throws(function() {
        converter.toDecimal('MMMM');
    }, ///The character 'M' can only be used a maximum of 3 time\(s\)/);
    function(err) {
    	if (err.arguments.char === 'M')
      		return true;
    });
    test.done();
};

exports["max allowed D"] = function(test) {
    test.equal(converter.toDecimal('D'), 500);
    test.done();
};

exports["more than max allowed D"] = function(test) {
    test.throws(function() {
        converter.toDecimal('DD');
    }, /The character 'D' can only be used a maximum of 1 time\(s\)/);
    test.done();
};

exports["max allowed C"] = function(test) {
    test.equal(converter.toDecimal('CCC'), 300);
    test.done();
};

exports["more than max allowed C"] = function(test) {
    test.throws(function() {
        converter.toDecimal('CCCC');
    }, /The character 'C' can only be used a maximum of 3 time\(s\)/);
    test.done();
};

exports["max allowed L"] = function(test) {
    test.equal(converter.toDecimal('L'), 50);
    test.done();
};

exports["more than max allowed L"] = function(test) {
    test.throws(function() {
        converter.toDecimal('LL');
    }, /The character 'L' can only be used a maximum of 1 time\(s\)/);
    test.done();
};

exports["max allowed X"] = function(test) {
    test.equal(converter.toDecimal('XXX'), 30);
    test.done();
};

exports["more than max allowed X"] = function(test) {
    test.throws(function() {
        converter.toDecimal('XXXX');
    }, /The character 'X' can only be used a maximum of 3 time\(s\)/);
    test.done();
};

exports["max allowed V"] = function(test) {
    test.equal(converter.toDecimal('V'), 5);
    test.done();
};

exports["more than max allowed V"] = function(test) {
    test.throws(function() {
        converter.toDecimal('VV');
    }, /The character 'V' can only be used a maximum of 1 time\(s\)/);
    test.done();
};

exports["max allowed I"] = function(test) {
    test.equal(converter.toDecimal('III'), 3);
    test.done();
};

exports["more than max allowed I"] = function(test) {
    test.throws(function() {
        converter.toDecimal('IIII');
    }, /The character 'I' can only be used a maximum of 3 time\(s\)/);
    test.done();
};

exports["invalid character"] = function(test){
    test.throws(function() {
        converter.toDecimal('A');
    }, /Character 'A' in position 1 isn't a valid one/);
    test.done();
};

exports["invalid character at the end"] = function(test){
    test.throws(function() {
        converter.toDecimal('MMXXIIA');
    }, /Character 'A' in position 7 isn't a valid one/);
    test.done();
};

exports["characters in wrong position"] = function(test){
    test.throws(function() {
        converter.toDecimal('MMIM');
    }, /Misplaced character 'M' in position 4/);
    test.done();
};

exports["IV is a valid roman number"] = function(test){
    test.equal(converter.toDecimal('IV'), 4);
    test.done();
};

exports["XL is a valid roman number"] = function(test){
    test.equal(converter.toDecimal('XL'), 40);
    test.done();
};

exports["CD is a valid roman number"] = function(test){
    test.equal(converter.toDecimal('CD'), 400);
    test.done();
};

base.run_test(__filename);