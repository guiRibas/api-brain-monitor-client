import { check } from 'express-validator';

let validate = (attribute) => {
    switch (attribute) {
        case 'id': {
            return [
                check('id').exists().withMessage('Id not provided.'),
                check('id').isLength({ min: 1, max: 3}).withMessage('Id length is invalid.'),
                check('id').isInt().withMessage('Id type is invalid.'),
                check('id').custom((value) => value > 0).withMessage('Id value is invalid.')
            ]
        }
    }
}

let validateNotary = (attribute) => {
    switch (attribute) {
        case 'password': {
            return [
                check('password').exists().withMessage('Password not provided.'),
                check('password').isLength({ min: 15, max: 25}).withMessage('Password length is invalid.'),
                check('password').isString().withMessage('Password type is invalid.')
            ]
        }

        case 'active': {
            return [
                check('active').exists().withMessage('Status not provided.'),
                check('active').isBoolean().withMessage('Status type is invalid.')
            ]
        }

        case 'path': {
            return [
                check('path').exists().withMessage('Path not provided'),
                check('path').isString().withMessage('Path type is invalid.')
            ]
        }
    }
}

let validateSgbd = (attribute) => {
    switch (attribute) {
        case 'description': {
            return [
                check('description').exists().withMessage('Description not provided.'),
                check('description').isString().withMessage('Description type is invalid.')
            ]
        }

        case 'baseDirectory': {
            return [
                check('baseDirectory').exists().withMessage('Base Directory not provided.'),
                check('baseDirectory').isString().withMessage('Base Directory type is invalid.')
            ]
        }

        case 'dataDirectory': {
            return [
                check('dataDirectory').exists().withMessage('Data Directory not provided.'),
                check('dataDirectory').isString().withMessage('Data Directory type is invalid.')
            ]
        }

        case 'port': {
            return [
                check('port').exists().withMessage('Port not provided.'),
                check('port').isInt().withMessage('Port type is invalid.'),
                check('port').isLength(4).withMessage('Port length is invalid.'),
            ]
        }

        case 'dbName': {
            return [
                check('dbName').exists().withMessage('DB Name not provided.'),
                check('dbName').isString().withMessage('DB Name type is invalid.')
            ]
        }

        case 'size': {
            return [
                check('size').exists().withMessage('Size not provided.'),
                check('size').isString().withMessage('Size type is invalid.')
            ]
        }
    }
}

let validateLog = (attribute) => {
    switch (attribute) {
        case 'content': {
            return [
                check('content').exists().withMessage('Content not provided.'),
                check('content').isString().withMessage('Content type is invalid.')
            ]
        }
    }
}

module.exports = {
    validate: validate,
    validateNotary: validateNotary,
    validateSgbd: validateSgbd,
    validateLog: validateLog
}