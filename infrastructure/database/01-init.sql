-- infrastructure/database/01-init.sql

-- 1. Asegurar que la DB principal existe
CREATE DATABASE IF NOT EXISTS gal_db;

-- 2. Asegurar que la DB de Keycloak existe
CREATE DATABASE IF NOT EXISTS keycloak;

-- 3. Crear usuario (si no existe) y dar permisos
CREATE USER IF NOT EXISTS 'gal_user'@'%' IDENTIFIED BY 'gal_password';

-- 4. Dar permisos totales sobre ambas bases de datos
GRANT ALL PRIVILEGES ON gal_db.* TO 'gal_user'@'%';
GRANT ALL PRIVILEGES ON keycloak.* TO 'gal_user'@'%';

FLUSH PRIVILEGES;