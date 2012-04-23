function RomanConverter() {
    this.roman_numbers = {
        I: { value: 1, max_times: 3, regexp: /I/gi, before: ['V', 'X'] },
        V: { value: 5, max_times: 1, regexp: /V/gi, before: null },
        X: { value: 10, max_times: 3, regexp: /X/gi, before: ['L', 'C'] },
        L: { value: 50, max_times: 1, regexp: /L/gi, before: null },
        C: { value: 100, max_times: 3, regexp: /C/gi, before: ['D', 'M'] },
        D: { value: 500, max_times: 1, regexp: /D/gi, before: null },
        M: { value: 1000, max_times: 3, regexp: /M/gi, before: null }
    };
}

RomanConverter.prototype.toDecimal = function(roman) {
    var decimal = 0;
    var previousRoman = null;
    
    if(!roman) 
    	throw { 
    		name: 'EmptyDecimalString', 
    		message: 'Empty string' 
    	};
    	//throw new Error('Empty string');
    
    roman = roman.toUpperCase();
    for (var i = 0; i < roman.length; i++) {
        var char = roman.charAt(i);
        var roman_number = this.roman_numbers[char];
        if (roman_number && roman_number.value) {
            var matches = roman.match(roman_number.regexp);
            if (matches.length > roman_number.max_times)
            	throw { 
            		name: 'ExceededMaximumNumberOfTimes', 
            		arguments: { char: char, max_times: roman_number.max_times },
            		message: 'The character \'' + char + '\' can only be used a maximum of ' + roman_number.max_times + ' time(s)' 
            	};
                
            if (previousRoman && roman_number.value > previousRoman.value) {
                if (previousRoman.before.indexOf(char) >= 0) {
                    decimal += (roman_number.value - (2 * previousRoman.value));
                } else {
                	throw { 
	            		name: 'MisplacedCharacter', 
	            		arguments: { char: char, position: (i+1) },
	            		message: 'Misplaced character \'' + char + '\' in position ' + (i+1) 
	            	};
                }
            } else {
                decimal += roman_number.value;
            }
            
            previousRoman = roman_number;
        } else {
            throw { 
        		name: 'CharacterInvalidPosition', 
        		arguments: { char: char, position: (i+1) },
        		message: 'Character \'' + char + '\' in position ' + (i+1) + ' isn\'t a valid one' 
        	};
        }
    }
    
    if (decimal > 3888)
    	throw { 
    		name: 'ExceededMaximumValue', 
    		message: 'Regular roman numbers can only go to a maximum of MMMDCCCLXXXVIII (3888)' 
    	};
    
    return decimal;
};
RomanConverter.prototype.toRoman = function(decimal) {
    throw { 
		name: 'NotImplemented', 
		message: 'To be implemented' 
	};
};

module.exports = new RomanConverter();