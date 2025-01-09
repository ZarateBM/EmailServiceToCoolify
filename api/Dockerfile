FROM node:22

# Crear el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos necesarios
COPY package.json tsconfig.json ./
RUN npm install

# Copiar el código fuente
COPY src ./src

# Compilar el proyecto TypeScript
RUN npm run build

# Exponer el puerto de la API
EXPOSE 5587

# Comando para iniciar la API
CMD ["node", "dist/index.js"]

RUN apt-get update && apt-get install -y expect
