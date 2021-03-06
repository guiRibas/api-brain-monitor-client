import RequestLog from './../models/request-log';

async function create (req, res) {
    let requestLog = new RequestLog();
    requestLog.idNotary = req.decoded['foo'];
    requestLog.user = req.decoded['foo'];
    requestLog.url = req.url;
    requestLog.method = req.method;
    requestLog.sender = req.headers['x-forwarded-for'];
    requestLog.content = req.body;

    try {
        await requestLog.create();
    } catch (err) {
        console.log("erro!");
    }
}

module.exports = {
    create: create
}
