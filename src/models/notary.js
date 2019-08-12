import * as argon2 from 'argon2';
import { sign } from 'jsonwebtoken';

import connection from './../database/connection'

class Notary {
    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get token() {
        return this._token;
    }

    set token(token) {
        this._token = token;
    }

    get city() {
        return this._id_city;
    }

    set city(id_city) {
        this._id_city = id_city;
    }

    update() {        
        return new Promise(async (resolve, reject) => {
            try {
                let passHash = await argon2.hash(this.token);
                let queryUpdate = 'UPDATE ?? SET ?? = ? WHERE ?? = ? AND api_token is NULL';
                let query = connection.format(queryUpdate, ['registry', 'api_token', passHash, 'id', this.id]);

                let result = await connection.query(query);

                if (result[0]['changedRows'] == 1)
                    resolve({code: 200, stt: 'success', msg: 'Api Token changed.'});
                resolve({code: 500, stt: 'failed', msg: 'Api Token has already been changed.'});
            } catch (err) {
                reject(err);
            }
        })
    }

    findNameById() {
        let queryFindById = 'SELECT ?? FROM ?? WHERE id = ?';
        let query = connection.format(queryFindById, ['name', 'registry', this.id]);
        
        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);
                resolve(result[0][0]['name']);
            } catch (err) {
                reject(err);
            }
        })
    }

    authenticate() {
        let queryFindById = 'SELECT ?? FROM ?? WHERE id = ?';
        let query = connection.format(queryFindById, ['api_token', 'registry', this.id]);

        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);

                if (await argon2.verify(result[0][0]['api_token'], this.token)) {
                    let currentNotary = this.id;

                    let token = sign({ foo: currentNotary }, process.env.SECRET, { algorithm: 'HS256'}, {
                        expiresIn: 1440
                    })

                    resolve({code: 200, stt: 'success', token: token});
                }

                resolve({code: 500, stt: 'failed', token: 'User/Password may be incorrect'});
            } catch (err) {
                reject(err);
            }
        })
    }
};

export default Notary;