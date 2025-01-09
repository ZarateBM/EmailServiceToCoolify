import { exec } from 'child_process';
import fs from 'fs';
import util from 'util';

const execPromise = util.promisify(exec);

export const createNewEmail = async (email: string, password: string , containerName:string): Promise<string> => {
  const scriptPath = "./services/create_email.sh"; // Ruta al script `expect`

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
