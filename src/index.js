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

//console.log(req.headers['x-forwarded-for']);

app.get('/api/notary/:id', [
    validateMiddleware.isInt('id', { min: 1, max: 3}),
    validateRequest
], notaryController.checkId);

app.patch('/api/notary/:id/register', [
    validateTokenToCheckId,
    validateMiddleware.isInt('id', { min: 1, max: 3}),
    validateMiddleware.isString('password', { min: 15, max: 25}),
    validateRequest
], notaryController.updateToken);

app.post('/api/notary/authentication', [
    validateMiddleware.isInt('id', { min: 1, max: 3}),
    validateMiddleware.isString('password', { min: 15, max: 25}),
    validateRequest
], notaryController.validateLogin);

app.patch('/api/notary/:id/web-backup', jwtMiddleware.check, [
    validateMiddleware.isBoolean('active'),
    validateMiddleware.isString('path'),
    validateRequest
], notaryController.webBackup);

//ROUTES TO SGBD
app.get('/api/sgbd', jwtMiddleware.check, sgbdController.findByNotary);

app.post('/api/sgbd', jwtMiddleware.check, [
    validateMiddleware.isString('description'),
    validateMiddleware.isString('baseDirectory'),
    validateMiddleware.isString('dataDirectory'),
    validateMiddleware.isInt('port', 4),
    validateMiddleware.isString('dbName'),
    validateMiddleware.isString('size'),
    validateRequest
], sgbdController.create);

app.patch('/api/sgbd/:id', jwtMiddleware.check, [
    validateMiddleware.isInt('id'),
    validateMiddleware.isString('description'),
    validateMiddleware.isString('baseDirectory'),
    validateMiddleware.isString('dataDirectory'),
    validateMiddleware.isInt('port', 4),
    validateMiddleware.isString('dbName'),
    validateMiddleware.isString('size'),
    validateRequest
], sgbdController.update);

//ROUTES TO LOG
app.get('/api/log/sgbd/:id', jwtMiddleware.check, logController.findBySgbd);

app.post('/api/log', jwtMiddleware.check, [
    validateMiddleware.isInt('idSgbd'),
    validateMiddleware.isString('content'),
    validateRequest
], logController.create);

//ROUTES TO DISK
app.get('/api/discs', jwtMiddleware.check, diskController.findByNotary);

app.get('/api/disc/:label', jwtMiddleware.check, diskController.findByNotaryAndLabel);

app.post('/api/disc', jwtMiddleware.check, [
    validateMiddleware.isString('label'),
    validateMiddleware.isString('type'),
    validateMiddleware.isString('filesystem'),
    validateMiddleware.isString('totalSpace'),
    validateMiddleware.isString('usedSpace'),
    validateMiddleware.isString('freeSpace'),
    validateMiddleware.isInt('percentageOfUse'),
    validateRequest
], diskController.create);

app.patch('/api/disc/:id', jwtMiddleware.check, [
    validateMiddleware.isInt('id'),
    validateRequest
], diskController.update);

//ROUTES TO BACKUP
app.get('/api/backup/disc/:id', jwtMiddleware.check, [
    validateMiddleware.isInt('id'),
    validateRequest
], backupController.findByDisk);

app.post('/api/backup', jwtMiddleware.check, [
    validateMiddleware.isInt('idDisc'),
    validateMiddleware.isString('path', 10),
    validateMiddleware.isString('type', 4),
    validateMiddleware.isString('size', 3),
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