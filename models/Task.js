const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    asunto: {
        type: String,
        required: true,
    },
    observaciones: {
        type: String,
        required: true,
    },
    fechaCarga: {
        type: Date,
        default: Date.now, // Fecha y hora actuales
    },
    prioridad: {
        type: String,
        enum: ['Alta', 'Media', 'Baja'], // Valores aceptados
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Task', TaskSchema);