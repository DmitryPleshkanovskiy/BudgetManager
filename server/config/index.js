/**
 * Created by Nick on 21.08.2016.
 */

const db = require('./database');

module.exports = {
	port: 5000,
    db: {
	    url: db.url
    }
};