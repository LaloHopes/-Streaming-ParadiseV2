const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const Permission = require('../models/Permission');
const RolePermission = require('../models/RolePermission');

// Asignar un permiso a un rol
router.post('/assign', async (req, res) => {
    try {
        const { idrol, idpermiso } = req.body;
        const newAssignment = await RolePermission.create({ idrol, idpermiso });
        res.status(201).json(newAssignment);
    } catch (error) {
        console.error('Error al asignar permiso al rol:', error);
        res.status(500).json({ error: error.message });
    }
});

// Obtener roles con permisos
router.get('/roles-with-permissions', async (req, res) => {
    try {
        const roles = await Role.getRolesWithPermissions();
        res.json(roles);
    } catch (error) {
        console.error('Error al obtener roles con permisos:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
