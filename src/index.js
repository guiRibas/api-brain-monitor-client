import express from 'express';
import { check } from 'express-validator';

import tokenMiddleware from './middleware/token-middleware';
import jwtMiddleware from './middleware/jwt-middleware';
import dataMiddleware from './middleware/data-middleware';

import loginController from './controller/login-controller';
import notaryController from './controller/notary-controller';

import logger from 'morgan';

const app = express();

app.set('port', process.env.PORT || 8000);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/notary/confirmId', [
    check('notaryId').exists(),
    check('notaryId').isLength({ min: 1, max: 3}),
    check('notaryId').isInt(),
    check('notaryId').custom((value) => value > 0)
  ], notaryController.checkId);

app.post('/api/notary/register',
    dataMiddleware.validateReqRegister, notaryController.updateToken);

app.post('/api/notary/authentication', loginController.validateLogin);

app.listen(app.get('port'), function () {
    console.log('Node app is running on port: ' + app.get('port'));
});
 
export default app;