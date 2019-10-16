import Alert from './../models/alert';

async function create(idRegistry, errorType, description) {
  let alert = new Alert();
  alert.idRegistry = idRegistry;
  alert.errorType = errorType;
  alert.description = description;

  console.log(idRegistry + " " + errorType + " " + description);

  try {
    let result = await alert.create();

    return result[0];
  } catch (err) {
    return err;
  }
}

async function findIgnoredAlerts(idRegistry, errorType) {
  let alert = new Alert();
  alert.idRegistry = idRegistry;
  alert.errorType = errorType;

  try {
    let result = await alert.findIgnoredAlerts();
    return result;
  } catch (err) {
    return err;
  }
}

module.exports = {
  create: create,
  findIgnoredAlerts: findIgnoredAlerts
}
