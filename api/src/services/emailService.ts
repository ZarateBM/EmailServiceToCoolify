import { exec } from 'child_process';
import fs from 'fs';
import util from 'util';

const execPromise = util.promisify(exec);

// Ejecutar un comando de setup.sh en el contenedor `executor`
const executeSetupCommand = async (command: string): Promise<string> => {
  const fullCommand = `docker exec executor /config/setup.sh ${command}`;
  try {
    const { stdout } = await execPromise(fullCommand);
    return stdout;
  } catch (error: any) {
    throw new Error(`Error ejecutando el comando: ${error.stderr || error.message}`);
  }
};

// Crear un nuevo correo
export const createNewEmail = async (email: string, password: string): Promise<string> => {
  const command = `email add ${email} --password ${password}`;
  const result = await executeSetupCommand(command);
  return `Correo ${email} creado correctamente: ${result}`;
};

// Actualizar contraseña
export const updateEmailPassword = async (email: string, password: string): Promise<string> => {
  const command = `email update ${email} --password ${password}`;
  const result = await executeSetupCommand(command);
  return `Contraseña del correo ${email} actualizada correctamente: ${result}`;
};

// Eliminar un correo
export const deleteExistingEmail = async (email: string): Promise<string> => {
  const command = `email del ${email}`;
  const result = await executeSetupCommand(command);
  return `Correo ${email} eliminado correctamente: ${result}`;
};

// Listar todos los correos
export const getAllEmails = async (): Promise<string[]> => {
  const accountsFile = './config/postfix-accounts.cf'; // Asegúrate de que la ruta sea correcta
  try {
    const data = fs.readFileSync(accountsFile, 'utf-8');
    return data
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((line) => line.split('|')[0]);
  } catch (error: any) {
    throw new Error(`Error leyendo el archivo de cuentas: ${error.message}`);
  }
};
