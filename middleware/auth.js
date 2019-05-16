const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  // Check for token
  if(!token) {
    // 401 - unauthorized
    return res.status(401).json({ msg: 'Unauthorized!' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // Add user from payload
    req.user = decoded;
  } catch(e) {
    res.status(400).json({ msg: 'Token is not valid!' });
  }

  next();
};

module.exports = auth;
