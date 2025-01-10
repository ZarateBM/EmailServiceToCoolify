FROM python:3.9-alpine

# Instalar mailserver manualmente
RUN apk add --no-cache bash supervisor
# Copiar e instalar mailserver aquí si es necesario

# Copiar el script de la API Proxy
COPY server.py /usr/local/bin/server.py

# Instalar Flask
RUN pip3 install flask

# Exponer el puerto de la API Proxy
EXPOSE 5000

CMD ["python3", "/usr/local/bin/server.py"]
