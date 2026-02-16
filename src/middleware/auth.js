const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Sin Token' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // payload puede contener { id: ..., iat: ..., exp: ... }
    req.user = { id: payload.id };
    next();
    //const userRole = decoded.role;
    //console.log('User role:', userRole);
  } catch (err) {
    return res.status(401).json({ message: 'El Token es inválido o ya expiró.' });
  }
};

module.exports = auth;