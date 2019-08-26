import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

import notaryController from './controller/notary-controller';
import sgbdController from './controller/sgbd-controller';
import logController from './controller/log-controller';

import validateTokenToCheckId from './middleware/token-middleware';
import jwtMiddleware from './middleware/jwt-middleware';
import dataMiddleware from './middleware/data-middleware';
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
    dataMiddleware.validate('id'),
    validateRequest
], notaryController.checkId);

app.patch('/api/notary/:id/register', [
    validateTokenToCheckId,
    dataMiddleware.validate('id'),
    dataMiddleware.validateNotary('password'),
    validateRequest
], notaryController.updateToken);

app.post('/api/notary/authentication', [
    dataMiddleware.validate('id'),
    dataMiddleware.validateNotary('password'),
    validateRequest
], notaryController.validateLogin);

app.patch('/api/notary/:id/web-backup', jwtMiddleware.check, [
    dataMiddleware.validateNotary('active'),
    dataMiddleware.validateNotary('path'),
    validateRequest
], notaryController.webBackup);

app.post('/api/notary/sgbd', jwtMiddleware.check, [
    dataMiddleware.validateSgbd('id_notary'),
    dataMiddleware.validateSgbd('description'),
    dataMiddleware.validateSgbd('baseDirectory'),
    dataMiddleware.validateSgbd('dataDirectory'),
    dataMiddleware.validateSgbd('port'),
    dataMiddleware.validateSgbd('dbName'),
    dataMiddleware.validateSgbd('size'),
    validateRequest
], sgbdController.create);

app.post('/api/notary/sgbd/log', jwtMiddleware.check, [
    dataMiddleware.validateSgbd('id_notary'),
    dataMiddleware.validateLog('content')
], logController.create);

app.put('/api/notary/discs', jwtMiddleware.check, function(req, res){
    console.log(req.body);
    res.send('Got a PUT request at /user');
});

app.post('/api/notary/:id/discs/:prefix/backup');

app.post('/api/notary/discs/backup/repository');

app.listen(app.get('port'), function () {
    console.log('Node app is running on port: ' + app.get('port'));
});

export default app;