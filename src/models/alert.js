import connection from '../database/connection'

class Alert {
  constructor() {
    this.situation = 'unverified';
    this.ignored = 0;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get idRegistry() {
    return this._idRegistry;
  }

  set idRegistry(idRegistry) {
    this._idRegistry = idRegistry;
  }

  get idCredential() {
    return this._idCredential;
  }

  set idCredential(idCredential) {
    this._idCredential = idCredential;
  }

  get errorType() {
    return this._errorType;
  }

  set errorType(errorType) {
    this._errorType = errorType;
  }

  get description() {
    return this._description;
  }

  set description(description) {
    this._description = description;
  }

  get situation() {
    return this._situation;
  }

  set situation(situation) {
    this._situation = situation;
  }

  get ignored() {
    return this._ignored;
  }

  set ignored(ignored) {
    this._ignored = ignored;
  }

  create() {
    let queryCreate = 'INSERT INTO ?? (??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?)';
    let query = connection.format(queryCreate,
      ['alert', 'id', 'id_registry', 'error_type', 'description', 'situation', 'ignored',
        null, this.idRegistry, this.errorType, this.description, this.situation, this.ignored]);

    return new Promise(async (resolve, reject) => {
      try {
        let result = await connection.query(query);
        resolve();
      } catch (err) {
        reject(err);
      }
    })
  }

  findIgnoredAlerts() {
    let queryFind = 'SELECT COUNT(*) as total FROM ?? WHERE ?? = ? AND ?? = ? AND ?? = ?';
    let query = connection.format(queryFind,
      ['alert', 'id_registry', this.idRegistry, 'error_type', this.errorType, 'ignored', 1]);

    return new Promise(async (resolve, reject) => {
      try {
        let result = await connection.query(query);
        resolve(result[0][0]['total']);
      } catch (err) {
        reject(err);
      }
    })
  }

  findAllByNotary() {
    let queryFindAll = 'SELECT * FROM ?? WHERE ?? = ? ORDER BY situation ASC, ignored, created_at LIMIT ?';
    let query = connection.format(queryFindAll,
      ['alert', 'id_registry', this.idRegistry, 10]);

    return new Promise(async (resolve, reject) => {
      try {
        let result = await connection.query(query);
        resolve(result[0]);
      } catch (err) {
        reject(err);
      }
    })
  }

  setCurrentSituation() {
    let querySituation = 'UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?';
    let query = connection.format(querySituation,
      ['alert', 'id_credential', this.idCredential, 'situation', this.situation, 'ignored', this.ignored, 'id', this.id]);

    return new Promise(async (resolve, reject) => {
      try {
        let result = await connection.query(query);
        resolve(result[0]);
      } catch (err) {
        reject(err);
      }
    })
  }

  setCurrentIgnored() {
    let queryIgnored = 'UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?';
    let query = connection.format(queryIgnored,
      ['alert', 'id_credential', this.idCredential, 'ignored', this.ignored, 'id', this.id]);

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

export default Alert;
