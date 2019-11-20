import Employee from './../../models/employee';
import Client from './../../models/client';

async function userType(idCredential) {
  let employee = new Employee();
  let client = new Client();
  let result;

  employee.idCredential = idCredential;
  result = await employee.findByIdCredential();

  if (result == undefined){
    client.idCredential = idCredential;
    result = await client.findByIdCredential();
  }

  return result;
}

module.exports = {
  userType: userType
}
