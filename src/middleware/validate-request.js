import { validationResult } from 'express-validator';

let validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ status: 'failed', message: errors.array()[0]['msg'] });
    }
    
    next()
}

module.exports = {
    validateRequest: validateRequest
}