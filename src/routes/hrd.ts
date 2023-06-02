/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable node/no-missing-import */
// eslint-disable-next-line node/no-unsupported-features/es-syntax
import express from 'express';
// eslint-disable-next-line node/no-unsupported-features/es-syntax
import { retrieve } from '../controllers/hrd';

const router = express.Router();

router.get('/retrieve', retrieve);

// eslint-disable-next-line node/no-unsupported-features/es-syntax
export default router;
