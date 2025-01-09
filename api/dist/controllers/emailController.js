"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listEmails = exports.deleteEmail = exports.updatePassword = exports.createEmail = void 0;
const emailService_1 = require("../services/emailService");
const createEmail = async (req, res) => {
    const { email, password, containerName } = req.body;
    try {
        const result = await (0, emailService_1.createNewEmail)(email, password, containerName);
        res.status(201).json({ message: result });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error });
        }
    }
};
exports.createEmail = createEmail;
const updatePassword = async (req, res) => {
    const { email } = req.params;
    const { password } = req.body;
    try {
        const result = await (0, emailService_1.updateEmailPassword)(email, password);
        res.status(200).json({ message: result });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error });
        }
    }
};
exports.updatePassword = updatePassword;
const deleteEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const result = await (0, emailService_1.deleteExistingEmail)(email);
        res.status(200).json({ message: result });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error });
        }
    }
};
exports.deleteEmail = deleteEmail;
const listEmails = async (req, res) => {
    try {
        const emails = await (0, emailService_1.getAllEmails)();
        res.status(200).json({ emails });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error });
        }
    }
};
exports.listEmails = listEmails;
