import Employee from './../../models/employee';

async function changeOnChat(idCredential, status) {
  let employee = new Employee();
  employee.idCredential = idCredential;
  employee.onChat = status;

  try {
    let result = await employee.changeOnChat();
    
    return result[0];
  } catch (err) {
    return err;
  }
}

module.exports = {
  changeOnChat: changeOnChat
}
