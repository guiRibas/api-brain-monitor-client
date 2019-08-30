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

    get api_token() {
        return this._api_token;
    }

    set api_token(api_token) {
        this._api_token = api_token;
    }

    get dedicated_server() {
        return this._dedicated_server;
    }

    set dedicated_server(dedicated_server) {
        this._dedicated_server = dedicated_server;
    }

    get bkp_web_active() {
        return this._bkp_web_active;
    }

    set bkp_web_active(bkp_web_active) {
        this._bkp_web_active = bkp_web_active;
    }

    get bkp_web_path() {
        return this._bkp_web_path;
    }

    set bkp_web_path(bkp_web_path) {
        this._bkp_web_path = bkp_web_path;
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
                let passHash = await argon2.hash(this.api_token);
                let queryUpdate = 'UPDATE ?? SET ?? = ? WHERE ?? = ? AND api_token is NULL';
                let query = connection.format(queryUpdate, ['cartorio', 'api_token', passHash, 'id', this.id]);

                let result = await connection.query(query);

                resolve(analyse.analyseResult('Cartório', result[0]))
            } catch (err) {
                reject(err);
            }
        })
    }

    authenticate() {
        let queryFindApiToken = 'SELECT ?? FROM ?? WHERE id = ?';
        let query = connection.format(queryFindApiToken, ['api_token', 'cartorio', this.id]);

        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);

                if (!result[0][0]) throw new Error ('Erro. Cartório informado não existe na base de dados!')

                if (await argon2.verify(result[0][0]['api_token'], this.api_token)) {
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
            ['cartorio',
             'bkp_web_active', this.bkp_web_active,
             'bkp_web_path', this.bkp_web_path,
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
        let queryFindById = 'SELECT ?? FROM ?? WHERE id = ?';
        let query = connection.format(queryFindById, ['nome', 'cartorio', this.id]);
        
        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);

                if (result[0][0] != undefined) {
                    resolve(result[0][0]['nome']);
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