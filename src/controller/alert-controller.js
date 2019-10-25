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

async function setCurrentSituation(req, res) {
  let alert = new Alert();
  alert.id = req.params.id;
  alert.idCredential = req.decoded['foo'];
  alert.situation = req.params.situation;
  alert.ignored = 'no';

  console.log(req.decoded['foo']);

  try {
    let result = await alert.setCurrentSituation();
    return res.status(200).json({
      message: result
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }
}

async function setCurrentIgnored(req, res) {
  let alert = new Alert();
  alert.id = req.params.id;
  alert.idCredential = req.decoded['foo'];
  alert.ignored = req.params.ignored;

  try {
    let result = await alert.setCurrentIgnored();
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
  findAllByNotary: findAllByNotary,
  setCurrentSituation: setCurrentSituation,
  setCurrentIgnored: setCurrentIgnored
}
