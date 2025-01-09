
import fs from 'fs';
import { exec } from "child_process";
import util from "util";
import path from "path";

const execPromise = util.promisify(exec);

export const createNewEmail = async (email: string, password: string, containerName: string): Promise<string> => {
  const scriptPath = path.resolve(__dirname, "create_email.sh"); // Ruta al script

  try {
    await execPromise(`bash ${scriptPath} ${containerName} ${email} ${password}`);
    return `Correo ${email} creado correctamente.`;
  } catch (error) {
    console.error(`Error al crear el correo: ${error}`);
    throw new Error(`No se pudo crear el correo ${email}.`);
  }
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
