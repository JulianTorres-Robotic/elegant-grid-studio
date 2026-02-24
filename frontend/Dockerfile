# frontend/Dockerfile

# 1. Usar Node ligero
FROM node:18-alpine

# 2. Directorio de trabajo
WORKDIR /app

# 3. Copiar archivos de dependencias
COPY package*.json ./

# 4. Instalar dependencias
RUN npm install

# 5. Copiar el resto del código
COPY . .

# 6. Exponer el puerto de Vite
EXPOSE 5173

# 7. Comando para iniciar en modo desarrollo (visible desde fuera)
CMD ["npm", "run", "dev", "--", "--host"]