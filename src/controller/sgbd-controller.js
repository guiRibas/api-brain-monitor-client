import Sgbd from './../models/sgbd';

async function create(req, res) {
    let sgbd = new Sgbd();
    sgbd.id_notary = req.body.id_notary;
    sgbd.description = req.body.description;
    sgbd.baseDirectory = req.body.baseDirectory;
    sgbd.dataDirectory = req.body.dataDirectory;
    sgbd.port = req.body.port;
    sgbd.dbName = req.body.dbName;
    sgbd.size = req.body.size;

    try {
        let countRows = await sgbd.findByIdNotary();
        let result = await sgbd.create(countRows);

        return res.status(200).json({
            message: result
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || err
        })
    }
}

async function findByIdNotary(idNotary) {
    let sgbd = new Sgbd();
    sgbd.id_notary = idNotary;

    try {
        return await sgbd.findByIdNotary();
    } catch (err) {
        throw new Error (err.message);
    }
}

module.exports = {
    create: create,
    findByIdNotary: findByIdNotary
}