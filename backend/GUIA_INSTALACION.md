# Guía de Configuración del Backend (GLA)

## Requisitos Previos
- **Node.js**: Versión 21.7.3
- **Base de Datos**: MariaDB (local o remota)
- **Gestor de Paquetes**: npm

## 1. Para Desarrolladores (Compañeros)
Si te descargas el proyecto por primera vez, sigue estos pasos para levantar el backend:

1.  **Clonar y situarse en la rama correcta:**
    ```bash
    git clone https://github.com/JulianTorres-Robotic/gal-project.git
    cd gal-project
    git checkout developBack
    cd backend
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    - Crea un archivo `.env` en la carpeta `backend/` copiado del ejemplo (o pide las credenciales al líder).
    - Asegúrate de tener `DATABASE_URL` apuntando a tu instancia de MariaDB.

4.  **Generar Cliente de Prisma:**
    ```bash
    npx prisma generate
    ```

5.  **Levantar el servidor en modo desarrollo:**
    ```bash
    npm run dev
    ```

---

## 2. Historial de Comandos (Configuración Inicial Realizada)
Estos son los comandos que se ejecutaron para crear la estructura actual del proyecto:

1.  **Inicialización del proyecto:**
    ```bash
    npm init -y
    ```

2.  **Instalación de dependencias de producción:**
    ```bash
    npm install express cors dotenv prisma @prisma/client keycloak-connect express-session
    ```

3.  **Instalación de dependencias de desarrollo:**
    ```bash
    npm install -D typescript ts-node @types/node @types/express @types/cors @types/express-session nodemon
    ```

4.  **Inicialización de TypeScript y Prisma:**
    ```bash
    npx tsc --init
    npx prisma init
    ```

5.  **Estructura de carpetas:**
    ```bash
    mkdir src/config src/controllers src/middlewares src/routes src/services src/utils
    ```
