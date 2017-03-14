var data,
    Bing = require('node-bing-api')({ accKey: process.env.BING_API_KEY });

var ImagesModel = function(db){
    data = db;
};

ImagesModel.prototype.getImages = function(options, callback){
    var query = options.query,
        limit = options.limit,
        offset = options.offset;

    Bing.images(query, {
        top: limit,   // Number of results (max 50 & default 20)
        skip: offset  // Offset result (default 0)
    }, function(err, res, body){
        if(err) throw err;

        // Create the history & save to Mongo
        var newHistory = {
            term: options.query,
            topResult: body.value[0].contentUrl,
            date: new Date()
        }

        saveHistory(newHistory);

        // Return our images via callback
        return callback(false, body.value.map(formResponse));
    });

    // Create a response body
    function formResponse(image){
        return {
            "name": image.name,
            "url": image.contentUrl,
            "thumbnail": image.thumbnailUrl,
            "date": image.datePublished
        };
    }
    // Send the history to the database
    function saveHistory(newHistory) {
        data.history.insert(newHistory, function(err, result) {
            if(err) throw err;
            console.log("Result was saved: " + JSON.stringify(result));
        });
    }
};

ImagesModel.prototype.getHistory = function(options, callback) {
    // Apparently mongo gets mad if you pass it a sting
    // Use parseInt()
    var limit = parseInt(options.limit),
        offset = parseInt(options.offset),
        sort = options.sort === 'asc' ? 1 : -1;

    data.history.find().sort({date: sort}).skip(offset).limit(limit, function(err, result){
        if (err) throw err;
        callback(false, result);
    });
};

module.exports = ImagesModel;
