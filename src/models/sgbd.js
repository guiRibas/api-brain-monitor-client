import connection from './../database/connection'

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

    create() {
        let queryCreate = 'INSERT INTO ?? ?? ?? ?? ?? ?? ?? ?? VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        let query = connection.format(queryCreate,
            ['id_cartorio', 'descricao', 'diretorio_instalacao', 'diretorio_banco', 'porta', 'db_nome', 'tamanho',
             this.id_notary, this.description, this.baseDirectory, this.dataDirectory, this.port, this.size]);
        
        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);
                resolve(result[0][0]['nome']);
            } catch (err) {
                reject(err);
            }
        })
    }
}