import app from './app';
import config from './config';

app.set('port', process.env.PORT || config.port);

let server = app.listen(app.get('port'), () => {
   console.log('Express server listening on port ' + server.address().port);
});