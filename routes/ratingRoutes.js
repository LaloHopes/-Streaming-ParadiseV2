// routes/ratingRoutes.js
const express = require('express');
const { Rating } = require('../models'); // Asegúrate de que el modelo Rating esté importado correctamente
const router = express.Router();

// Crear una nueva calificación
router.post('/', async (req, res) => {
  try {
    const { score, userId, videoId } = req.body;
    const rating = await Rating.create({ score, userId, videoId });
    res.status(201).json(rating);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener la calificación promedio de un video específico
router.get('/video/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    const ratings = await Rating.findAll({ where: { videoId } });
    const avgScore = ratings.reduce((acc, rating) => acc + rating.score, 0) / ratings.length || 0;
    res.json({ averageRating: avgScore });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar una calificación
router.delete('/:ratingId', async (req, res) => {
  try {
    const { ratingId } = req.params;
    const result = await Rating.destroy({ where: { id: ratingId } });
    if (result) {
      res.json({ message: 'Calificación eliminada correctamente' });
    } else {
      res.status(404).json({ message: 'Calificación no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
