const express = require('express');
const { User } = require('../models');
const bcrypt = require('bcryptjs'); // Para encriptar y comparar contraseñas
const jwt = require('jsonwebtoken'); // Para manejar JWT
const auth = require('../middleware/auth'); // Importar el middleware de autenticación
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, age, country, favoriteGenre, genero, idrol } = req.body; // Agrega el campo genero

    // Verificar si el email ya está registrado
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Asignar un rol predeterminado (por ejemplo, 'User') si no se proporciona idrol
    const roleToAssign = idrol || 34; // idrol: 34 es el rol de 'User'

    // Crear el nuevo usuario
    user = await User.create({
      name,
      email,
      password, // El hook beforeCreate encriptará la contraseña
      age,
      country,
      favoriteGenre,
      genero: genero || 'No especificado', // Agrega genero con un valor predeterminado si es necesario
      idrol: roleToAssign // Asignar el rol
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Iniciar sesión (Login)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Generar el token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Devolver el token y la información del usuario
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.age,
        country: user.country,
        favoriteGenre: user.favoriteGenre,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cerrar sesión (Logout)
router.post('/logout', (req, res) => {
  // En realidad, el logout se maneja en el frontend eliminando el token del almacenamiento.
  res.json({ message: 'Logout exitoso' });
});

// Obtener todos los usuarios (No protegida)
router.get('/user', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener datos del perfil del usuario autenticado (Protegido con JWT)
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
