/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable node/no-missing-import */
// eslint-disable-next-line node/no-unsupported-features/es-syntax
import express from 'express';
// eslint-disable-next-line node/no-unsupported-features/es-syntax
import { retrieve, test } from '../controllers/clickup';

const router = express.Router();

router.get('/retrieve', retrieve);
router.get('/test', test);
// router.get('/create', create)
router.get('/project/:id');

// eslint-disable-next-line node/no-unsupported-features/es-syntax
export default router;
