import e, { Request, Response } from 'express';
import { createNewEmail, updateEmailPassword, deleteExistingEmail, getAllEmails } from '../services/emailService';

export const createEmail = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await createNewEmail(email, password );
    res.status(201).json({ message: result });
  } catch (error) { 
    if(error instanceof Error) {
    res.status(500).json({ error: error.message });
    }else{
        res.status(500).json({ error: error });
    }
  }     
};

export const updatePassword = async (req: Request, res: Response) => {
  const { email } = req.params;
  const { password } = req.body;
  try {
    const result = await updateEmailPassword(email, password);
    res.status(200).json({ message: result });
  } catch (error) {
    if(error instanceof Error) {
        res.status(500).json({ error: error.message });
      }else{
        res.status(500).json({ error: error });
    }
  }
};

export const deleteEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const result = await deleteExistingEmail(email);
    res.status(200).json({ message: result });
  } catch (error) {
    if(error instanceof Error) {
        res.status(500).json({ error: error.message });
      }else{
        res.status(500).json({ error: error });
    }
  }
};

export const listEmails = async (req: Request, res: Response) => {
  try {
    const emails = await getAllEmails();
    res.status(200).json({ emails });
  } catch (error) {
    if(error instanceof Error) {
      res.status(500).json({ error: error.message });
    }else{
      res.status(500).json({ error: error });
    }
  }
};
