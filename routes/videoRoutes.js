const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

// Crear un nuevo video
router.post('/create', async (req, res) => {
  try {
    const { title, url, creatorId, descripcion, genero } = req.body;

    // Crear el nuevo video
    const newVideo = await Video.create({
      title,
      url,
      creatorId,
      descripcion,
      genero
    });

    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.findAll();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un video por su ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url, creatorId, descripcion, genero } = req.body;

    // Actualizar el video
    const updatedVideo = await Video.update(
      { title, url, creatorId, descripcion, genero },
      { where: { idvideo: id } }
    );

    if (updatedVideo[0] === 0) {
      return res.status(404).json({ message: 'Video no encontrado' });
    }

    res.json({ message: 'Video actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un video por su ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Eliminar el video
    const deletedVideo = await Video.destroy({ where: { idvideo: id } });

    if (!deletedVideo) {
      return res.status(404).json({ message: 'Video no encontrado' });
    }

    res.json({ message: 'Video eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
