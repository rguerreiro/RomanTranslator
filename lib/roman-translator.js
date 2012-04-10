function RomanTranslator() {
    this.roman_numbers = {
        I: { value: 1, max_times: 3 },
        V: { value: 5, max_times: 1 },
        X: { value: 10, max_times: 3 },
        L: { value: 50, max_times: 1 },
        C: { value: 100, max_times: 3 },
        D: { value: 500, max_times: 1 },
        M: { value: 1000, max_times: 3 }
    };
}

RomanTranslator.prototype.toDecimal = function(roman) {
    var decimal = 0;
    var previousValue = 0;
    for (var i = 0; i < roman.length; i++) {
        var char = roman.charAt(i);
        var roman_number = this.roman_numbers[char];
        if (roman_number && roman_number.value) {
            if (roman_number.value > previousValue) {
                decimal += (roman_number.value - (2 * previousValue));
            } else {
                decimal += roman_number.value;
            }
            previousValue = roman_number.value;
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