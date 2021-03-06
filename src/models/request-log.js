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

    get user() {
	return this._user;
    }

    set user(user) {
	this._user = user;
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

    get content() {
        return this._content;
    }

    set content(content) {
	this._content = content;
    }

    create() {
	if(typeof this.idNotary == 'string') {
	    this.idNotary = null;
	}

        let queryCreate = 'INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?)';
        let query = connection.format(queryCreate, ['request_log', 'id', 'id_registry', 'user', 'url', 'method', 'sender', 'content',
            null, this.idNotary, this.user, this.url, this.method, this.sender, JSON.stringify(this.content)]);

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
