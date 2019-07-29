import Notary from './../models/notary';

let checkId = (req, res) => {
    let current_notary_id = parseInt(req.body.notaryId);

    let notary = new Notary();
    notary.id = current_notary_id;
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