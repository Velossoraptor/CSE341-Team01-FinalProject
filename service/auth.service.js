const axios = require('axios');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

exports.getGoogleRedirect = (req, res) => {
  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  url.search = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent',
  }).toString();

  // Redirect browser directly to Google
  res.redirect(url.toString());
};

exports.handleGoogleCallback = async (req, res, next) => {
  try {
    // 1. Grab authorization code from query
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ error: 'Missing authorization code' });
    }

    // 2. Exchange code for tokens
    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }).toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    const { id_token } = tokenResponse.data;

    // 3. Verify Google’s ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, sub: googleId, name } = payload;

    // 4. Upsert user in MongoDB
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, name, googleId });
    }

    // 5. Set the token in a Secure, HTTP-Only cookie
    res.cookie('token', id_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // 6. Redirect to your frontend or dashboard
    res.redirect('https://marketplaceapi-xx5z.onrender.com');
  } catch (err) {
    next(err);
  }
};

exports.logout = asyncHandler(async (req, res) => {
  // Clear the same cookie you set on login
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  //I am using express-session
  // If you’re using express-session, destroy it
  if (req.session) {
    await new Promise((resolve, reject) => {
      req.session.destroy((err) => (err ? reject(err) : resolve()));
    });
  }

  res.status(200).json({ message: 'Logged out successfully' });
});
