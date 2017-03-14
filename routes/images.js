var models;
var ImageRoutes = function(appModels){
    models = appModels;
};

ImageRoutes.prototype.search = function(req, res) {
    // Define our options
    var options = {};
    options.query = req.query.q;
    options.limit = req.query.limit || 20;
    options.offset = req.query.offset || 0;

    // Ensure we have a query term, otherwise return an error
    if(!req.query.q){
        return res.status(400).json({error: true, message: "Invalid search term provided."});
    }

    // Go get our images
    models.images.getImages(options, function(err, images) {
        res.json(images);
    });

}

ImageRoutes.prototype.history = function(req, res) {
    // Define our options
    var options = {};
    options.limit = req.query.limit || 20;
    options.offset = req.query.offset || 0;
    options.sort = req.query.sort || 'asc';

    // Get our image search history
    models.images.getHistory(options, function(err, history) {
        res.json(history);
    });
}

module.exports = ImageRoutes;
