import Notary from './../models/notary';

async function checkId (req, res) {
    let notary = new Notary();
    notary.id = req.params.id;

    try {
        let result = await notary.findNameById();
        return res.status(200).json({
            message: result
        })
    } catch (err) {
        return res.status(500).json({
            message: err['code']
        })
    }
}

async function updateToken (req, res) {
    let notary = new Notary();
    notary.id = req.params.id;
    notary.api_token = req.body.password;
    
    try {
        let result = await notary.updateApiToken();
        return res.status(result['code']).json({
            message: result['msg']
        })
    } catch (err) {
        return res.status(500).json({
            message: err['code']
        })
    }
}

async function validateLogin (req, res) {   
    let notary = new Notary();
    notary.id = req.body.id;
    notary.api_token = req.body.password;

    try {
        let result = await notary.authenticate();
        return res.status(result['code']).json({
            token: result['token']
        })
    } catch (err) {
        return res.status(500).json({
            message: err['code'] || 'Failed to authenticate'
        })
    }
}

async function webBackup (req, res) {
    let notary = new Notary();
    notary.id = req.params.id;
    notary.bkp_web_active = req.body.active;
    notary.bkp_web_path = req.body.path;

    try {
        let result = await notary.updateWebBackup();
        return res.status(result['code']).json({
            message: result['msg']
        })
    } catch (err) {
        return res.status(500).json({
            message: err['code'] || 'Failed to update Web Backup Data'
        })
    }
}

module.exports = {
    checkId: checkId,
    updateToken: updateToken,
    validateLogin: validateLogin,
    webBackup: webBackup
}