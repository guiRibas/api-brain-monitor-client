import Backup from './../models/backup';

async function create(req, res) {
    let backup = new Backup();
    backup.idDisk = req.body.idDisk;
    backup.path = req.body.path;
    backup.type = req.body.type;
    backup.size = req.body.size;
    backup.qtdBaseBackup = req.body.qtdBaseBackup;
    backup.hasController = req.body.hasController;
    backup.hasCompression = req.body.hasCompression;
    backup.folderCreatedAt = req.body.folderCreatedAt;
    backup.folderChangedAt = req.body.folderChangedAt;
    backup.folderVisitedAt = req.body.folderVisitedAt;

    try {
        let result = await backup.create();

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
    let backup = new Backup();
    backup.id = req.params.id;
    backup.size = req.body.size;
    backup.qtdBaseBackup = req.body.qtdBaseBackup;
    backup.hasController = req.body.hasController;
    backup.hasCompression = req.body.hasCompression;
    backup.folderCreatedAt = req.body.folderCreatedAt;
    backup.folderChangedAt = req.body.folderChangedAt;
    backup.folderVisitedAt = req.body.folderVisitedAt;

    try {
        let result = await backup.update();

        return res.status(200).json({
            message: result
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || err
        })
    }
}

async function findByDisk(req, res) {
    let backup = new Backup();
    backup.idDisk = req.params.id;

    try {
        let result = await backup.findByDisk();

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
    findByDisk: findByDisk
}