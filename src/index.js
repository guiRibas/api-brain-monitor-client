import express from 'express';

import validateTokenToCheckId from './middleware/token-middleware';
import jwtMiddleware from './middleware/jwt-middleware';
import dataMiddleware from './middleware/data-middleware';

import notaryController from './controller/notary-controller';

import logger from 'morgan';

const app = express();

app.set('port', process.env.PORT || 8000);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/v1/notary/confirmId', [
    validateTokenToCheckId,
    dataMiddleware.validate('validateId')
], notaryController.checkId);

app.post('/api/v1/notary/register', [
    validateTokenToCheckId,
    dataMiddleware.validate('validateId'),
    dataMiddleware.validate('validatePassword')
], notaryController.updateToken);

app.post('/api/v1/notary/authentication', [
    dataMiddleware.validate('validateId'),
    dataMiddleware.validate('validatePassword')
], notaryController.validateLogin);

app.listen(app.get('port'), function () {
    console.log('Node app is running on port: ' + app.get('port'));
});
 
export default app;