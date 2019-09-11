import SgbdController from './../controller/sgbd-controller';

import Log from './../models/log';

async function create(req, res) {
    let log = new Log();
    log.id_sgbd = req.body.idSgbd;
    log.description = req.body.content;

    try {
        let result = await log.create();

        return res.status(200).json({
            message: result
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || err
        })
    }
}

async function findBySgbd(req, res) {
    let log = new Log();
    log.idSgbd = req.params.id;

    try {
        let result = await log.findBySgbd();

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
    findBySgbd: findBySgbd
}