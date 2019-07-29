const { validationResult } = require('express-validator');

import Notary from './../models/notary';

let checkId = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ error: true, message: 'Error! Invalid ID.' });
    }
  
    let notary = new Notary();
    notary.id = req.body.notaryId;
    notary.findById(res);
}

let updateToken = (req, res) => {
    let current_notary_id = parseInt(req.body.notaryId);
    let current_pass = req.body.password;

    let notary = new Notary();
    notary.id = current_notary_id;
    notary.token = current_pass;
    notary.update(res);
}

module.exports = {
    checkId: checkId,
    updateToken: updateToken
}