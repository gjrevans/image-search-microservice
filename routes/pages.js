var PageRoutes = function(thing){};

PageRoutes.prototype.index = function(req, res) {
    res.render('index.html', {
        page: { title: 'Search-N-Find' } ,
        base_url: process.env.BASE_URL
    });
}

module.exports = PageRoutes;
