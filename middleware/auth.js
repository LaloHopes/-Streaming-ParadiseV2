// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  // Verifica si hay un token
  if (!token) {
    return res.status(401).json({ message: 'No hay token, autorización denegada' });
  }

  try {
    // Verifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // El ID del usuario ahora está disponible en req.user.id
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token no válido' });
  }
};

module.exports = auth;
