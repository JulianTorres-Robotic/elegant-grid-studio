import prisma from '../../db';

export const getRobots = async () => {
    return await prisma.robot.findMany({
        // where: { rob_estado: 'ACTIVO' }
    });
};

export const getTiposSuscripcion = async () => {
    return await prisma.tipo_suscripcion.findMany();
};
