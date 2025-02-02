require('dotenv').config();

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Extract JWT from cookies
  //console.log('Token: ', token);

  if (!token) {
    console.log("Error: Token not found!");
    return res.status(403).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token decoded succesfully :)');
    //console.log(decoded);
    req.user = decoded; // Attach decoded user info to request
    next(); // Proceed to next middleware/route handler
  } 
  catch (err) {
    console.error('Invalid or expired token :(', err);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};