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
    var previousValue = 0;
    for (var i = 0; i < roman.length; i++) {
        var char = roman.charAt(i);
        var value = this.roman_numbers[char];
        if (value) {
            if (value > previousValue) {
                decimal += (value - (2 * previousValue));
            } else {
                decimal += value;
            }
            previousValue = value;
        } else {
            throw new Error('Character \'' + char + '\' in position ' + i + ' isn\'t a valid one');
        }
    }
    
    if (decimal > 3888)
        throw new Error('Regular roman numbers can only go a maximum of 3888 or MMMDCCCLXXXVIII');
    
    return decimal;
};
RomanTranslator.prototype.toRoman = function(decimal) {
    return "To be implemented";
};

module.exports = new RomanTranslator();