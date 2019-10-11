import Disk from '../models/disk';

async function create(req, res) {
    let disk = new Disk();
    disk.idNotary = req.decoded['foo'];
    disk.label = req.body.label;
    disk.type = req.body.type;
    disk.filesystem = req.body.filesystem;
    disk.totalSpace = req.body.totalSpace;
    disk.usedSpace = req.body.usedSpace;
    disk.freeSpace = req.body.freeSpace;
    disk.percentageOfUse = req.body.percentageOfUse;

    try {
        let result = await disk.create();

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
    let disk = new Disk();
    disk.id = req.params.id;
    disk.totalSpace = req.body.totalSpace;
    disk.usedSpace = req.body.usedSpace;
    disk.freeSpace = req.body.freeSpace;
    disk.percentageOfUse = req.body.percentageOfUse;

    try {
        let result = await disk.update();

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
    let disk = new Disk();
    disk.idNotary = req.params.id;

    try {
        let result = await disk.findByNotary();

        return res.status(200).json({
            message: result
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || err
        })
    }
}

async function findByNotaryAndLabel(req, res) {
    let disk = new Disk();
    disk.idNotary = req.decoded['foo'];
    disk.label = req.params.label;

    try {
        let result = await disk.findByNotaryAndLabel();

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
    findByNotary: findByNotary,
    findByNotaryAndLabel: findByNotaryAndLabel
}
