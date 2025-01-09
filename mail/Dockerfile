FROM docker.io/mailserver/docker-mailserver:latest

# Instalar Python y Flask
RUN apt-get update && apt-get install -y python3 python3-pip && pip3 install flask

# Copiar el script de la API Proxy
COPY server.py /usr/local/bin/server.py

# Exponer el puerto de la API Proxy
EXPOSE 5000

# Ejecutar el servidor de Flask al iniciar el contenedor
CMD ["bash", "-c", "supervisord & python3 /usr/local/bin/server.py"]
