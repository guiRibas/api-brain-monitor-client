import Credential from './../models/credential';

import pageController from './page-controller';

import userTypeHelper from './../helper/credential/user-type';
import changeOnChatHelper from './../helper/employee/change-on-chat';

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
    let credentialAuth = await credential.authenticate();
    let user = await userTypeHelper.userType(credentialAuth['id']);
    let pages = await pageController.authorizePages(credentialAuth['id']);

    changeOnChatHelper.changeOnChat(credentialAuth['id'], 'on');

    return res.status(200).json({
      data: {
        "id": user['id'],
        "idCredential": user['id_credential'],
        "idRole": user['id_role'],
        "token": credentialAuth['token']
      },
      pages
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
