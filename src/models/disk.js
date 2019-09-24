import connection from '../database/connection'

import analyse from '../helper/analyse'

class Disk {
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

    get label() {
        return this._label;
    }

    set label(label) {
        this._label = label;
    }

    get type() {
        return this._type;
    }

    set type(type) {
        this._type = type;
    }

    get filesystem() {
        return this._filesystem;
    }

    set filesystem(filesystem) {
        this._filesystem = filesystem;
    }

    get totalSpace() {
        return this._totalSpace;
    }

    set totalSpace(totalSpace) {
        this._totalSpace = totalSpace;
    }

    get usedSpace() {
        return this._usedSpace;
    }

    set usedSpace(usedSpace) {
        this._usedSpace = usedSpace;
    }

    get freeSpace() {
        return this._freeSpace;
    }

    set freeSpace(freeSpace) {
        this._freeSpace = freeSpace;
    }

    get percentageOfUse() {
        return this._percentageOfUse;
    }

    set percentageOfUse(percentageOfUse) {
        this._percentageOfUse = percentageOfUse;
    }

    create() {
        let queryCreate = 'INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let query = connection.format(queryCreate,
        ['disk', 'id', 'id_registry', 'label', 'type', 'filesystem', 'total_space', 'used_space', 'free_space', 'percentage_of_use',
            null, this.idNotary, this.label, this.type, this.filesystem, this.totalSpace, this.usedSpace, this.freeSpace, this.percentageOfUse]);

        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);
                resolve(analyse.analyseResult('Disco', result[0]));
            } catch (err) {
                reject(analyse.analyseError(err));
            }
        })
    }

    update() {
        let queryUpdate = 'UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE id = ?';
        let query = connection.format(queryUpdate,
        ['disk',
            'total_space', this.totalSpace,
            'used_space', this.usedSpace,
            'free_space', this.freeSpace,
            'percentage_of_use', this.percentageOfUse,
            this.id]);

        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);

                resolve(analyse.analyseResult('Disco', result[0]));
            } catch (err) {
                reject(analyse.analyseError(err));
            }
        })
    }

    findByNotary() {
        let queryFindByIdNotary = 'SELECT * FROM ?? WHERE ?? = ?';
        let query = connection.format(queryFindByIdNotary,
            ['disk', 'id_registry', this.idNotary]);

        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);

                resolve(result[0]);
            } catch (err) {
                reject(err);
            }
        })
    }

    findByNotaryAndLabel() {
        let queryFindByIdNotary = 'SELECT * FROM ?? WHERE ?? = ? AND ?? = ?';
        let query = connection.format(queryFindByIdNotary,
            ['disk', 'id_registry', this.idNotary, 'label', this.label]);

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

export default Disk;
