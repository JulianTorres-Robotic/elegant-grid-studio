import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    console.log(`📡 Entorno: ${process.env.NODE_ENV || 'development'}`);
});
