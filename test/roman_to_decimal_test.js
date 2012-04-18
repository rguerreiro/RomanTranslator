var translator = require('../lib/roman-translator.js'),
    base = require('./common.js');

exports["translator initialization"] = function(test){
    test.notEqual(translator, null);
    test.done();
};

exports["empty roman number"] = function(test) {
    test.throws(function() {
        translator.toDecimal('');
    }, /Empty string/);
    test.done();
};

exports["null roman number"] = function(test) {
    test.throws(function() {
        translator.toDecimal(null);
    }, /Empty string/);
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

exports["lowered roman numbers"] = function(test){
    test.equal(translator.toDecimal('mdclxvi'), 1666);
    test.done();
};

exports["mixed case roman numbers"] = function(test){
    test.equal(translator.toDecimal('MDclxVI'), 1666);
    test.done();
};

exports["max allowed M"] = function(test) {
    test.equal(translator.toDecimal('MMM'), 3000);
    test.done();
};

exports["more than max allowed M"] = function(test) {
    test.throws(function() {
        translator.toDecimal('MMMM');
    }, /The character 'M' can only be used a maximum of 3 time\(s\)/);
    test.done();
};

exports["max allowed D"] = function(test) {
    test.equal(translator.toDecimal('D'), 500);
    test.done();
};

exports["more than max allowed D"] = function(test) {
    test.throws(function() {
        translator.toDecimal('DD');
    }, /The character 'D' can only be used a maximum of 1 time\(s\)/);
    test.done();
};

exports["max allowed C"] = function(test) {
    test.equal(translator.toDecimal('CCC'), 300);
    test.done();
};

exports["more than max allowed C"] = function(test) {
    test.throws(function() {
        translator.toDecimal('CCCC');
    }, /The character 'C' can only be used a maximum of 3 time\(s\)/);
    test.done();
};

exports["max allowed L"] = function(test) {
    test.equal(translator.toDecimal('L'), 50);
    test.done();
};

exports["more than max allowed L"] = function(test) {
    test.throws(function() {
        translator.toDecimal('LL');
    }, /The character 'L' can only be used a maximum of 1 time\(s\)/);
    test.done();
};

exports["max allowed X"] = function(test) {
    test.equal(translator.toDecimal('XXX'), 30);
    test.done();
};

exports["more than max allowed X"] = function(test) {
    test.throws(function() {
        translator.toDecimal('XXXX');
    }, /The character 'X' can only be used a maximum of 3 time\(s\)/);
    test.done();
};

exports["max allowed V"] = function(test) {
    test.equal(translator.toDecimal('V'), 5);
    test.done();
};

exports["more than max allowed V"] = function(test) {
    test.throws(function() {
        translator.toDecimal('VV');
    }, /The character 'V' can only be used a maximum of 1 time\(s\)/);
    test.done();
};

exports["max allowed I"] = function(test) {
    test.equal(translator.toDecimal('III'), 3);
    test.done();
};

exports["more than max allowed I"] = function(test) {
    test.throws(function() {
        translator.toDecimal('IIII');
    }, /The character 'I' can only be used a maximum of 3 time\(s\)/);
    test.done();
};

exports["invalid character"] = function(test){
    test.throws(function() {
        translator.toDecimal('A');
    }, /Character 'A' in position 1 isn't a valid one/);
    test.done();
};

exports["invalid character at the end"] = function(test){
    test.throws(function() {
        translator.toDecimal('MMXXIIA');
    }, /Character 'A' in position 7 isn't a valid one/);
    test.done();
};

exports["characters in wrong position"] = function(test){
    test.throws(function() {
        translator.toDecimal('MMIM');
    }, /Misplaced character 'M' in position 4/);
    test.done();
};

base.run_test(__filename);