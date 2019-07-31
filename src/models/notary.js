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
        this._name = name.toLowerCase();
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
        let queryUpdate = 'UPDATE ?? SET ?? = ? WHERE ?? = ? AND api_token is NULL';
        let query = connection.format(queryUpdate, ['registry', 'api_token', this.token, 'id', this.id]);
        
        return new Promise(async function(resolve, reject) {
            try {
                let result = await connection.query(query);

                if (result[0]['changedRows'] == 1)
                    resolve({code: 200, stt: 'success', msg: 'Api Token changed.'});
                resolve({code: 500, stt: 'fail', msg: 'Api Token has already been changed.'});
            } catch (err) {
                reject(err);
            }
        })
    }

    findById() {
        let queryFindById = 'SELECT ?? FROM ?? WHERE id = ?';
        let query = connection.format(queryFindById, ['name', 'registry', this.id]);
        
        return new Promise(async function(resolve, reject) {
            try {
                let result = await connection.query(query);
                resolve(result[0]);
            } catch (err) {
                reject(err);
            }
        })
    }
};

export default Notary;