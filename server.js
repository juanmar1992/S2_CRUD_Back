const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

// Carga las variables de entorno
dotenv.config();

// Conecta a la base de datos
connectDB();

// Inicializa el servidor
const app = express();

// Middleware
app.use(cors({
    origin: '*',
}));
app.use(express.json()); // Analiza cuerpos JSON

// Rutas
app.use('', taskRoutes);

// Levanta el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});