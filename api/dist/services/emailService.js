"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testhelp = exports.getAllEmails = exports.deleteExistingEmail = exports.updateEmailPassword = exports.createNewEmail = void 0;
const child_process_1 = require("child_process");
const util_1 = __importDefault(require("util"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const execPromise = util_1.default.promisify(child_process_1.exec);
// Ruta del script de expect temporal
const EXPECT_SCRIPT_PATH = path_1.default.join(__dirname, "create_email_expect.sh");
// Función para generar dinámicamente el script de expect
const generateExpectScript = (containerName, email, password) => {
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
const createNewEmail = async (email, password, containerName) => {
    console.log(`Creando correo ${email}...`);
    // Generar el script de expect dinámicamente
    const scriptContent = generateExpectScript(containerName, email, password);
    // Guardar el script en un archivo temporal
    fs_1.default.writeFileSync(EXPECT_SCRIPT_PATH, scriptContent, { mode: 0o755 }); // Dar permisos de ejecución al archivo
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
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error al crear el correo: ${error.message}`);
            throw new Error(`No se pudo crear el correo ${email}.`);
        }
        else {
            console.error(`Error insesperado: ${error}`);
        }
        throw new Error(`No se pudo crear el correo ${email}.`);
    }
    finally {
        // Eliminar el archivo temporal del script de expect
        if (fs_1.default.existsSync(EXPECT_SCRIPT_PATH)) {
            fs_1.default.unlinkSync(EXPECT_SCRIPT_PATH);
        }
    }
};
exports.createNewEmail = createNewEmail;
// Actualizar contraseña
const updateEmailPassword = async (email, password) => {
    const command = `./setup.sh email update ${email} --password ${password}`;
    await execPromise(command);
    return `Contraseña del correo ${email} actualizada correctamente.`;
};
exports.updateEmailPassword = updateEmailPassword;
// Eliminar un correo
const deleteExistingEmail = async (email) => {
    const command = `./setup.sh email del ${email}`;
    await execPromise(command);
    return `Correo ${email} eliminado correctamente.`;
};
exports.deleteExistingEmail = deleteExistingEmail;
// Listar todos los correos
const getAllEmails = async () => {
    const accountsFile = '/path/to/config/postfix-accounts.cf';
    const data = fs_1.default.readFileSync(accountsFile, 'utf-8');
    return data.split('\n').filter(line => line.trim() !== '').map(line => line.split('|')[0]);
};
exports.getAllEmails = getAllEmails;
const testhelp = async () => {
    const accountsFile = '/path/to/config/postfix-accounts.cf';
    const data = fs_1.default.readFileSync(accountsFile, 'utf-8');
    return data.split('\n').filter(line => line.trim() !== '').map(line => line.split('|')[0]);
};
exports.testhelp = testhelp;
