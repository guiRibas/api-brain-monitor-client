import SgbdController from './../controller/sgbd-controller';

import Log from './../models/log';

async function create(req, res) {
    try {
        let sgbdId = await SgbdController.findByIdNotary(req.body.id_notary);

        let log = new Log();
        log.id_sgbd = sgbdId['id'];
        log.description = req.body.content;

        let result = await log.create();
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
    create: create
}