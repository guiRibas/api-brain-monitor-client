import connection from '../database/connection'

class RequestLog {
    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get idNotary() {
        return this._idNotary;
    }

    set idNotary(idNotary) {
        this._idNotary = idNotary;
    }

    get url() {
        return this._url;
    }

    set url(url) {
        this._url = url;
    }

    get method() {
        return this._method;
    }

    set method(method) {
        this._method = method;
    }

    get sender() {
        return this._sender;
    }

    set sender(sender) {
        this._sender = sender;
    }

    create() {
        let queryCreate = 'INSERT INTO ?? (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)';
        let query = connection.format(queryCreate,
        ['request_log', 'id', 'id_registry', 'url', 'method', 'sender',
            null, this.idNotary, this.url, this.method, this.sender]);

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

export default RequestLog;