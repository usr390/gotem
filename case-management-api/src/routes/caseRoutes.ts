import { Router } from 'express';
import { caseController } from '../controllers/caseController';

const router = Router();

router.post('/', caseController.createCase);
router.get('/', caseController.getCases);
router.patch('/:id', caseController.updateCase);

export default router;