import { exec } from 'child_process';
import fs from 'fs';
import util from 'util';

const execPromise = util.promisify(exec);

// Crear un nuevo correo
export const createNewEmail = async (email: string, password: string): Promise<string> => {
  const containerName = 'mailserver-xg0gwco08g000g0k0kw8g0k0-095522042644'; 
  const command = `docker exec ${containerName} setup email add ${email} --password ${password}`;
  
  try {
    const { stdout } = await execPromise(command);
    return `Correo ${email} creado correctamente.\nSalida: ${stdout}`;
  } catch (error) {
    throw new Error(`Error al crear el correo ${email}: ${error}`);
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
