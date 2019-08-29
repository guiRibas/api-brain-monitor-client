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
        return this.id_notary;
    }

    set idNotary(id_notary) {
        this._id_notary = id_notary;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
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

    create(countRows) {
        let query;

        if (countRows != undefined) {
            let queryUpdate = 'UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE id_cartorio = ?';
            query = connection.format(queryUpdate,
            ['disco', 
             'nome', this.name, 
             'tipo', this.type,
             'sistema', this.filesystem,
             'capacidade', this.totalSpace,
             'ocupado', this.usedSpace,
             'livre', this.freeSpace,
             'risco', this.percentageOfUse,
             this.idNotary]);
        } else {
            let queryCreate = 'INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            query = connection.format(queryCreate,
            ['disco', 'id', 'id_cartorio', 'nome', 'tipo', 'sistema', 'capacidade', 'ocupado', 'livre', 'risco',
             null, this.id_notary, this.name, this.type, this.filesystem, this.totalSpace, this.usedSpace, this.freeSpace, this.percentageOfUse]);
        }

        return new Promise(async (resolve, reject) => {
            try {
                let result = await connection.query(query);
                resolve(analyse.analyseResult('Disco', result[0]));
            } catch (err) {
                reject(analyse.analyseError(err));
            }
        })
    }

    findByIdNotary() {
        let queryFindByIdNotary = 'SELECT id FROM ?? WHERE ?? = ?';
        let query = connection.format(queryFindByIdNotary, 
            ['disco', 'id_cartorio', this.idNotary]);
        
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