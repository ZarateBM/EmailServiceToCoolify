# EmailServiceToCoolify

EmailServiceToCoolify es una solución completa para alojar tu propio servidor de correo electrónico con soporte para SSL/TLS y una interfaz gráfica a través de Roundcube. Este proyecto utiliza Docker y está diseñado para ser desplegado fácilmente en **Coolify**.

## Características

- **Servidor de correo SMTP/IMAP/POP3**: Basado en [Docker Mailserver](https://github.com/docker-mailserver/docker-mailserver).
- **Seguridad avanzada**: SpamAssassin, ClamAV, Fail2Ban y soporte para SSL/TLS.
- **Interfaz web**: Roundcube como cliente de correo con soporte para IMAP.
- **Compatibilidad con Coolify**: Configuración sencilla para entornos Coolify.

---

## Requisitos previos

1. **Docker** y **Docker Compose** instalados en tu servidor.
2. Dominio configurado con registros DNS:
   - **Registro A** apuntando a tu servidor.
   - **Registro MX** apuntando a `mail.tudominio.com`.
3. Certificados SSL si utilizas la opción manual (o Let’s Encrypt si lo deseas).

---

## Configuración

1. **Clona este repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/EmailServiceToCoolify.git
   cd EmailServiceToCoolify ### **Descripción para el Proyecto (EmailServiceToCoolify)**

**Descripción:**
EmailServiceToCoolify es un proyecto diseñado para configurar un servidor de correo electrónico completamente funcional utilizando Docker, Docker Mailserver y Roundcube, todo integrado en una configuración sencilla y compatible con Coolify. Este sistema proporciona un servidor SMTP seguro, acceso IMAP/POP3, soporte para SSL/TLS, y una interfaz web para gestionar correos electrónicos a través de Roundcube. Es ideal para quienes buscan una solución de correo electrónico autoalojada y extensible, útil tanto para proyectos personales como para empresas.

---

### **`env.example`**

Crea un archivo llamado `.env` para configurar las variables de entorno necesarias. Aquí está un ejemplo de lo que debería incluir:

```env
# Configuración básica del servidor de correo
OVERRIDE_HOSTNAME=mail.tudominio.com
DMS_DOMAIN=tudominio.com

# Habilitar opciones de seguridad y funcionalidades
ENABLE_SPAMASSASSIN=1
ENABLE_CLAMAV=1
ENABLE_FAIL2BAN=1
ENABLE_POSTGREY=1
ENABLE_POP3=1
ENABLE_IMAP=1

# Configuración de certificados SSL/TLS
SSL_TYPE=manual  # Cambiar a "letsencrypt" si se utiliza Let's Encrypt

# Configuración de Roundcube
ROUNDCUBEMAIL_DEFAULT_HOST=mail.tudominio.com
ROUNDCUBEMAIL_SMTP_SERVER=mail.tudominio.com
ROUNDCUBEMAIL_IMAP_SERVER=mail.tudominio.com
```

---

### **README.md**

Crea un archivo `README.md` para que otros puedan entender cómo utilizar el proyecto:

```markdown
# EmailServiceToCoolify

EmailServiceToCoolify es una solución completa para alojar tu propio servidor de correo electrónico con soporte para SSL/TLS y una interfaz gráfica a través de Roundcube. Este proyecto utiliza Docker y está diseñado para ser desplegado fácilmente en **Coolify**.

## Características

- **Servidor de correo SMTP/IMAP/POP3**: Basado en [Docker Mailserver](https://github.com/docker-mailserver/docker-mailserver).
- **Seguridad avanzada**: SpamAssassin, ClamAV, Fail2Ban y soporte para SSL/TLS.
- **Interfaz web**: Roundcube como cliente de correo con soporte para IMAP.
- **Compatibilidad con Coolify**: Configuración sencilla para entornos Coolify.

---

## Requisitos previos

1. **Docker** y **Docker Compose** instalados en tu servidor.
2. Dominio configurado con registros DNS:
   - **Registro A** apuntando a tu servidor.
   - **Registro MX** apuntando a `mail.tudominio.com`.
3. Certificados SSL si utilizas la opción manual (o Let’s Encrypt si lo deseas).

---

## Configuración

1. **Clona este repositorio**:
   ```bash
   git clone https://github.com/ZarateBM/EmailServiceToCoolify.git
   cd EmailServiceToCoolify
   ```

2. **Crea el archivo `.env`**:
   Copia el archivo `env.example` y actualízalo con tu configuración:
   ```bash
   cp env.example .env
   ```

   - Reemplaza `tudominio.com` con tu dominio real.
   - Si tienes certificados SSL, asegúrate de configurarlos correctamente en la variable `SSL_TYPE`.

3. **Configura registros DNS**:
   - **Registro A**:
     ```plaintext
     mail   A   [IP de tu servidor]
     ```
   - **Registro MX**:
     ```plaintext
     @   MX   10   mail.tudominio.com
     ```
   - **SPF**:
     ```plaintext
     @   TXT   "v=spf1 mx ~all"
     ```
   - **DKIM** y **DMARC**: Docker Mailserver genera automáticamente DKIM.

4. **Ejecuta el proyecto con Coolify o Docker Compose**:
   Si estás usando **Coolify**, importa este proyecto a traves de un repositorio. Si prefieres ejecutarlo manualmente:


---

## Puertos utilizados

- **SMTP sin cifrado**: 25
- **SMTP con SSL/TLS**: 465
- **IMAP sin cifrado**: 143
- **IMAP con SSL/TLS**: 993
- **Roundcube (Webmail)**: 8086

---

## Gestión de usuarios

1. **Crear un usuario**:
   ```bash
   ./setup.sh email add usuario@tudominio.com --password TuContraseña
   ```

2. **Cambiar contraseña de un usuario**:
   ```bash
   ./setup.sh email update usuario@tudominio.com --password NuevaContraseña
   ```

3. **Eliminar un usuario**:
   ```bash
   ./setup.sh email del usuario@tudominio.com
   ```

---

## Acceso a Roundcube

1. Abre tu navegador y accede a `http://<TU_SERVIDOR>:8080`.
2. Inicia sesión con tu dirección de correo electrónico y contraseña.

---

## Problemas comunes

### `Permission denied` al ejecutar `setup.sh`
Asegúrate de que el archivo tiene permisos de ejecución:
```bash
chmod +x setup.sh
```

### Error en la conexión SSL/TLS
- Verifica que los certificados SSL estén correctamente configurados.
- Si usas Let's Encrypt, asegúrate de que los certificados estén actualizados.

### No se envían correos
- Verifica los registros DNS, especialmente SPF y DKIM.
- Revisa los logs del contenedor Mailserver:
  ```bash
  docker logs mailserver
  ```


