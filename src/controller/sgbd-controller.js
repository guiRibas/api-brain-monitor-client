import Sgbd from './../models/sgbd';

async function create(req, res) {
    let sgbd = new Sgbd();
    sgbd.idNotary = req.body.id;
    sgbd.description = req.body.description;
    sgbd.baseDirectory = req.body.baseDirectory;
    sgbd.dataDirectory = req.body.dataDirectory;
    sgbd.port = req.body.port;
    sgbd.dbName = req.body.dbName;
    sgbd.size = req.body.size;

    try {
        let result = await sgbd.create();

        return res.status(200).json({
            message: result
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || err
        })
    }
}

async function update(req, res) {
    let sgbd = new Sgbd();
    sgbd.id = req.params.id;
    sgbd.description = req.body.description;
    sgbd.baseDirectory = req.body.baseDirectory;
    sgbd.dataDirectory = req.body.dataDirectory;
    sgbd.port = req.body.port;
    sgbd.dbName = req.body.dbName;
    sgbd.size = req.body.size;

    try {
        let result = await sgbd.update();

        return res.status(200).json({
            message: result
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || err
        })
    }
}

async function findByNotary(req, res) {
    let sgbd = new Sgbd();
    sgbd.idNotary = req.params.id;

    try {
        let result = await sgbd.findByNotary();

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
    update: update,
    findByNotary: findByNotary
}