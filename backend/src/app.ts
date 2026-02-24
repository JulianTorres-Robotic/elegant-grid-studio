import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';

// Importar rutas
import catalogoRoutes from './modules/catalogo/catalogo.routes';

import session from 'express-session';
import { keycloak, memoryStore } from './config/keycloak';

const app: Application = express();

// Middlewares Globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Sesión (Requerido por Keycloak)
app.use(session({
    secret: process.env.SESSION_SECRET || 'gla-secret-super-seguro',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

// Inicializar Keycloak
app.use(keycloak.middleware());

// Ruta Health Check
app.get('/health', (req, res) => {
    res.json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        service: 'GLA Backend'
    });
});

// Rutas de Módulos
app.use('/api/catalogo', catalogoRoutes);


// Middleware 404
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Not Found' });
});

// Middleware Error Handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(`[Error] ${err.message}`);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

export default app;
