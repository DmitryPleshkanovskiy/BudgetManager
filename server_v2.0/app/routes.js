/**
 * Created by dmitry on 15.05.16.
 */

module.exports = function (app, passport) {

    var isLoggedIn = true;

    app.get('/', function (req, res) {
        if (isLoggedIn) {
            res.render('../server_v2.0/views/budgetmanager.ejs');
        } else {
            res.render('../server_v2.0/views/index.ejs');
        }
    });
    
};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

function isNotLoggedIn(req, res, next) {

    if (!req.isAuthenticated())
        return next();

    res.redirect('/');
}