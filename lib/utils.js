var fs = require('fs');

function Utils() {
    var self = this;
    self.product_version = null;
    
    self.getVersion = function () {
        if (!self.product_version) {
            var content = fs.readFileSync(
                process.cwd() + '/package.json', 'utf8'
            );
            var package = JSON.parse(content);
            self.product_version = package.version;
        }
        
        return self.product_version;
    };
}

module.exports = new Utils();