import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

import notaryController from './controller/notary-controller';
import sgbdController from './controller/sgbd-controller';
import logController from './controller/log-controller';
import diskController from './controller/disk-controller';

import validateTokenToCheckId from './middleware/token-middleware';
import jwtMiddleware from './middleware/jwt-middleware';
import validateMiddleware from './middleware/validate-middleware';
import { validateRequest } from './middleware/validate-request';

const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(compression());

app.set('port', process.env.PORT || 8000);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/notary/:id', [
    validateMiddleware.notary('id'),
    validateRequest
], notaryController.checkId);

app.patch('/api/notary/:id/register', [
    validateTokenToCheckId,
    validateMiddleware.notary('id'),
    validateMiddleware.notary('password'),
    validateRequest
], notaryController.updateToken);

app.post('/api/notary/authentication', [
    validateMiddleware.notary('id'),
    validateMiddleware.notary('password'),
    validateRequest
], notaryController.validateLogin);

app.patch('/api/notary/:id/web-backup', jwtMiddleware.check, [
    validateMiddleware.notary('active'),
    validateMiddleware.notary('path'),
    validateRequest
], notaryController.webBackup);

//ROUTES TO SGBD
app.get('/api/sgbd', jwtMiddleware.check, sgbdController.findByNotary);

app.post('/api/sgbd', jwtMiddleware.check, [
    validateMiddleware.sgbd(),
    validateRequest
], sgbdController.create);

app.patch('/api/sgbd', jwtMiddleware.check, [
    validateMiddleware.sgbd(),
    validateRequest
], sgbdController.update);

//ROUTES TO LOG
app.post('/api/notary/sgbd/log', jwtMiddleware.check, [
    validateMiddleware.notary('id'),
    validateMiddleware.log()
], logController.create);

//ROUTES TO DISK
app.put('/api/notary/disk', jwtMiddleware.check, [
    validateMiddleware.notary('id'),
    validateMiddleware.disk()
], diskController.create);

app.post('/api/notary/:id/disc/:prefix/backup');

app.post('/api/notary/disc/backup/repository');

app.listen(app.get('port'), function () {
    console.log('Node app is running on port: ' + app.get('port'));
});

export default app;