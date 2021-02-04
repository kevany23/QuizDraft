const { google } = require('googleapis');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('./config');

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'postmessage'
);

const scopes = [];

module.exports.oauth2Client = oauth2Client;