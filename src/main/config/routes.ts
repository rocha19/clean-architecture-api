import { Router, Express } from 'express';
import { readdirSync } from 'fs';

export default (app: Express): void => {
  const router = Router();
  app.use('/api/v1', router);
  readdirSync(`${__dirname}/routes`).map(async file => {
    (await import(`${__dirname}/routes/${file}`)).default(router);
  });
};
