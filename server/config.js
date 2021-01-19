const dotenv = require('dotenv');
dotenv.config();

var db_url = process.env.SERVER_DATABASE_URL;

if (process.argv.length >= 3 && process.argv[2] == "local") {
  db_url = process.env.LOCAL_DATABASE_URL;
}

const DATABASE_URL = db_url;

module.exports.DATABASE_URL = DATABASE_URL;