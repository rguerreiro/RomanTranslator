var path = require('path');

exports.run_test = function(filename, test_dir) {
    if(!test_dir) test_dir = 'test/';
    
    if(typeof nodeunit === "undefined") {
        nodeunit = require('nodeunit').reporters.default;
        nodeunit.run([test_dir + path.basename(filename)]);
    }
};