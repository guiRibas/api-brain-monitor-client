import RequestLog from './../models/request-log';

async function create (req, res) {
    let requestLog = new RequestLog();
    requestLog.idNotary = req.decoded['foo'];
    requestLog.url = req.url;
    requestLog.method = req.method;
    requestLog.sender = req.headers['x-forwarded-for'];

    try {
        await requestLog.create();
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    create: create
}