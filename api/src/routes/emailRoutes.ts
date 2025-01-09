import { Router } from 'express';
import { createEmail, updatePassword, deleteEmail, listEmails } from '../controllers/emailController';

const router = Router();

router.post('/', createEmail); 
router.put('/:email', updatePassword); 
router.delete('/:email', deleteEmail); 
router.get('/', listEmails);

export default router;
