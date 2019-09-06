import connection from '../database/connection'

import analyse from '../helper/analyse'

class Backup {
    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get idDisk() {
        return this._idDisk;
    }

    set idDisk(idDisk) {
        this._idDisk = idDisk;
    }

    get path() {
        return this._path;
    }

    set path(path) {
        this._path = path;
    }

    get type() {
        return this._type;
    }

    set type(type) {
        this._type = type;
    }

    get size() {
        return this._size;
    }

    set size(size) {
        this._size = size;
    }

    get qtdBaseBackup() {
        return this._qtdBaseBackup;
    }

    set qtdBaseBackup(qtdBaseBackup) {
        this._qtdBaseBackup = qtdBaseBackup;
    }

    get hasController() {
        return this._hasController;
    }

    set hasController(hasController) {
        this._hasController = hasController;
    }

    get hasCompression() {
        return this._hasCompression;
    }

    set hasCompression(hasCompression) {
        this._hasCompression = hasCompression;
    }

    get folderCreatedAt() {
        return this._folderCreatedAt;
    }

    set folderCreatedAt(folderCreatedAt) {
        this._folderCreatedAt = folderCreatedAt;
    }

    get folderChangedAt() {
        return this._folderChangedAt;
    }

    set folderChangedAt(folderChangedAt) {
        this._folderChangedAt = folderChangedAt;
    }

    get folderVisitedAt() {
        return this._folderVisitedAt;
    }

    set folderVisitedAt(folderVisitedAt) {
        this._folderVisitedAt = folderVisitedAt;
    }

    create() {
        let queryCreate = 'INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let query = connection.format(queryCreate,
        ['backup', 'id', 'id_disk', 'path', 'type', 'size', 'qtd_base_backup', 'has_controller', 'has_compression', 'folder_created_at', 'folder_changed_at', 'folder_visited_at',
            null, this.idDisk, this.path, this.type, this.size, this.qtdBaseBackup, this.hasController, this.hasCompression, this.folderCreatedAt, this.folderChangedAt, this.folderVisitedAt]);

        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);
                resolve(analyse.analyseResult('Backup', result[0]));
            } catch (err) {
                reject(analyse.analyseError(err));
            }
        })
    }

    update() {
        let queryUpdate = 'UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE id = ?';
        let query = connection.format(queryUpdate,
        ['backup',
            'size', this.size,
            'qtd_base_backup', this.qtdBaseBackup,
            'has_controller', this.hasController,
            'has_compression', this.hasCompression,
            'folder_created_at', this.folderCreatedAt,
            'folder_changed_at', this.folderChangedAt,
            'folder_visited_at', this.folderVisitedAt,
            this.id]);

        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);

                resolve(analyse.analyseResult('Backup', result[0]));
            } catch (err) {
                reject(analyse.analyseError(err));
            }
        })
    }

    findByDisk() {
        let queryFindByIdNotary = 'SELECT id, path, type, size, qtd_base_backup, has_controller, has_compression, folder_created_at, folder_changed_at, folder_visited_at FROM ?? WHERE ?? = ?';
        let query = connection.format(queryFindByIdNotary, 
            ['backup', 'id_disk', this.idDisk]);
        
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

export default Backup;