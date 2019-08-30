import { check } from 'express-validator';

let notary = (attribute) => {
    switch (attribute) {
        case 'id': {
            return [
                check('id').exists().withMessage('Id not provided.'),
                check('id').isLength({ min: 1, max: 3}).withMessage('Id length is invalid.'),
                check('id').isInt().withMessage('Id type is invalid.'),
                check('id').custom((value) => value > 0).withMessage('Id value is invalid.')
            ]
        }
        
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

let sgbd = () => {
    return [
        check('description').exists().withMessage('Description not provided.'),
        check('description').isString().withMessage('Description type is invalid.'),

        check('baseDirectory').exists().withMessage('Base Directory not provided.'),
        check('baseDirectory').isString().withMessage('Base Directory type is invalid.'),

        check('dataDirectory').exists().withMessage('Data Directory not provided.'),
        check('dataDirectory').isString().withMessage('Data Directory type is invalid.'),

        check('port').exists().withMessage('Port not provided.'),
        check('port').isInt().withMessage('Port type is invalid.'),
        check('port').isLength(4).withMessage('Port length is invalid.'),

        check('dbName').exists().withMessage('DB Name not provided.'),
        check('dbName').isString().withMessage('DB Name type is invalid.'),

        check('size').exists().withMessage('Size not provided.'),
        check('size').isString().withMessage('Size type is invalid.')
    ]
}

let log = () => {
    return [
        check('content').exists().withMessage('Content not provided.'),
        check('content').isString().withMessage('Content type is invalid.')
    ]
}

let disk = () => {
    return [
        check('name').exists().withMessage('Name not provided.'),
        check('name').isString().withMessage('Name type is invalid.'),

        check('type').exists().withMessage('Type not provided.'),
        check('type').isString().withMessage('Type type is invalid.'),

        check('filesystem').exists().withMessage('Filesystem not provided.'),
        check('filesystem').isString().withMessage('Filesystem type is invalid.'),

        check('totalSpace').exists().withMessage('Total Space not provided.'),
        check('totalSpace').isString().withMessage('Total Space type is invalid.'),

        check('usedSpace').exists().withMessage('Used Space not provided.'),
        check('usedSpace').isString().withMessage('Used Space type is invalid.'),

        check('freeSpace').exists().withMessage('Free Space not provided.'),
        check('freeSpace').isString().withMessage('Free Space type is invalid.'),

        check('percentageOfUse').exists().withMessage('Percentage Of Use not provided.'),
        check('percentageOfUse').isString().withMessage('Percentage Of Use type is invalid.')
    ]
}

module.exports = {
    notary: notary,
    sgbd: sgbd,
    log: log,
    disk: disk
}