"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEmails = exports.deleteExistingEmail = exports.updateEmailPassword = exports.createNewEmail = void 0;
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const execPromise = util_1.default.promisify(child_process_1.exec);
// Crear un nuevo correo
const createNewEmail = async (email, password) => {
    const command = `./setup.sh email add ${email} --password ${password}`;
    await execPromise(command);
    return `Correo ${email} creado correctamente.`;
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
