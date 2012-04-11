function RomanTranslator() {
    this.roman_numbers = {
        I: { value: 1, max_times: 3, regexp: /I/gi },
        V: { value: 5, max_times: 1, regexp: /V/gi },
        X: { value: 10, max_times: 3, regexp: /X/gi },
        L: { value: 50, max_times: 1, regexp: /L/gi },
        C: { value: 100, max_times: 3, regexp: /C/gi },
        D: { value: 500, max_times: 1, regexp: /D/gi },
        M: { value: 1000, max_times: 3, regexp: /M/gi }
    };
}

RomanTranslator.prototype.toDecimal = function(roman) {
    var decimal = 0;
    var previousValue = 0;
    
    if(!roman) throw new Error('Empty string');
    
    roman = roman.toUpperCase();
    for (var i = 0; i < roman.length; i++) {
        var char = roman.charAt(i);
        var roman_number = this.roman_numbers[char];
        if (roman_number && roman_number.value) {
            var matches = roman.match(roman_number.regexp);
            if (matches.length > roman_number.max_times)
                throw new Error('The character \'' + char + '\' can only be used a maximum of ' + roman_number.max_times + ' time(s)');
                
            if (roman_number.value > previousValue) {
                decimal += (roman_number.value - (2 * previousValue));
            } else {
                decimal += roman_number.value;
            }
            
            previousValue = roman_number.value;
        } else {
            throw new Error('Character \'' + char + '\' in position ' + (i+1) + ' isn\'t a valid one');
        }
    }
    
    if (decimal > 3888)
        throw new Error('Regular roman numbers can only go to a maximum of MMMDCCCLXXXVIII (3888)');
    
    return decimal;
};
RomanTranslator.prototype.toRoman = function(decimal) {
    throw new Error('To be implemented');
};

module.exports = new RomanTranslator();