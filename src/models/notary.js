require('dotenv-safe').load();

import * as argon2 from 'argon2';
import { sign } from 'jsonwebtoken';

import connection from './../database/connection'

import analyse from './../helper/analyse'

class Notary {
    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get id_city() {
        return this._id_city;
    }

    set id_city(id_city) {
        this._id_city = id_city;
    }

    get id_employee() {
        return this._id_employee;
    }

    set id_employee(id_employee) {
        this._id_employee = id_employee;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get api_password() {
        return this._api_password;
    }

    set api_password(api_password) {
        this._api_password = api_password;
    }

    get dedicated_server() {
        return this._dedicated_server;
    }

    set dedicated_server(dedicated_server) {
        this._dedicated_server = dedicated_server;
    }

    get web_bkp_status() {
        return this._web_bkp_status;
    }

    set web_bkp_status(web_bkp_status) {
        this._web_bkp_status = web_bkp_status;
    }

    get web_bkp_path() {
        return this._web_bkp_path;
    }

    set web_bkp_path(web_bkp_path) {
        this._web_bkp_path = web_bkp_path;
    }

    get comments() {
        return this._comments;
    }

    set comments(comments) {
        this._comments = comments;
    }

    updateApiToken() {
        return new Promise(async (resolve, reject) => {
            try {
                let passHash = await argon2.hash(this.api_password);
                let queryUpdate = 'UPDATE ?? SET ?? = ? WHERE ?? = ? AND ?? = ?';
                let query = connection.format(queryUpdate, ['registry', 'api_password', passHash, 'id', this.id, 'api_password', '']);

                let result = await connection.query(query);

                resolve(analyse.analyseResult('Cartório', result[0]))
            } catch (err) {
                reject(err);
            }
        })
    }

    authenticate() {
        let queryFindApiToken = 'SELECT ?? FROM ?? WHERE ?? = ?';
        let query = connection.format(queryFindApiToken, ['api_password', 'registry', 'id', this.id]);

        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);

                if (!result[0][0]) throw new Error ('Erro. Cartório informado não existe na base de dados!')

                if (await argon2.verify(result[0][0]['api_password'], this.api_password)) {
                    let currentNotary = this.id;
                    let token = sign({ foo: currentNotary }, process.env.SECRET, {
                        expiresIn: "2h"
                    })

                    resolve(token);
                }

                throw new Error ('User/Password may be incorrect');
            } catch (err) {
                reject(err);
            }
        })
    }

    updateWebBackup() {
        let queryUpdateWebBackup = 'UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?';
        let query = connection.format(queryUpdateWebBackup, 
            ['registry',
             'web_bkp_status', this.web_bkp_status,
             'web_bkp_path', this.web_bkp_path,
             'id', this.id],
        );
        
        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);
                resolve(analyse.analyseResult('Cartório', result[0]))
            } catch (err) {
                reject(err);
            }
        })
    }

    findNameById() {
        let queryFindById = 'SELECT ?? FROM ?? WHERE ?? = ?';
        let query = connection.format(queryFindById, ['name', 'registry', 'id', this.id]);
        
        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);

                if (result[0][0] != undefined) {
                    resolve(result[0][0]['name']);
                } else {
                    throw new Error ('Erro. Cartório informado não existe na base de dados!')
                }
            } catch (err) {
                reject(err);
            }
        })
    }
};

export default Notary;