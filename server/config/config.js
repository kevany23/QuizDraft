const dotenv = require('dotenv');
dotenv.config();

var db_url = process.env.SERVER_DATABASE_URL;

if (process.argv.length >= 3 && process.argv[2] == "local") {
  db_url = process.env.LOCAL_DATABASE_URL;
}

const DATABASE_URL = db_url;
const GOOGLE_CLIENT_ID= process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

module.exports.DATABASE_URL = DATABASE_URL;
module.exports.GOOGLE_CLIENT_ID = GOOGLE_CLIENT_ID;
module.exports.GOOGLE_CLIENT_SECRET = GOOGLE_CLIENT_SECRET;