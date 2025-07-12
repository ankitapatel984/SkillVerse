const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({message:'Not authenticated'});

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if(!user || user.banned) return res.status(401).json({message:'Unauthorized or banned'});

    req.user = user;
    next();
  } catch(err) {
    console.error(err);
    res.status(401).json({message:'Invalid token'});
  }
};

module.exports = authMiddleware;