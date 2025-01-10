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

router.post('/', createEmail); 
router.put('/:email', updatePassword); 
router.delete('/:email', deleteEmail); 
router.get('/', listEmails);

router.post('/alias', addAlias);
router.delete('/alias', deleteAlias);

router.post('/quota', setQuota);
router.delete('/quota', deleteQuota);

router.post('/dkim', configureDKIM);

router.post('/relay/auth', addRelayAuth);
router.post('/relay/domain', addRelayDomain);
router.delete('/relay/domain', excludeRelayDomain);

router.post('/ban-ip', banIp as RequestHandler);
router.post('/unban-ip', unbanIp as RequestHandler);

router.get('/fail2ban/logs', fail2BanLogs);
router.get('/fail2ban/status', fail2BanStatus);

router.post('/debug', debugCommand);




router.post("/dovecot-master/add", addDovecotMasterUser as RequestHandler);
router.post("/dovecot-master/update", updateDovecotMasterUser as RequestHandler);
router.post("/dovecot-master/delete", deleteDovecotMasterUser as RequestHandler);
router.get("/dovecot-master/list", listDovecotMasterUsers);

export default router;
