import { spawn } from "child_process";

// Crear un nuevo correo electrónico
export const createNewEmail = async (email: string, password: string, containerName: string): Promise<string> => {
  return executeCommand(["setup", "email", "add", email, password], containerName, `Correo ${email} creado correctamente.`);
};

// Actualizar la contraseña de un correo
export const updateEmailPassword = async (email: string, password: string, containerName: string): Promise<string> => {
  return executeCommand(["setup", "email", "update", email, password], containerName, `Contraseña del correo ${email} actualizada correctamente.`);
};

// Eliminar un correo electrónico
export const deleteEmail = async (email: string, containerName: string): Promise<string> => {
  return executeCommand(["setup", "email", "del", email], containerName, `Correo ${email} eliminado correctamente.`);
};

// Listar todos los correos electrónicos
export const listEmails = async (containerName: string): Promise<string[]> => {
  const output = await executeCommand(["setup", "email", "list"], containerName, "Lista de correos obtenida.");
  return output.split("\n").filter((line) => line.trim() !== "");
};

// Añadir un alias
export const addAlias = async (email: string, recipient: string, containerName: string): Promise<string> => {
  return executeCommand(["setup", "alias", "add", email, recipient], containerName, `Alias añadido para ${email} apuntando a ${recipient}.`);
};

// Eliminar un alias
export const deleteAlias = async (email: string, recipient: string, containerName: string): Promise<string> => {
  return executeCommand(["setup", "alias", "del", email, recipient], containerName, `Alias eliminado para ${email}.`);
};

// Establecer la cuota de un correo
export const setQuota = async (email: string, quota: string, containerName: string): Promise<string> => {
  return executeCommand(["setup", "quota", "set", email, quota], containerName, `Cuota de ${quota} establecida para ${email}.`);
};

// Eliminar la cuota de un correo
export const deleteQuota = async (email: string, containerName: string): Promise<string> => {
  return executeCommand(["setup", "quota", "del", email], containerName, `Cuota eliminada para ${email}.`);
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
        console.log(successMessage);
        resolve(outputBuffer.trim());
      } else {
        console.error(`Error al ejecutar el comando. Código de salida: ${code}`);
        console.error(`Salida del proceso:\n${outputBuffer}`);
        reject(new Error(`Error al ejecutar el comando. Código de salida: ${code}\nOutput:\n${outputBuffer}`));
      }
    });

    // Manejar errores en el proceso
    process.on("error", (err: Error) => {
      console.error(`Error en el proceso: ${err.message}`);
      reject(new Error(`Error en el proceso: ${err.message}`));
    });
  });
};
