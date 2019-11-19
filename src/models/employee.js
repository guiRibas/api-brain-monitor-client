import connection from './../database/connection';

import analyse from './../helper/analyse';

class Employee {
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

  get onChat() {
    return this._onChat;
  }

  set onChat(onChat) {
    this._onChat = onChat;
  }

  get tGroup() {
    return this._tGroup;
  }

  set tGroup(tGroup) {
    this._tGroup = tGroup;
  }

  findByIdCredential() {
    let queryFindByCredential = 'SELECT * FROM ?? WHERE ?? = ?';
    let query = connection.format(queryFindByCredential,
      ['employee', 'id_credential', this.idCredential]);

    return new Promise(async (resolve, reject) => {
      try {
        let result = await connection.query(query);
        resolve(result[0][0]);
      } catch (err) {
        reject(err);
      }
    })
  }

  changeOnChat() {
    let queryChangeOnChat = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
    let query = connection.format(queryChangeOnChat,
      ['employee', 'on_chat', this.onChat, 'id_credential', this.idCredential]);

    return new Promise(async (resolve, reject) => {
      try {
        let result = await connection.query(query);

        resolve(analyse.analyseResult('Status no Chat', result[0]))
      } catch (err) {
        reject(err);
      }
    })
  }
}

export default Employee;
