import { Router, Request, Response, RequestHandler } from 'express';
import { createEmail,
    updatePassword, 
    deleteEmail, 
    listEmails,
    addAlias,
    deleteAlias,
    setQuota,
    deleteQuota,
    configureDKIM,
    addRelayAuth,
    addRelayDomain,
    excludeRelayDomain,
    banIp,
    unbanIp,
    fail2BanLogs,
    fail2BanStatus,
    debugCommand,
    addDovecotMasterUser,
    updateDovecotMasterUser,
    deleteDovecotMasterUser,
    listDovecotMasterUsers


 } from '../controllers/emailController';

const router = Router();


router.post('/emails', createEmail);
router.put('/emails/:email', updatePassword); 
router.delete('/emails/:email', deleteEmail); 
router.get('/emails', listEmails); 


router.post('/emails/alias/', addAlias); 
router.delete('/emails/alias/', deleteAlias); 


router.post('/emails/quota', setQuota); 
router.delete('/emails/quota', deleteQuota); 


router.post('/config/dkim', configureDKIM); 

router.post('/relay/auth', addRelayAuth); 
router.post('/relay/domain', addRelayDomain); 
router.delete('/relay/domain', excludeRelayDomain); 


router.post('/fail2ban/ban-ip', banIp as RequestHandler); 
router.post('/fail2ban/unban-ip', unbanIp as RequestHandler); 
router.get('/fail2ban/logs', fail2BanLogs); 
router.get('/fail2ban/status', fail2BanStatus); 


router.post('/debug', debugCommand);


router.post('/dovecot-master', addDovecotMasterUser as RequestHandler); 
router.put('/dovecot-master/', updateDovecotMasterUser as RequestHandler); 
router.post('/dovecot-master/', deleteDovecotMasterUser as RequestHandler); 
router.get('/dovecot-master/', listDovecotMasterUsers); 

export default router;
