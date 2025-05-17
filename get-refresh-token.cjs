const { google } = require('googleapis');
const readline = require('readline');

const CLIENT_ID = import.meta.env.VITE_GMAIL_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_GMAIL_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:5173/oauth2callback';

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  prompt: 'consent',
});

console.log('Visit this URL:', authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the code from browser: ', (code) => {
  rl.close();
  oauth2Client.getToken(code, (err, token) => {
    if (err) return console.error('Error:', err);
    console.log('Refresh Token:', token.refresh_token);
  });
});