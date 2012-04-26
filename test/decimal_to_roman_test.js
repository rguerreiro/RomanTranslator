var converter = require('../lib/roman-converter.js'),
    base = require('./common.js');

exports["translator initialization"] = function(test){
    test.notEqual(converter, null);
    test.done();
};

exports["empty decimal number"] = function(test){
    test.throws(function() {
        converter.toRoman('');
    }, /No number provided/);
    test.done();
};

exports["empty decimal number with nothing"] = function(test){
    test.throws(function() {
        converter.toRoman();
    }, /No number provided/);
    test.done();
};

exports["empty decimal number with null"] = function(test){
    test.throws(function() {
        converter.toRoman();
    }, /No number provided/);
    test.done();
};

exports["not a number"] = function(test){
	test.throws(function() {
		converter.toRoman('xxx');
	}, /xxx isn't a valid number/);
	test.done();
};

exports["negative number"] = function(test){
	test.throws(function() {
		converter.toRoman(-100);
	}, /Number must be greater than 0/);
	test.done();
};

exports["zero"] = function(test){
	test.throws(function() {
		converter.toRoman(0);
	}, /Number must be greater than 0/);
	test.done();
};

exports["more than 3888"] = function(test){
	test.throws(function() {
		converter.toRoman(4000);
	}, /Number must be lower than 3888/);
	test.done();
};

exports["passing number as string"] = function(test){
	test.equal(converter.toRoman('1000'), 'M');
	test.done();
};

exports["passing number as number"] = function(test){
	test.equal(converter.toRoman(1000), 'M');
	test.done();
};

exports["passing 900"] = function(test){
	test.equal(converter.toRoman(900), 'CM');
	test.done();
};

exports["passing 400"] = function(test){
	test.equal(converter.toRoman(400), 'CD');
	test.done();
};

exports["passing 90"] = function(test){
	test.equal(converter.toRoman(90), 'XC');
	test.done();
};

exports["passing 40"] = function(test){
	test.equal(converter.toRoman(40), 'XL');
	test.done();
};

exports["passing 9"] = function(test){
	test.equal(converter.toRoman(9), 'IX');
	test.done();
};

exports["passing 4"] = function(test){
	test.equal(converter.toRoman(4), 'IV');
	test.done();
};

exports["lowest possible"] = function(test){
	test.equal(converter.toRoman(1), 'I');
	test.done();
};

exports["highest possible"] = function(test){
	test.equal(converter.toRoman(3888), 'MMMDCCCLXXXVIII');
	test.done();
};

base.run_test(__filename);