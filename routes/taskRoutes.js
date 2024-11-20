const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { checkDbConnection } = require('../config/db');

// Crear una tarea
router.post('/', async (req, res) => {
    try {
        const newTask = new Task(req.body);

        const savedTask = await newTask.save();

        res.status(201).json(savedTask);

    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tarea', error });
    }
});

// Leer todas las tareas
router.get('/', async (req, res) => {
    try {
        // Obtén las tareas y ordénalas por la fecha de carga (descendente)
        const tasks = await Task.find().sort({ fechaCarga: -1 });

        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
});

// Obtener estado de salud de la BD
router.get('/health', (req, res) => {
    try {
        const dbStatus = checkDbConnection();

        if (dbStatus.status === 'connected') {
            res.status(200).json(dbStatus); // Respuesta para conexión exitosa
        } else {
            res.status(503).json(dbStatus); // Respuesta para otros estados
        }

    } catch (error) {
        console.error('Error al verificar la conexión a la base de datos:', error);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

// Actualizar una tarea
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Actualiza la tarea e incluye la nueva fecha
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            {
                ...req.body,
                fechaCarga: Date.now(), // Actualiza la fecha al momento actual
            },
            { new: true } // Devuelve la tarea actualizada
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        res.status(200).json(updatedTask);

    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarea', error });
    }
});

// Eliminar una tarea
router.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json({ message: 'Tarea eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea', error });
    }
});

module.exports = router;