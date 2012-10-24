function RomanConverter() {
    this.roman_numbers = {
    	M : { value: 1000, max_times: 3, regexp: /M/gi, before: null },
    	CM: { value: 900,  max_times: 1 }, // just t be used when converting from decimal to roman
    	D : { value: 500,  max_times: 1, regexp: /D/gi, before: null },
    	CD: { value: 400,  max_times: 1 }, // just t be used when converting from decimal to roman
        C : { value: 100,  max_times: 3, regexp: /C/gi, before: ['D', 'M'] },
        XC: { value: 90,   max_times: 1 }, // just t be used when converting from decimal to roman
        L : { value: 50,   max_times: 1, regexp: /L/gi, before: null },
        XL: { value: 40,   max_times: 1 }, // just t be used when converting from decimal to roman
        X : { value: 10,   max_times: 3, regexp: /X/gi, before: ['L', 'C'] },
        IX: { value: 9,    max_times: 1 }, // just t be used when converting from decimal to roman
        V : { value: 5,    max_times: 1, regexp: /V/gi, before: null },
        IV: { value: 4,    max_times: 1 }, // just t be used when converting from decimal to roman
        I : { value: 1,    max_times: 3, regexp: /I/gi, before: ['V', 'X'] }
    };
}

RomanConverter.prototype.toDecimal = function(roman) {
    var decimal = 0;
    var previousRoman = null;
    
    if(!roman) 
    	throw { 
    		name: 'EmptyRomanString', 
    		message: 'Empty string' 
    	};
    
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
                if (previousRoman.before && previousRoman.before.indexOf(char) >= 0) {
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
	var original = decimal;
	var roman = '';
	
	if(!decimal && decimal !== 0) 
    	throw { 
    		name: 'EmptyDecimalNumber', 
    		message: 'No number provided' 
    	};	
	
	if(typeof decimal === 'string'){
		decimal = Number(decimal);
		if(isNaN(decimal))
			throw { 
				name: 'NotNumber', 
				arguments: { number: original },
				message: '' + original + ' isn\'t a valid number'
			};	
	}
	
	if(typeof decimal !== 'number')	
	    throw { 
			name: 'NotNumber', 
			arguments: { number: original },
			message: '' + original + ' isn\'t a valid number'
		};
		
	if(decimal <= 0)
		throw { 
			name: 'NotPositive', 
			arguments: { number: original },
			message: 'Number must be greater than 0'
		};
		
	if(decimal > 3888)
		throw { 
			name: 'MustBeLower', 
			arguments: { number: original },
			message: 'Number must be lower than 3888'
		};
	
	for (var roman_number in this.roman_numbers) {
		var value = this.roman_numbers[roman_number].value;		
		while(decimal >= value && decimal > 0) {
			roman = roman.concat(roman_number);
			decimal -= value;
		}
	}
	
	return roman;
};

module.exports = new RomanConverter();