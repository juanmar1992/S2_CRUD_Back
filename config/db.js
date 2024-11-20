const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected!');

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

// Función para verificar el estado de la conexión
const checkDbConnection = () => {
    const dbState = mongoose.connection.readyState;

    // Estados posibles:
    switch (dbState) {
        case 0:
            return { status: 'disconnected', message: 'La base de datos está desconectada' };
        case 1:
            return { status: 'connected', message: 'La base de datos está conectada' };
        case 2:
            return { status: 'connecting', message: 'La base de datos está conectándose' };
        case 3:
            return { status: 'disconnecting', message: 'La base de datos se está desconectando' };
        default:
            return { status: 'unknown', message: 'Estado desconocido de la base de datos' };
    }
};

module.exports = { connectDB, checkDbConnection };