# Usa la imagen oficial de docker-mailserver como base
FROM docker.io/mailserver/docker-mailserver:latest

# Instalar Python y dependencias necesarias
RUN apt-get update && apt-get install -y \
    python3 python3-pip curl && \
    pip3 install flask && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Descargar y configurar el script setup.sh
RUN curl -o /usr/local/bin/setup -L https://raw.githubusercontent.com/docker-mailserver/docker-mailserver/master/setup.sh && \
    chmod +x /usr/local/bin/setup

# Copiar el script de la API Proxy
COPY server.py /usr/local/bin/server.py

# Exponer el puerto de la API Proxy
EXPOSE 5000

# Comando para ejecutar Flask junto con el contenedor
CMD ["python3", "/usr/local/bin/server.py"]
