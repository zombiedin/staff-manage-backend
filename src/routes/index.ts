/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable node/no-unsupported-features/es-syntax */
// eslint-disable-next-line eslint-comments/no-duplicate-disable
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable node/no-missing-import */

import { Express } from 'express';
import clickupRoute from '../routes/clickup';
import hrdRoute from '../routes/hrd';
import projectRoute from '../routes/project';
/**
 *
 * @param {Express} app - The Express app instance to configure.
 */
export function setupRoutes(app: Express) {
  app.use('/api/cu', clickupRoute);
  app.use('/api/dc', hrdRoute);
  app.use('/api/db', projectRoute);
}
