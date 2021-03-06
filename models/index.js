var mongojs = require('mongojs'),
    db = mongojs(process.env.MONGO_URL, ['history']);

var Models = function(){
    var self = this;
    require('fs').readdirSync(__dirname + '/').forEach(function(file) {
        if (file !== 'index.js') {
            var name = file.replace('.js', '');
            self[name] = require('./' + file);
            self[name] = new self[name](db);
        }
    });
};

module.exports = Models;
