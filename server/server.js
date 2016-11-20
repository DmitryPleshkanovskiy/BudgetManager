/**
 * Created by dmitry on 15.05.16.
 */

//var debug        = require('debug');

var app          = require('./app');
var config       = require('./config');

app.set('port', process.env.PORT || config.port);

var server = app.listen(app.get('port'), function(){
   console.log('Express server listening on port ' + server.address().port);
});