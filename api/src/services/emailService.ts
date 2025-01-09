
import fs from 'fs';
import { exec } from "child_process";
import util from "util";
import { spawn } from "child_process";

const execPromise = util.promisify(exec);



export const createNewEmail = async (email: string, password: string, containerName: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const process = spawn("docker", ["exec", "-it", containerName, "setup", "email", "add", email]);

    process.stdout.on("data", (data) => {
      const output = data.toString();
      if (output.includes("Enter Password:")) {
        process.stdin.write(`${password}\n`);
      }
    });

    process.stderr.on("data", (data) => {
      console.error(`Error: ${data.toString()}`);
      reject(new Error(data.toString()));
    });

    process.on("close", (code) => {
      if (code === 0) {
        resolve(`Correo ${email} creado correctamente.`);
      } else {
        reject(new Error(`No se pudo crear el correo ${email}.`));
      }
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
