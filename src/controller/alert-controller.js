import Alert from './../models/alert';

async function create(idRegistry, errorType, description) {
  let alert = new Alert();
  alert.idRegistry = idRegistry;
  alert.errorType = errorType;
  alert.description = description;

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

async function findAllByNotary(req, res) {
  let alert = new Alert();
  alert.idRegistry = req.params.id;

  try {
      let result = await alert.findAllByNotary();
      return res.status(200).json({
          message: result
      })
  } catch (err) {
      return res.status(500).json({
          message: err.message
      })
  }
}

module.exports = {
  create: create,
  findIgnoredAlerts: findIgnoredAlerts,
  findAllByNotary: findAllByNotary
}
