require('dotenv-safe').load();

import { verify } from 'jsonwebtoken';
import RequestLogController from './../controller/request-log-controller'; 

let check = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        req.decoded = decoded;
        RequestLogController.create(req, res);

        next();
    });
}

module.exports = {
    check: check
}