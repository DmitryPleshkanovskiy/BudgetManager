const db = require('./database');
const auth = require('./auth');

module.exports = {
	port: 5000,
    db: {
	    url: db.url
    },
    auth: {
        secret: auth.secret
    }
};