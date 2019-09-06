import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

import notaryController from './controller/notary-controller';
import sgbdController from './controller/sgbd-controller';
import logController from './controller/log-controller';
import diskController from './controller/disc-controller';
import backupController from './controller/backup-controller';

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

app.patch('/api/sgbd/:id', jwtMiddleware.check, [
    validateMiddleware.sgbd(),
    validateRequest
], sgbdController.update);

//ROUTES TO LOG
app.get('/api/log/sgbd/:id', jwtMiddleware.check, logController.findBySgbd);

app.post('/api/log', jwtMiddleware.check, [
    validateMiddleware.log(),
    validateRequest
], logController.create);

//ROUTES TO DISK
app.get('/api/discs', jwtMiddleware.check, diskController.findByNotary);

app.get('/api/disc/:label', jwtMiddleware.check, diskController.findByNotaryAndLabel);

app.post('/api/disc', jwtMiddleware.check, [
    validateMiddleware.disk(),
    validateRequest
], diskController.create);

app.patch('/api/disc/:id', jwtMiddleware.check, [
    validateMiddleware.disk(),
    validateRequest
], diskController.update);

//ROUTES TO BACKUP
app.get('/api/backup/disc/:id', jwtMiddleware.check, [
    validateMiddleware.isInt('id'),
    validateRequest
], backupController.findByDisk);

app.post('/api/backup', jwtMiddleware.check, [
    validateMiddleware.isInt('idDisc'),
    validateMiddleware.isString('path'),
    validateMiddleware.isString('type'),
    validateMiddleware.isString('size'),
    validateMiddleware.isInt('qtdBaseBackup'),
    validateMiddleware.isBoolean('hasController'),
    validateMiddleware.isBoolean('hasCompression'),
    validateMiddleware.isString('folderCreatedAt'),
    validateMiddleware.isString('folderChangedAt'),
    validateMiddleware.isString('folderVisitedAt'),
    validateRequest
], backupController.create);

app.patch('/api/backup/:id', jwtMiddleware.check, [
    validateMiddleware.isInt('id'),
    validateRequest
],backupController.update);

//ROUTES TO REPOSITORY

app.listen(app.get('port'), function () {
    console.log('Node app is running on port: ' + app.get('port'));
});

export default app;