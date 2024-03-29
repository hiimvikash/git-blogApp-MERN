const jwt = require('jsonwebtoken');
const SECRET = "vikash@123"

function createTokenForUser(user) {
  return jwt.sign(user, SECRET) // this will return token Containing user object as payload
}

function validateToken(token) {
  try {
    const payload = jwt.verify(token, SECRET);
    return payload;
  } catch (error) {
    // If token verification fails, return null
    return null;
  }
}

module.exports = {
  createTokenForUser,
  validateToken,
};