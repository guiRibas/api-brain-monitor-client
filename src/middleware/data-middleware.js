import { check } from 'express-validator';

let validate = (method) => {
    switch (method) {
        case 'validateId': {
            return [
                check('notaryId').exists().withMessage('Id not provided.'),
                check('notaryId').isLength({ min: 1, max: 3}).withMessage('Id length is invalid.'),
                check('notaryId').isInt().withMessage('Id type is invalid.'),
                check('notaryId').custom((value) => value > 0).withMessage('Id value is invalid.')
            ]
        }

        case 'validatePassword': {
            return [
                check('password').exists().withMessage('Password not provided.'),
                check('password').isLength({ min: 15, max: 25}).withMessage('Password length is invalid.'),
                check('password').isString().withMessage('Password type is invalid.')
            ]
        }
    }
}

module.exports = {
    validate: validate
}