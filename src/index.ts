// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsdoc/require-jsdoc */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable node/no-missing-import */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable node/no-unsupported-features/es-syntax */
import express from 'express';
import helmet from 'helmet';
import setupSwagger from './utils/swagger';
import { COMMIT_ID } from './commit-id';
import { setupRoutes } from './routes/index';
require('dotenv').config();

const app = express();
const port = process.env.APP_PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('X-commit-ID', COMMIT_ID);
  next();
});

app.use(express.json());
app.use(helmet());

setupRoutes(app);
setupSwagger(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
