module.exports.current = module.exports.default = module.exports.en = require('./en.js');
module.exports.pt = require('./pt.js');

module.exports.supported = ['en', 'pt'];

module.exports.isSupported = function(code) {
    return module.exports.supported.indexOf(code.toLowerCase()) >= 0;
};

module.exports.set = function(lang) {
	lang = lang.toLowerCase();
	if(module.exports.isSupported(lang) && lang !== module.exports.current.code) 
    	module.exports.current = module.exports[lang];
}