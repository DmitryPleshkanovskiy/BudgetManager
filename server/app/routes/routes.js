/**
 * Created by dmitry on 15.05.16.
 */

module.exports = function (app) {
    const api = require('./api')(app);
    app.use('/api', /*authOnly,*/ api);
};