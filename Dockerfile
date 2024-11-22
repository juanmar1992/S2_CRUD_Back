# Usar una imagen base de Node.js para construir el backend
FROM node:22.11.0-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar las dependencias
RUN npm install --verbose

# Copiar el resto del código fuente al contenedor
COPY . .

# Exponer el puerto en el que corre el backend
EXPOSE 5000

# Comando para iniciar el servidor
CMD ["npm", "start"]