import connection from './../database/connection'

import analyse from '../helper/analyse'

class Sgbd {
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

    get description() {
        return this._description;
    }

    set description(description) {
        this._description = description;
    }

    get baseDirectory() {
        return this._baseDirectory;
    }

    set baseDirectory(baseDirectory) {
        this._baseDirectory = baseDirectory;
    }

    get dataDirectory() {
        return this._dataDirectory;
    }

    set dataDirectory(dataDirectory) {
        this._dataDirectory = dataDirectory;
    }

    get port() {
        return this._port;
    }

    set port(port) {
        this._port = port;
    }

    get dbName() {
        return this._dbName;
    }

    set dbName(dbName) {
        this._dbName = dbName
    }

    get size() {
        return this._size;
    }

    set size(size) {
        this._size = size;
    }

    create() {
        let queryCreate = 'INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        let query = connection.format(queryCreate,
        ['sgbd', 'id', 'id_registry', 'description', 'base_directory', 'data_directory', 'port', 'db_name', 'size',
            null, this.idNotary, this.description, this.baseDirectory, this.dataDirectory, this.port, this.dbName, this.size]);

        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);
                resolve(analyse.analyseResult('Sgbd', result[0]));
            } catch (err) {
                reject(analyse.analyseError(err));
            }
        })
    }

    update() {
        let queryUpdate = 'UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE id = ?';
        let query = connection.format(queryUpdate,
        ['sgbd',
            'description', this.description,
            'base_directory', this.baseDirectory,
            'data_directory', this.dataDirectory,
            'port', this.port,
            'db_name', this.dbName,
            'size', this.size,
            this.id]);

        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);
                resolve(analyse.analyseResult('Sgbd', result[0]));
            } catch (err) {
                reject(analyse.analyseError(err));
            }
        })
    }

    findByNotary() {
        let queryFindByIdNotary = 'SELECT id, description, base_directory, data_directory, port, db_name, size FROM ?? WHERE ?? = ?';
        let query = connection.format(queryFindByIdNotary, ['sgbd', 'id_registry', this.idNotary]);

        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);

                resolve(result[0][0]);
            } catch (err) {
                reject(err);
            }
        })
    }
}

export default Sgbd;
