import validateRequest from '../helper/validate-request';
import { HashPassword } from '../middleware/hash-password-middleware';
import Notary from './../models/notary';

async function checkId (req, res) {
    validateRequest(req, res);
  
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
    validateRequest(req, res);

    let passHash = await HashPassword.encrypt(req.body.password);

    let notary = new Notary();
    notary.id = req.body.notaryId;
    notary.token = passHash;
    
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

async function validateLogin (req, res) {
    validateRequest(req, res);
}

module.exports = {
    checkId: checkId,
    updateToken: updateToken,
    validateLogin: validateLogin
}