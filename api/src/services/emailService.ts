
import fs from 'fs';
import { exec, spawn } from "child_process";
import util from "util";
import path from "path";
import axios from 'axios';

const execPromise = util.promisify(exec);


export const createNewEmail = async (email: string, password: string): Promise<string> => {
  try {
    const response = await axios.post('http://mailserver:5000/email/add', { email, password });
    return response.data.message;
  } catch (error: any) {
    console.error(`Error al crear el correo: ${error.response?.data?.error || error.message}`);
    throw new Error('No se pudo crear el correo.');
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
