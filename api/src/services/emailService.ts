
import fs from 'fs';
import { exec, spawn } from "child_process";
import util from "util";
import path from "path";

const execPromise = util.promisify(exec);

export const createNewEmail = async (email: string, password: string, containerName: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    console.log(`Iniciando el proceso para crear el correo: ${email}`);
    
    // Ejecutar el comando de Docker dentro del contenedor
    const process = spawn("docker", ["exec", "-i", containerName, "setup", "email", "add", email]);

    let outputBuffer = ""; // Para capturar la salida y analizarla

    // Capturar y manejar la salida estándar
    process.stdout.on("data", (data) => {
      const output = data.toString();
      outputBuffer += output;
      console.log(`STDOUT: ${output}`); // Registrar la salida para depuración

      // Detectar cuando la consola pide la contraseña
      if (output.includes("Enter Password:")) {
        console.log("Consola solicita la contraseña, enviándola...");
        process.stdin.write(`${password}\n`); // Enviar la contraseña
      }
    });

    // Capturar y manejar los errores estándar
    process.stderr.on("data", (data: Buffer) => {
      console.error(`STDERR: ${data.toString()}`); // Registrar errores
      reject(new Error(`Error al ejecutar el comando: ${data.toString()}`));
    });

    // Escuchar el evento de cierre del proceso
    process.on("close", (code: number) => {
      console.log(`El proceso ha finalizado con código: ${code}`);
      if (code === 0) {
        console.log(`Correo ${email} creado correctamente.`);
        resolve(`Correo ${email} creado correctamente.`);
      } else {
        console.error(`No se pudo crear el correo ${email}. Código de salida: ${code}`);
        reject(new Error(`No se pudo crear el correo ${email}. Código de salida: ${code}`));
      }
    });

    // Manejar errores en el proceso
    process.on("error", (err: Error) => {
      console.error(`Error en el proceso: ${err.message}`);
      reject(new Error(`Error en el proceso: ${err.message}`));
    });
  });
};


// Actualizar contraseña
export const updateEmailPassword = async (email: string, password: string): Promise<string> => {
  const command = `./setup.sh email update ${email} --password ${password}`;
  await execPromise(command);
  return `Contraseña del correo ${email} actualizada correctamente.`;
};

// Eliminar un correo
export const deleteExistingEmail = async (email: string): Promise<string> => {
  const command = `./setup.sh email del ${email}`;
  await execPromise(command);
  return `Correo ${email} eliminado correctamente.`;
};

// Listar todos los correos
export const getAllEmails = async (): Promise<string[]> => {
  const accountsFile = '/path/to/config/postfix-accounts.cf';
  const data = fs.readFileSync(accountsFile, 'utf-8');
  return data.split('\n').filter(line => line.trim() !== '').map(line => line.split('|')[0]);
};

export const testhelp = async (): Promise<string[]> => {
  const accountsFile = '/path/to/config/postfix-accounts.cf';
  const data = fs.readFileSync(accountsFile, 'utf-8');
  return data.split('\n').filter(line => line.trim() !== '').map(line => line.split('|')[0]);
};
