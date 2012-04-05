// just while express 3.x isn't released
// taken from http://allampersandall.blogspot.pt/2011/12/hoganjs-expressjs-nodejs.html
var hogan_express_adapter = (function() {
    var init = function(hogan) {
        var compile = function(source) {
            return function(options) {
                return hogan.compile(source).render(options);
			};
		}
		return { compile: compile };
	};
	return { init: init };
}());

if (typeof module !== 'undefined' && module.exports) {
    module.exports = hogan_express_adapter;
} else if (typeof exports !== 'undefined') {
	exports.hogan_express_adapter = hogan_express_adapter;
}