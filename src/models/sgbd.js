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
        ['sgbd', 'id', 'id_cartorio', 'descricao', 'diretorio_instalacao', 'diretorio_banco', 'porta', 'db_nome', 'tamanho',
            null, this.idNotary, this.description, this.baseDirectory, this.dataDirectory, this.port, this.dbName, this.size]);

        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);
                let message = {'message': 'Info. Dados do SGBD cadastrados com sucesso!', 'sgbdId': result[0]['insertId']};
                resolve(message);
            } catch (err) {
                reject(analyse.analyseError(err));
            }
        })
    }

    update() {
        let queryUpdate = 'UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE id = ?';
        let query = connection.format(queryUpdate,
        ['sgbd', 
            'descricao', this.description,
            'diretorio_instalacao', this.baseDirectory,
            'diretorio_banco', this.dataDirectory,
            'porta', this.port,
            'db_nome', this.dbName,
            'tamanho', this.size,
            this.id]);

        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);
                resolve(result);
            } catch (err) {
                reject(analyse.analyseError(err));
            }
        })
    }

    findByNotary() {
        let queryFindByIdNotary = 'SELECT id FROM ?? WHERE ?? = ?';
        let query = connection.format(queryFindByIdNotary, ['sgbd', 'id_cartorio', this.idNotary]);
        
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