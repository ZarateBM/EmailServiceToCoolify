import { spawn } from "child_process";
const containerName = "mailserver-xg0gwco08g000g0k0kw8g0k0";

const parseErrorMessage = (output: string): string => {
  const errorLines = output.split("\n").filter((line) => line.includes("ERROR"));

  if (errorLines.length === 0) {
    return output.trim();
  }

  // Extrae y formatea los mensajes de error
  const formattedErrors = errorLines.map((line) => {
    const [timestamp, error] = line.split("ERROR");
    return error.trim();
  });

  return formattedErrors.join("; "); // Devuelve los errores concatenados
};


// Crear un nuevo correo electrónico
export const createNewEmailService = async (email: string, password: string,): Promise<string> => {
  return executeCommand(["setup", "email", "add", email, password], containerName, `Correo ${email} creado correctamente.`);
};

// Actualizar la contraseña de un correo
export const updateEmailPasswordService = async (email: string, password: string): Promise<string> => {
  return executeCommand(["setup", "email", "update", email, password], containerName, `Contraseña del correo ${email} actualizada correctamente.`);
};

// Eliminar un correo electrónico
export const deleteExistingEmailService = async (email: string): Promise<string> => {
  return executeCommand(["setup", "email", "del", email], containerName, `Correo ${email} eliminado correctamente.`);
};

// Listar todos los correos electrónicos
export const getAllEmailsService = async (): Promise<string[]> => {
  const output = await executeCommand(["setup", "email", "list"], containerName, "Lista de correos obtenida.");
  return output.split("\n").filter((line) => line.trim() !== "");
};

// Añadir un alias
export const addAliasService = async (email: string, recipient: string): Promise<string> => {
  return executeCommand(["setup", "alias", "add", email, recipient], containerName, `Alias añadido para ${email} apuntando a ${recipient}.`);
};

// Eliminar un alias
export const deleteAliasService = async (email: string, recipient: string): Promise<string> => {
  return executeCommand(["setup", "alias", "del", email, recipient], containerName, `Alias eliminado para ${email}.`);
};

// Establecer la cuota de un correo
export const setQuotaService = async (email: string, quota: string): Promise<string> => {
  return executeCommand(["setup", "quota", "set", email, quota], containerName, `Cuota de ${quota} establecida para ${email}.`);
};

// Eliminar la cuota de un correo
export const deleteQuotaService = async (email: string): Promise<string> => {
  return executeCommand(["setup", "quota", "del", email], containerName, `Cuota eliminada para ${email}.`);
};

// Configurar DKIM
export const configureDKIMService = async (args: string[]): Promise<string> => {
  return executeCommand(["setup", "config", "dkim", ...args], containerName, `Configuración DKIM realizada correctamente.`);
};

// Añadir un relay con autenticación
export const addRelayAuthService= async (domain: string, username: string, password: string): Promise<string> => {
  return executeCommand(["setup", "relay", "add-auth", domain, username, password], containerName, `Relay con autenticación configurado para el dominio ${domain}.`);
};

// Añadir un relay sin autenticación
export const addRelayDomainService = async (domain: string, host: string, port: string): Promise<string> => {
  return executeCommand(["setup", "relay", "add-domain", domain, host, port], containerName, `Relay configurado para el dominio ${domain} apuntando al host ${host}.`);
};

// Excluir un dominio del relay
export const excludeRelayDomainService = async (domain: string): Promise<string> => {
  return executeCommand(["setup", "relay", "exclude-domain", domain], containerName, `Dominio ${domain} excluido del relay.`);
};

// Gestionar Fail2Ban
export const fail2BanActionService = async (action: string, ip: string | null): Promise<string> => {
  const args = ip ? ["setup", "fail2ban", action, ip] : ["setup", "fail2ban", action];
  return executeCommand(args, containerName, `Acción Fail2Ban '${action}' ejecutada con éxito.`);
};

// Depuración con comandos personalizados
export const debugCommandService = async (type: string, args: string[]): Promise<string> => {
  return executeCommand(["setup", "debug", type, ...args], containerName, `Comando de depuración '${type}' ejecutado correctamente.`);
};

// Administrar dovecot-master
export const manageDovecotMasterService = async (action: string, username: string, password: string | null): Promise<string> => {
  const args = password ? ["setup", "dovecot-master", action, username, password] : ["setup", "dovecot-master", action, username];
  return executeCommand(args, containerName, `Acción '${action}' en Dovecot Master realizada para el usuario ${username}.`);
};

// Ejecución genérica del comando Docker
const executeCommand = async (args: string[], containerName: string, successMessage: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    console.log(`Ejecutando comando: docker exec -i ${containerName} ${args.join(" ")}`);

    const process = spawn("docker", ["exec", "-i", containerName, ...args]);

    let outputBuffer = ""; // Acumular la salida para depuración

    // Capturar y manejar la salida estándar
    process.stdout.on("data", (data) => {
      const output = data.toString();
      outputBuffer += output;
      console.log(`STDOUT: ${output}`);
    });

    // Capturar y manejar los errores estándar
    process.stderr.on("data", (data: Buffer) => {
      const errorOutput = data.toString();
      console.error(`STDERR: ${errorOutput}`);
    });

    // Escuchar el evento de cierre del proceso
    process.on("close", (code: number) => {
      console.log(`El proceso ha finalizado con código: ${code}`);
      if (code === 0) {
        const message = outputBuffer.trim() || "Proceso completado exitosamente.";
        console.log(message);
        resolve(message);
      } 
      // Caso de error
      else {
        const errorMessage = parseErrorMessage(outputBuffer);
        console.error(`Error al ejecutar el comando. Código de salida: ${code}`);
        console.error(`Salida del proceso:\n${outputBuffer}`);
        reject(new Error(`Error: ${errorMessage}`));
      }
    });

    // Manejar errores en el proceso
    process.on("error", (err: Error) => {
      console.error(`Error en el proceso: ${err.message}`);
      reject(new Error(`Error en el proceso: ${err.message}`));
    });
  });
};
