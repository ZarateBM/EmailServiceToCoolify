import e, { Request, Response } from 'express';
import { createNewEmailService,
  updateEmailPasswordService,
  deleteExistingEmailService,
  getAllEmailsService ,
  addAliasService,
  deleteAliasService,
  setQuotaService,
  deleteQuotaService,
  configureDKIMService,
  addRelayAuthService,
  addRelayDomainService,
  excludeRelayDomainService,
  fail2BanActionService,
  debugCommandService,
  manageDovecotMasterService,

}
from '../services/emailService';

export const createEmail = async (req: Request, res: Response) => {
  const { email, password , containerName} = req.body;
  try {
    const result = await createNewEmailService(email, password );
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
    const result = await updateEmailPasswordService(email, password);
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
    const result = await deleteExistingEmailService(email);
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
    const emails = await getAllEmailsService();
    res.status(200).json({ emails });
  } catch (error) {
    if(error instanceof Error) {
      res.status(500).json({ error: error.message });
    }else{
      res.status(500).json({ error: error });
    }
  }
};

export const addAlias = async (req: Request, res: Response) => {  
  const { email, recipient } = req.body;
  try {
    const result = await addAliasService(email, recipient);
    res.status(201).json({ message: result });
  } catch (error) {
    if(error instanceof Error) {
      res.status(500).json({ error: error.message });
    }else{
      res.status(500).json({ error: error });
    }
  }
}

export const deleteAlias = async (req: Request, res: Response) => {
  const { email, recipient } = req.body;
  try {
    const result = await deleteAliasService(email, recipient);
    res.status(200).json({ message: result });
  } catch (error) {
    if(error instanceof Error) {
      res.status(500).json({ error: error.message });
    }else{
      res.status(500).json({ error: error });
    }
  }
}

export const setQuota = async (req: Request, res: Response) => {
  const { email, quota } = req.body;
  try {
    const result = await setQuotaService(email, quota);
    res.status(200).json({ message: result });
  } catch (error) {
    if(error instanceof Error) {
      res.status(500).json({ error: error.message });
    }else{
      res.status(500).json({ error: error });
    }
  }
}

export const deleteQuota = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const result = await deleteQuotaService(email);
    res.status(200).json({ message: result });
  } catch (error) {
    if(error instanceof Error) {
      res.status(500).json({ error: error.message });
    }else{
      res.status(500).json({ error: error });
    }
  }
}
export const configureDKIM = async (req: Request, res: Response) => {
  const { args } = req.body;
  try {
    const result = await configureDKIMService(args);
    res.status(200).json({ message: result });
  } catch (error) {
    if(error instanceof Error) {
      res.status(500).json({ error: error.message });
    }else{
      res.status(500).json({ error: error });
    }
  }
}
export const addRelayAuth = async (req: Request, res: Response) => {
  const { domain, username, password } = req.body;
  try {
    const result = await addRelayAuthService(domain, username, password);
    res.status(201).json({ message: result });
  } catch (error) {
    if(error instanceof Error) {
      res.status(500).json({ error: error.message });
    }else{
      res.status(500).json({ error: error });
    }
  }
}
export const addRelayDomain = async (req: Request, res: Response) => {
  const { domain, host, port } = req.body;
  try {
    const result = await addRelayDomainService(domain, host, port);
    res.status(201).json({ message: result });
  } catch (error) {
    if(error instanceof Error) {
      res.status(500).json({ error: error.message });
    }else{
      res.status(500).json({ error: error });
    }
  }
}
export const excludeRelayDomain = async (req: Request, res: Response) => {
  const { domain } = req.body;
  try {
    const result = await excludeRelayDomainService(domain);
    res.status(200).json({ message: result });
  } catch (error) {
    if(error instanceof Error) {
      res.status(500).json({ error: error.message });
    }else{
      res.status(500).json({ error: error });
    }
  }
}
export const banIp = async (req: Request, res: Response) => {
  const { ip } = req.body;

  if (!ip) {
    return res.status(400).json({ error: "El campo 'ip' es obligatorio." });
  }

  try {
    const result = await fail2BanActionService("ban", ip);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : error });
  }
};

export const unbanIp = async (req: Request, res: Response) => {
  const { ip } = req.body;

  if (!ip) {
    return res.status(400).json({ error: "El campo 'ip' es obligatorio." });
  }

  try {
    const result = await fail2BanActionService("unban", ip);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : error });
  }
};


export const fail2BanLogs = async ( res: Response) => {
  try {
    const result = await fail2BanActionService("log", null);
    res.status(200).json({ logs: result });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};

export const fail2BanStatus = async (req: Request, res: Response) => {
  try {
    const result = await fail2BanActionService("status", null);
    res.status(200).json({ status: result });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};


export const debugCommand = async (req: Request, res: Response) => {
  const { args } = req.body;
  const { type } = req.body;
  try {
    const result = await debugCommandService(type ,args);
    res.status(200).json({ message: result });
  } catch (error) {
    if(error instanceof Error) {
      res.status(500).json({ error: error.message });
    }else{
      res.status(500).json({ error: error });
    }
  }
}


export const addDovecotMasterUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Los campos 'username' y 'password' son obligatorios." });
  }

  try {
    const result = await manageDovecotMasterService("add", username, password);
    res.status(201).json({ message: result });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};

export const updateDovecotMasterUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Los campos 'username' y 'password' son obligatorios." });
  }

  try {
    const result = await manageDovecotMasterService("update", username, password);
    res.status(200).json({ message: result });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};

export const deleteDovecotMasterUser = async (req: Request, res: Response) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "El campo 'username' es obligatorio." });
  }

  try {
    const result = await manageDovecotMasterService("del", username, null);
    res.status(200).json({ message: result });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};

export const listDovecotMasterUsers = async (req: Request, res: Response) => {
  try {
    const result = await manageDovecotMasterService("list", "", null);
    const users = result.split("\n").filter((line) => line.trim() !== ""); // Parsear la salida para obtener usuarios
    res.status(200).json({ users });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};


