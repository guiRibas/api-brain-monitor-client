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
            message: err.message
        })
    }
}

async function updateToken (req, res) {
    let notary = new Notary();
    notary.id = req.params.id;
    notary.api_password = req.body.password;
    
    try {
        let result = await notary.updateApiToken();
        return res.status(200).json({
            message: result
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

async function validateLogin (req, res) {   
    let notary = new Notary();
    notary.id = req.body.id;
    notary.api_password = req.body.password;

    try {
        let result = await notary.authenticate();
        return res.status(200).json({
            token: result
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || 'Failed to authenticate'
        })
    }
}

async function webBackup (req, res) {
    let notary = new Notary();
    notary.id = req.params.id;
    notary.web_bkp_status = req.body.status;
    notary.web_bkp_path = req.body.path;

    try {
        let result = await notary.updateWebBackup();
        return res.status(200).json({
            message: result
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || 'Failed to update Web Backup Data'
        })
    }
}

module.exports = {
    checkId: checkId,
    updateToken: updateToken,
    validateLogin: validateLogin,
    webBackup: webBackup
}