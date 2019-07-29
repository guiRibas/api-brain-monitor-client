import { HashPassword } from '../middleware/hash-password-middleware'
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

    update(res) {
        HashPassword.encrypt(this.token).then((result) => {
            let queryUpdate = 'UPDATE ?? SET ?? = ? WHERE ?? = ? AND api_token is NULL';
            let query = connection.format(queryUpdate, ['registry', 'api_token', result, 'id', this.id]);
            connection.query(query, (error, result) => {
                if (error) throw error;

                if (this.checkChangedRows(result['changedRows'])) {
                    return res.send({
                        error: false,
                        message: 'Success! Api Token changed.'
                    })
                } else {
                    return res.send({
                        error: true,
                        message: 'Error! Api Token has already been changed.'
                    })
                }
            })
        });
    }

    findById(res) {
        let queryFindById = 'SELECT ?? FROM ?? WHERE id = ?';
        let query = connection.format(queryFindById, ['name', 'registry', this.id]);
        connection.query(query, (error, result) => {
            if (error) throw error;
            
            return res.send({
                error: false,
                data: result,
                message: 'Info. Please check if this ID ('+ this.id +') is your\'s.'
            })
        })
    }

    checkChangedRows(rows) {
        if (rows == 1)
            return true
        return false
    }
};

export default Notary;