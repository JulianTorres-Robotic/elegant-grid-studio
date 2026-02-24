import { Request, Response, NextFunction } from 'express';
import { keycloak } from '../config/keycloak';

// Middleware para verificar si el usuario esta autenticado
export const protect = keycloak.protect();

// Middleware opcional: Verificar roles especificos
export const checkRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // @ts-ignore - Keycloak añade kauth al request
        const roles = req.kauth?.grant?.access_token?.content?.realm_access?.roles || [];

        if (roles.includes(role)) {
            next();
        } else {
            res.status(403).json({ error: 'Acceso Denegado: Rol insuficiente' });
        }
    };
};
