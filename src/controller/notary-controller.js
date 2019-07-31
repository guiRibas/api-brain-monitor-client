const { validationResult } = require('express-validator');

import Notary from './../models/notary';

async function checkId (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ status: 'fail', message: errors.array()[0]['msg'] });
    }
  
    let notary = new Notary();
    notary.id = req.body.notaryId;

    try {
        let result = await notary.findById();
        return res.status(200).json({
            status: 'success',
            message: result
        })
    } catch (err) {
        return res.status(500).json({
            status: 'fail',
            message: err['code']
        })
    }
}

async function updateToken (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ status: 'fail', message: errors.array()[0]['msg'] });
    }

    let notary = new Notary();
    notary.id = req.body.notaryId;
    notary.token = req.body.password;
    
    try {
        let result = await notary.update();

        return res.status(result['code']).json({
            status: result['stt'],
            message: result['msg']
        })
    } catch (err) {
        return res.status(500).json({
            status: 'fail',
            message: err['code']
        })
    }
}

module.exports = {
    checkId: checkId,
    updateToken: updateToken
}