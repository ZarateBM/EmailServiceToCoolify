import { exec, spawn } from "child_process";
import util from "util";
import fs from "fs";
import path from "path";

const execPromise = util.promisify(exec);

// Ruta del script de expect temporal
const EXPECT_SCRIPT_PATH = path.join(__dirname, "create_email_expect.sh");

// Función para generar dinámicamente el script de expect
const generateExpectScript = (containerName: string, email: string, password: string): string => {
  return `#!/usr/bin/expect -f

set containerName [lindex $argv 0]
set email [lindex $argv 1]
set password [lindex $argv 2]

spawn docker exec -it $containerName setup email add $email
expect "Enter Password:"
send "$password\\r"
expect eof
`;
};

// Función para crear un correo electrónico
export const createNewEmail = async (email: string, password: string, containerName: string): Promise<string> => {
  console.log(`Creando correo ${email}...`);

  // Generar el script de expect dinámicamente
  const scriptContent = generateExpectScript(containerName, email, password);

  // Guardar el script en un archivo temporal
  fs.writeFileSync(EXPECT_SCRIPT_PATH, scriptContent, { mode: 0o755 }); // Dar permisos de ejecución al archivo

  try {
    // Ejecutar el script de expect
    const { stdout, stderr } = await execPromise(`expect ${EXPECT_SCRIPT_PATH} ${containerName} ${email} ${password}`);

    // Registrar la salida para depuración
    if (stderr) {
      console.error(`Error: ${stderr}`);
      throw new Error(stderr);
    }

    console.log(`STDOUT: ${stdout}`);
    return `Correo ${email} creado correctamente.`;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error al crear el correo: ${error.message}`);
      throw new Error(`No se pudo crear el correo ${email}.`);
    } else {
      console.error(`Error insesperado: ${error}`);
    }
    throw new Error(`No se pudo crear el correo ${email}.`);
  } finally {
    // Eliminar el archivo temporal del script de expect
    if (fs.existsSync(EXPECT_SCRIPT_PATH)) {
      fs.unlinkSync(EXPECT_SCRIPT_PATH);
    }
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
