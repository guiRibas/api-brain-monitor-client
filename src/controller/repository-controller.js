import Repository from './../models/repository';

import analyseAlert from '../helper/analyse-alert';

async function create(req, res) {
  let repository = new Repository();
  repository.idBackup = req.body.idBackup;
  repository.description = req.body.description;
  repository.qtdPartial = req.body.qtdPartial;
  repository.size = req.body.size;
  repository.firstPartialAt = req.body.firstPartialAt;
  repository.lastPartialAt = req.body.lastPartialAt;
  repository.dataCreatedAt = req.body.dataCreatedAt;

  analyseAlert.checkRepository(req.decoded['foo'], req.body.description, req.body.qtdPartial);

  try {
    let result = await repository.create();

    return res.status(200).json({
      message: result
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message || err
    })
  }
}

async function findByBackup(req, res) {
  let repository = new Repository();
  repository.idBackup = req.params.id;

  let qtdBase = await repository.countBkpBaseByBackup();

  try {
    let result = await repository.findByBackup();

    return res.status(200).json({
      message: result
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message || err
    })
  }
}

module.exports = {
  create: create,
  findByBackup: findByBackup
}
