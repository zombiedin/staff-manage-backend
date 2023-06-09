/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable node/no-missing-import */
// eslint-disable-next-line node/no-unsupported-features/es-syntax
import express from 'express';
// eslint-disable-next-line node/no-unsupported-features/es-syntax
import { deleteProject, deleteTSS, getProjects, mockupTSS } from '../controllers/project';

const router = express.Router();

router.get('/project', getProjects);
router.post('/mockuptss', mockupTSS);
router.delete('/mockuptss', deleteTSS);
router.delete('/allproject', deleteProject);

// eslint-disable-next-line node/no-unsupported-features/es-syntax
export default router;
