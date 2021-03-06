import connection from './../database/connection'

import analyse from '../helper/analyse'

class Log {
    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get idSgbd() {
        return this._idSgbd;
    }

    set idSgbd(idSgbd) {
        this._idSgbd = idSgbd;
    }

    get description() {
        return this._description;
    }

    set description(description) {
        this._description = description;
    }

    create() {
        let queryCreate = 'INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)';
        let query = connection.format(queryCreate, ['sgbd_log', 'id', 'id_sgbd', 'content',
            null, this.id_sgbd, this.description]);

        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);
                resolve(analyse.analyseResult('Log', result[0]));
            } catch (err) {
                reject(analyse.analyseError('Sgbd', err));
            }
        })
    }

    findBySgbd() {
        let queryFindByIdNotary = 'SELECT ??, ?? FROM ?? WHERE ?? = ? ORDER BY ?? DESC';
        let query = connection.format(queryFindByIdNotary, ['content', 'created_at', 'sgbd_log', 'id_sgbd', this.idSgbd, 'id']);

        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);
                resolve(result[0]);
            } catch (err) {
                reject(err);
            }
        })
    }
}

export default Log;
