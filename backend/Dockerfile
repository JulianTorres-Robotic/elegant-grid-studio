# backend/Dockerfile

# 1. Imagen base ligera
FROM node:18-alpine

# 2. Directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiamos archivos de dependencias (si existen)
# (El equipo backend reemplazará esto con sus archivos reales)
COPY package*.json ./

# 4. Instalamos dependencias (Placeholder para que no falle si no hay package.json)
RUN npm install || true

# 5. Copiamos el resto del código
COPY . .

# 6. Exponemos el puerto de NestJS
EXPOSE 3000

# 7. Comando de inicio (Modo Desarrollo con Hot Reload)
CMD ["npm", "run", "start:dev"]