import { Router } from 'express';
import * as catalogoController from './catalogo.controller';
import { protect } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/robots', protect, catalogoController.getRobots); // Publica (para probar)
//router.get('/tipos-suscripcion', protect, catalogoController.getTiposSuscripcion); // Protegida (requiere Token)
router.get('/tipos-suscripcion', protect, catalogoController.getTiposSuscripcion);
export default router;
