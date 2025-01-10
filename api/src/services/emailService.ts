
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

    let outputBuffer = ""; // Para acumular la salida y analizarla

    // Capturar y manejar la salida estándar
    process.stdout.on("data", (data) => {
      const output = data.toString();
      outputBuffer += output; // Acumular la salida para depuración
      console.log(`STDOUT: ${output}`); // Mostrar la salida en tiempo real

      // Detectar cuando la consola pide la contraseña
      if (output.includes("Enter Password:")) {
        console.log("Consola solicita la contraseña, enviándola...");
        process.stdin.write(`${password}\n`); // Enviar la contraseña
      }
    });

    // Capturar y manejar los errores estándar
    process.stderr.on("data", (data: Buffer) => {
      const errorOutput = data.toString();
      console.error(`STDERR: ${errorOutput}`); // Mostrar errores en tiempo real
    });

    // Escuchar el evento de cierre del proceso
    process.on("close", (code: number) => {
      console.log(`El proceso ha finalizado con código: ${code}`);
      if (code === 0) {
        console.log(`Correo ${email} creado correctamente.`);
        resolve(`Correo ${email} creado correctamente.`);
      } else {
        console.error(`No se pudo crear el correo ${email}. Código de salida: ${code}`);
        reject(new Error(`No se pudo crear el correo ${email}. Código de salida: ${code}\nOutput:\n${outputBuffer}`));
      }
    });

    // Manejar errores en el proceso
    process.on("error", (err: Error) => {
      console.error(`Error en el proceso: ${err.message}`);
      reject(new Error(`Error en el proceso: ${err.message}`));
    });

    // Tiempo de espera máximo (opcional)
    setTimeout(() => {
      if (process.exitCode === null) {
        console.error("El proceso tardó demasiado tiempo. Matándolo...");
        process.kill();
        reject(new Error("El proceso tardó demasiado tiempo y fue terminado."));
      }
    }, 10000); // 10 segundos de espera como máximo
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
