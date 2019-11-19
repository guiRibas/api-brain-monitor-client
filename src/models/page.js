import connection from './../database/connection';

import analyse from './../helper/analyse';

class Page {
  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  findAuthorizationsByCredential(idCredential) {
    let queryFind = 'SELECT DISTINCT ?? FROM ??, ?? WHERE ?? = ? AND ?? = ?? AND ?? = ?';
    let query = connection.format(queryFind,
      ['name', 'page', 'authorization_user_page', 'id_user', idCredential,
       'id_page', 'page.id', 'access', 'yes']);

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

export default Page;
