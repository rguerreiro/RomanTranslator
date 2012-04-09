function RomanTranslator() {
    this.roman_numbers = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };
}

RomanTranslator.prototype.toDecimal = function(roman) {
    var decimal = 0;
    for (var i = 0; i < roman.length; i++) {
        var value = this.roman_numbers[roman.charAt(i)];
        if(value) {
            decimal += value;
        }
    }
    
    return decimal;
};
RomanTranslator.prototype.toRoman = function(decimal) {
    return "To be implemented";
};

module.exports = new RomanTranslator();