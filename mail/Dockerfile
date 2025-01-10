FROM docker.io/mailserver/docker-mailserver:latest

# Instalar Python y Flask en Alpine
RUN apk add --no-cache python3 py3-pip && pip3 install flask

# Copiar el script de la API Proxy
COPY server.py /usr/local/bin/server.py

# Exponer el puerto de la API Proxy
EXPOSE 5000

# Ejecutar el servidor de Flask al iniciar el contenedor
CMD ["bash", "-c", "supervisord & python3 /usr/local/bin/server.py"]
