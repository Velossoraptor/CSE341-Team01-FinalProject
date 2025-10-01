const { OAuth2Client } = require("google-auth-library");
const asyncHandler     = require("express-async-handler");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authenticate = asyncHandler(async (req, res, next) => {
    let token = req.cookies?.token;


    const authHeader = req.headers.authorization || "";
    if (!token && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }


    if (!token) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    req.token = token;

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    });


    const { email, sub: googleId, name } = ticket.getPayload();
    req.user = { email, name, googleId };

    next();
});

module.exports = authenticate;
