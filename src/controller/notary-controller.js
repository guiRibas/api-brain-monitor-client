import Notary from './../models/notary';

async function checkId (req, res) {
    let notary = new Notary();
    notary.id = req.params.id;

    try {
        let result = await notary.findNameById();
        return res.status(200).json({
            status: 'success',
            message: result
        })
    } catch (err) {
        return res.status(500).json({
            status: 'failed',
            message: err['code']
        })
    }
}

async function updateToken (req, res) {
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
            status: 'failed',
            message: err['code']
        })
    }
}

async function validateLogin (req, res) {   
    let notary = new Notary();
    notary.id = req.body.notaryId;
    notary.token = req.body.password;

    try {
        let result = await notary.authenticate();
        return res.status(result['code']).json({
            status: result['stt'],
            token: result['token']
        })
    } catch (err) {
        return res.status(500).json({
            status: 'failed',
            message: err['code'] || 'Failed to authenticate'
        })
    }    
}

module.exports = {
    checkId: checkId,
    updateToken: updateToken,
    validateLogin: validateLogin
}