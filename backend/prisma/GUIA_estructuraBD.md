# 1. Módulo Clientes (Integración EVA)
* Objetivo: Gestionar a quién le vendemos y conectar con tu sistema Moodle/EVA.
* La Clave: Agregamos el campo ins_codigo_obj en la tabla institucion.
* Por qué es vital: Cuando quieras reasignar licencias con tus scripts SQL, el backend leerá este campo (ej: ueb) y el nombre del colegio para construir el JSON exacto: {'ueb': 'Unida Educativa Boston'}. Sin este campo, esa automatización sería imposible.
# 2. Módulo Pedidos (Ventas vs. Reposiciones)
* Objetivo: Que Operaciones pueda registrar tanto "Ventas Nuevas" como "Reposiciones por Pérdida".
* La Clave: Creamos la tabla tipo_pedido (Valores: VENTA, REPOSICION).
* Flujo:
    * Venta: Genera licencias normales.
    * Reposición: TIC verá que el pedido es tipo "REPOSICIÓN" y sabrá que debe usar cartillas de la serie 910 (tu código para pérdidas), manteniendo el inventario ordenado.
    * Tickets: El campo ped_ticket te permite rastrear el número de caso de soporte (TK-5501).
# 3. Módulo TIC (Fábrica de Licencias)
* Objetivo: Controlar el inventario físico y digital.
* La Clave: La tabla cartilla con ID Manual.
* Innovación: Al no usar autoincrement, puedes tener series paralelas:
    * Serie 110xxxx -> Físicas
    * Serie 910xxxx -> Virtuales / Pérdidas
* Esto permite que el ID de la base de datos coincida exactamente con el número impreso en el plástico.
# 4. Módulo Auditoría (Seguridad)
* Objetivo: Saber quién hizo qué.
* La Clave: La tabla auditoria y los campos @updatedAt.
* Seguridad: Si alguien cambia una licencia de "ACTIVA" a "PERDIDA", el sistema guarda automáticamente la fecha (updatedAt) y registra en auditoria qué usuario de Keycloak lo hizo.