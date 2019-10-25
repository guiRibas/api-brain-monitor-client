require('dotenv-safe').load();

import * as argon2 from 'argon2';
import { sign } from 'jsonwebtoken';

import connection from './../database/connection';

import analyse from './../helper/analyse';

class Credential {
    get id() {
	return this._id;
    }

    set id(id) {
	this._id = id;
    }

    get login() {
	return this._login;
    }

    set login(login) {
	this._login = login;
    }

    get password() {
	return this._password;
    }

    set password(password) {
	this._password = password;
    }

    get bSalt() {
	return this._bSalt;
    }

    set bSalt(bSalt) {
	this._bSalt = bSalt;
    }

    get apiPassword() {
	return this._apiPassword;
    }

    set apiPassword(apiPassword) {
	this._apiPassword = apiPassword;
    }

    updateApiPassword() {
	return new Promise(async (resolve, reject) => {
	    try {
		let passHash = await argon2.hash(this.apiPassword);
		let queryUpdate = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
		let query = connection.format(queryUpdate, ['credential', 'api_password', passHash, 'login', this.login]);

		let result = await connection.query(query);

		resolve(analyse.analyseResult('Credencial', result[0]));
    	    } catch (err) {
		reject(err);
    	    }
	})
    }

    authenticate() {
	let queryFindApiPassword = 'SELECT ??, ?? FROM ?? WHERE ?? = ?';
	let query = connection.format(queryFindApiPassword, ['id', 'api_password', 'credential', 'login', this.login]);

	return new Promise(async (resolve, reject) => {
	    try {
		let result = await connection.query(query);

		if (!result[0][0]) throw new Error('Erro. Credencial informada não existe na base de dados!')

		if (await argon2.verify(result[0][0]['api_password'], this.apiPassword)) {
		    let currentCredential = result[0][0]['id'];
		    let token = sign({ foo: currentCredential }, process.env.SECRET, {
			expiresIn: "2h"
		    })

		    resolve(token);
		}

		throw new Error('Usuário e/ou Senha podem estar incorretos');
	    } catch (err) {
		reject(err);
	    }
	})
    }
};

export default Credential;
