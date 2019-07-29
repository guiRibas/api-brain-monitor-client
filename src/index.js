import express, { Router } from 'express';
import connection from './database/connection';

import tokenMiddleware from './middleware/token-middleware';
import jwtMiddleware from './middleware/jwt-middleware';
import dataMiddleware from './middleware/data-middleware';

import loginController from './controller/login-controller';
import notaryController from './controller/notary-controller';

import { json, urlencoded } from 'body-parser';
import logger from 'morgan';

const router = Router();

const app = express();

app.set('port', process.env.PORT || 8000);
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/', router);

router.post('/api/notary/confirmId',
    tokenMiddleware.validateTokenToCheckId, notaryController.checkId);

router.post('/api/notary/register',
    dataMiddleware.validateReqRegister, notaryController.updateToken);

router.post('/api/notary/authentication',
    loginController.validateLogin);

app.get('/user/:id', jwtMiddleware.checkJWT, (req, res) => {
    let user_id = req.params.id;
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }

    connection.query('SELECT * FROM credential where id = ?', user_id, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'user provided.' });
    })
})

app.listen(app.get('port'), function () {
    console.log('Node app is running on port: ' + app.get('port'));
});
 
export default app;