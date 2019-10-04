import Credential from './../models/credential';

async function updateApiPassword(req, res) {
    let credential = new Credential();
    credential.login = req.params['login'];
    credential.apiPassword = req.body.password;

    try {
	let result = await credential.updateApiPassword();
	return res.status(200).json({
	    message: result
	})
    } catch (err) {
	return res.status(500).json({
	    message: err.message
	})
    }
}

async function validateLogin(req, res) {
    let credential = new Credential();
    credential.login = req.body.login;
    credential.apiPassword = req.body.password;

    try {
	let result = await credential.authenticate();
	return res.status(200).json({
	    token: result
	})
    } catch (err) {
	return res.status(500).json({
	    message: err.message || 'Failed to authenticate'
	})
    }
}

module.exports = {
    updateApiPassword: updateApiPassword,
    validateLogin: validateLogin
}
