var PageRoutes = function(thing){};

PageRoutes.prototype.index = function(req, res) {
    res.render('index.html', {
        page: { title: 'iSearchUFind' } ,
        base_url: process.env.BASE_URL
    });
}

module.exports = PageRoutes;
