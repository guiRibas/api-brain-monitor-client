import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

import notaryController from './controller/notary-controller';

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

app.patch('/api/notary/register', [
    validateTokenToCheckId,
    dataMiddleware.validate('id'),
    dataMiddleware.validate('password'),
    validateRequest
], notaryController.updateToken);

app.post('/api/notary/authentication', [
    dataMiddleware.validate('id'),
    dataMiddleware.validate('password'),
    validateRequest
], notaryController.validateLogin);

app.put('/api/notary/discs', jwtMiddleware.check, function(req, res){
    console.log(req.body);
    res.send('Got a PUT request at /user');
});

app.post('/api/notary/database');

app.post('/api/notary/backup');

app.listen(app.get('port'), function () {
    console.log('Node app is running on port: ' + app.get('port'));
});

export default app;