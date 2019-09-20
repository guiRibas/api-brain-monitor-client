import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

import notaryController from './controller/notary-controller';
import sgbdController from './controller/sgbd-controller';
import logController from './controller/log-controller';
import diskController from './controller/disk-controller';
import backupController from './controller/backup-controller';
import repositoryController from './controller/repository-controller';

import validateTokenToCheckId from './middleware/token-middleware';
import jwtMiddleware from './middleware/jwt-middleware';
import validateMiddleware from './middleware/validate-middleware';
import { validateRequest } from './middleware/validate-request';

const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(helmet());
app.use(compression());

app.set('port', process.env.PORT || 8000);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//console.log(req.headers['x-forwarded-for']);

app.get('/api/notary/:id', [
    validateMiddleware.isInt('id'),
    validateRequest
], notaryController.checkId);

app.patch('/api/notary/:id/register', [
    validateTokenToCheckId,
    validateMiddleware.isInt('id'),
    validateMiddleware.isString('password'),
    validateRequest
], notaryController.updateToken);

app.post('/api/notary/authentication', [
    validateMiddleware.isInt('id'),
    validateMiddleware.isString('password'),
    validateRequest
], notaryController.validateLogin);

//ROUTES TO WEB BACKUP
app.patch('/api/notary/:id/web-backup', jwtMiddleware.check, [
    validateMiddleware.isBoolean('status'),
    validateMiddleware.isString('path', { min: 10, max: 60 }),
    validateRequest
], notaryController.webBackup);

//ROUTES TO SGBD
app.get('/api/sgbd', jwtMiddleware.check, sgbdController.findByNotary);

app.post('/api/sgbd', jwtMiddleware.check, [
    validateMiddleware.isString('description', { min: 10, max: 60 }),
    validateMiddleware.isString('baseDirectory', { min: 10, max: 60 }),
    validateMiddleware.isString('dataDirectory', { min: 10, max: 60 }),
    validateMiddleware.isInt('port', { min: 4, max: 5 }),
    validateMiddleware.isString('dbName', { min: 4, max: 30 }),
    validateMiddleware.isString('size', { min: 4, max: 11 }),
    validateRequest
], sgbdController.create);

app.patch('/api/sgbd/:id', jwtMiddleware.check, [
    validateMiddleware.isInt('id'),
    validateMiddleware.isString('description', { min: 10, max: 60 }),
    validateMiddleware.isString('baseDirectory', { min: 10, max: 60 }),
    validateMiddleware.isString('dataDirectory', { min: 10, max: 60 }),
    validateMiddleware.isInt('port', { min: 4, max: 5 }),
    validateMiddleware.isString('dbName', { min: 4, max: 30 }),
    validateMiddleware.isString('size', { min: 4, max: 11 }),
    validateRequest
], sgbdController.update);

//ROUTES TO LOG
app.get('/api/log/sgbd/:id', jwtMiddleware.check, [
    validateMiddleware.isInt('id'),
    validateRequest
], logController.findBySgbd);

app.post('/api/log', jwtMiddleware.check, [
    validateMiddleware.isInt('idSgbd'),
    validateMiddleware.isString('content', 5),
    validateRequest
], logController.create);

//ROUTES TO DISK
app.get('/api/disks', jwtMiddleware.check, diskController.findByNotary);

app.get('/api/disk/label/:label', jwtMiddleware.check, [
    validateMiddleware.isString('label', { min: 1, max: 2 }),
    validateRequest
], diskController.findByNotaryAndLabel);

app.post('/api/disk', jwtMiddleware.check, [
    validateMiddleware.isString('label', { min: 1, max: 1 }),
    validateMiddleware.isString('type', { min: 5, max: 10 }),
    validateMiddleware.isString('filesystem', { min: 4, max: 5 }),
    validateMiddleware.isString('totalSpace', { min: 5, max: 11 }),
    validateMiddleware.isString('usedSpace', { min: 5, max: 11 }),
    validateMiddleware.isString('freeSpace', { min: 5, max: 11 }),
    validateMiddleware.isInt('percentageOfUse', { min: 1, max: 3 }),
    validateRequest
], diskController.create);

app.patch('/api/disk/:id', jwtMiddleware.check, [
    validateMiddleware.isInt('id'),
    validateMiddleware.isString('totalSpace', { min: 5, max: 11 }),
    validateMiddleware.isString('usedSpace', { min: 5, max: 11 }),
    validateMiddleware.isString('freeSpace', { min: 5, max: 11 }),
    validateMiddleware.isInt('percentageOfUse', { min: 1, max: 3 }),
    validateRequest
], diskController.update);

//ROUTES TO BACKUP
app.get('/api/backup/disk/:id', jwtMiddleware.check, [
    validateMiddleware.isInt('id'),
    validateRequest
], backupController.findByDisk);

app.post('/api/backup', jwtMiddleware.check, [
    validateMiddleware.isInt('idDisk'),
    validateMiddleware.isString('path', { min: 10, max: 60 }),
    validateMiddleware.isString('type', { min: 4, max: 7 }),
    validateMiddleware.isString('size', { min: 5, max: 11 }),
    validateMiddleware.isInt('qtdBaseBackup', { min: 1, max: 2 }),
    validateMiddleware.isBoolean('hasController'),
    validateMiddleware.isBoolean('hasCompression'),
    validateMiddleware.isString('folderCreatedAt'),
    validateMiddleware.isString('folderChangedAt'),
    validateMiddleware.isString('folderVisitedAt'),
    validateRequest
], backupController.create);

app.patch('/api/backup/:id', jwtMiddleware.check, [
    validateMiddleware.isInt('id'),
    validateMiddleware.isString('size', { min: 5, max: 11 }),
    validateMiddleware.isInt('qtdBaseBackup', { min: 1, max: 2 }),
    validateMiddleware.isBoolean('hasController'),
    validateMiddleware.isBoolean('hasCompression'),
    validateMiddleware.isString('folderCreatedAt'),
    validateMiddleware.isString('folderChangedAt'),
    validateMiddleware.isString('folderVisitedAt'),
    validateRequest
], backupController.update);

//ROUTES TO REPOSITORY
app.get('/api/repository/backup/:id', jwtMiddleware.check, [
    validateMiddleware.isInt('id'),
    validateRequest
], repositoryController.findByBackup);

app.post('/api/repository', jwtMiddleware.check, [
    validateMiddleware.isInt('idBackup'),
    validateMiddleware.isString('description', { min: 2, max: 10 }),
    validateMiddleware.isInt('qtdPartial', { min: 1, max: 11 }),
    validateMiddleware.isString('size', { min: 5, max: 11 }),
    validateMiddleware.isString('firstPartialAt'),
    validateMiddleware.isString('lastPartialAt'),
    validateMiddleware.isString('dataCreatedAt'),
    validateRequest
], repositoryController.create);

app.listen(app.get('port'), function () {
    console.log('Node app is running on port: ' + app.get('port'));
});

export default app;
