import connection from '../database/connection'

import analyse from '../helper/analyse'

class Repository {
    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get idDisk(){
        return this._idDisk;
    }

    set idDisk(idDisk) {
        this._idDisk = idDisk;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get qtdPartial() {
        return this._qtdPartial;
    }

    set qtdPartial(qtdPartial) {
        this._qtdPartial = qtdPartial;
    }

    get size() {
        return this._size;
    }

    set size(size) {
        this._size = size;
    }

    get firstPartialAt() {
        return this._firstPartialAt;
    }

    set firstPartialAt(firstPartialAt) {
        this._firstPartialAt = firstPartialAt;
    }

    get lastPartialAt() {
        return this._lastPartialAt;
    }

    set lastPartialAt(lastPartialAt) {
        this._lastPartialAt = lastPartialAt;
    }

    get dataCreatedAt() {
        return this._dataCreatedAt;
    }

    set dataCreatedAt(dataCreatedAt) {
        this._dataCreatedAt = dataCreatedAt;
    }

    create() {
        let queryCreate = 'INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        let query = connection.format(queryCreate,
        ['repository', 'id', 'id_backup', 'description', 'qtd_partial', 'size', 'first_partial_at', 'last_partial_at', 'data_created_at',
            null, this.idBackup, this.description, this.qtdPartial, this.size, this.firstPartialAt, this.lastPartialAt, this.dataCreatedAt]);

        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);
                resolve(analyse.analyseResult('Repositorio', result[0]));
            } catch (err) {
                reject(analyse.analyseError(err));
            }
        })
    }

    update() {
        let queryUpdate = 'UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE id = ?';
        let query = connection.format(queryUpdate,
        ['repository',
            'description', this.description,
            'qtd_partial', this.qtdPartial,
            'size', this.size,
            'first_partial_at', this.firstPartialAt,
            'last_partial_at', this.lastPartialAt,
            'data_created_at', this.dataCreatedAt,
            this.id]);

        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);

                resolve(analyse.analyseResult('Repositorio', result[0]));
            } catch (err) {
                reject(analyse.analyseError(err));
            }
        })
    }

    findByBackup() {
        let queryFindByIdNotary = 'SELECT id, description, size, first_partial_at, last_partial_at, data_created_at FROM ?? WHERE id_backup = ? AND DATE(created_at) = (SELECT max(DATE(created_at)) FROM repositorio WHERE id_backup = ?) ORDER BY created_at DESC';
        let query = connection.format(queryFindByIdNotary,
            ['repository', this.idBackup, this.idBackup]);
        
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

export default Repository;