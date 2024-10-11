const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const User = require('../models/User');
const Video = require('../models/Video');

// Crear una reseña
router.post('/create', async (req, res) => {
  try {
    const { idvideo, iduser, comentario, clasificacion } = req.body;

    // Crear la nueva reseña
    const newComment = await Comment.create({
      idvideo,
      iduser,
      comentario,
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todas las reseñas
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        { model: User, attributes: ['name'] },  // Incluir el nombre del usuario
        { model: Video, attributes: ['title'] }  // Incluir el título del video
      ]
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener reseñas de un video específico
router.get('/video/:idvideo', async (req, res) => {
  try {
    const { idvideo } = req.params;

    const comments = await Comment.findAll({
      where: { idvideo },
      include: [
        { model: User, attributes: ['name'] },  // Incluir el nombre del usuario
      ]
    });

    if (comments.length === 0) {
      return res.status(404).json({ message: 'No hay reseñas para este video' });
    }

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar una reseña por su ID
router.put('/:idcoment', async (req, res) => {
  try {
    const { idcoment } = req.params;
    const { comentario, clasificacion } = req.body;

    const updatedComment = await Comment.update(
      { comentario, clasificacion },
      { where: { idcoment } }
    );

    if (updatedComment[0] === 0) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    res.json({ message: 'Reseña actualizada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar una reseña por su ID
router.delete('/:idcoment', async (req, res) => {
  try {
    const { idcoment } = req.params;

    const deletedComment = await Comment.destroy({ where: { idcoment } });

    if (!deletedComment) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    res.json({ message: 'Reseña eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
