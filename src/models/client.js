import connection from './../database/connection';

import analyse from './../helper/analyse';

class Client {
  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get idCredential() {
    return this._idCredential;
  }

  set idCredential(idCredential) {
    this._idCredential = idCredential;
  }

  get idRegistry() {
    return this._idRegistry;
  }

  set idRegistry(idRegistry) {
    this._idRegistry = idRegistry;
  }

  get idRole() {
    return this._idRole;
  }

  set idRole(idRole) {
    this._idRole = idRole;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get email() {
    return this._email;
  }

  set email(email) {
    this._email = email;
  }

  findByIdCredential() {
    let queryFindByCredential = 'SELECT * FROM ?? WHERE ?? = ?';
    let query = connection.format(queryFindByCredential,
      ['client', 'id_credential', this.idCredential]);

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

export default Client;
