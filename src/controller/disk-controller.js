import Disk from './../models/disk';

async function create(req, res) {
    let disk = new Disk();
    disk.id_notary = req.body.id_notary;
    disk.name = req.body.name;
    disk.type = req.body.type;
    disk.filesystem = req.body.filesystem;
    disk.totalSpace = req.body.totalSpace;
    disk.usedSpace = req.body.usedSpace;
    disk.freeSpace = req.body.freeSpace;
    disk.percentageOfUse = req.body.percentageOfUse;

    try {
        let countRows = await disk.findByIdNotary();
        let result = await disk.create(countRows);

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
    create: create
}