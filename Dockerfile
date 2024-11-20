# Usar una imagen base de Node.js
FROM node:22.11.0

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar todo el código al contenedor
COPY . .

# Exponer el puerto en el que corre el backend
EXPOSE 5000

# Comando para iniciar el servidor
CMD ["npm", "start"]