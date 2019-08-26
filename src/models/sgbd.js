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
        return this.id_notary;
    }

    set idNotary(id_notary) {
        this._id_notary = id_notary;
    }

    get description() {
        return this._description;
    }

    set description(description) {
        this._description = description;
    }

    get baseDirectory() {
        return this._base_directory;
    }

    set baseDirectory(base_directory) {
        this._base_directory = base_directory;
    }

    get dataDirectory() {
        return this._data_directory;
    }

    set dataDirectory(data_directory) {
        this._data_directory = data_directory;
    }

    get port() {
        return this._port;
    }

    set port(port) {
        this._port = port;
    }

    get dbName() {
        return this._db_name;
    }

    set dbName(db_name) {
        this._db_name = db_name
    }

    get size() {
        return this._size;
    }

    set size(size) {
        this._size = size;
    }

    create(countRows) {
        let query;

        if (countRows != undefined) {
            let queryUpdate = 'UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE id_cartorio = ?';
            query = connection.format(queryUpdate,
            ['sgbd', 
             'descricao', this.description, 
             'diretorio_instalacao', this.baseDirectory,
             'diretorio_banco', this.dataDirectory,
             'porta', this.port,
             'db_nome', this.dbName,
             'tamanho', this.size,
             this.idNotary]);
        } else {
            let queryCreate = 'INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            query = connection.format(queryCreate,
            ['sgbd', 'id', 'id_cartorio', 'descricao', 'diretorio_instalacao', 'diretorio_banco', 'porta', 'db_nome', 'tamanho',
             null, this.id_notary, this.description, this.baseDirectory, this.dataDirectory, this.port, this.dbName, this.size]);
        }

        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);
                resolve(analyse.analyseResult(result));
            } catch (err) {
                reject(analyse.analyseError(err));
            }
        })
    }

    findByIdNotary() {
        let queryFindByIdNotary = 'SELECT id FROM ?? WHERE ?? = ?';
        let query = connection.format(queryFindByIdNotary, 
            ['sgbd', 'id_cartorio', this.idNotary]);
        
        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);
                resolve(result[0][0]);
            } catch (err) {
                reject(analyse.analyseError(err));
            }
        })
    }
}

export default Sgbd;