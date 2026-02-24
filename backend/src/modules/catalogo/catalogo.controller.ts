import { Request, Response } from 'express';
import * as catalogoService from './catalogo.service';

export const getRobots = async (req: Request, res: Response) => {
    try {
        const robots = await catalogoService.getRobots();
        res.json(robots);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener robots' });
    }
};

export const getTiposSuscripcion = async (req: Request, res: Response) => {
    try {
        const tipos = await catalogoService.getTiposSuscripcion();
        res.json(tipos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener tipos de suscripción' });
    }
};
