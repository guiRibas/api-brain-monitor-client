const { validationResult } = require('express-validator');

let validateRequest = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ status: 'fail', message: errors.array()[0]['msg'] });
    }
}

export default validateRequest;