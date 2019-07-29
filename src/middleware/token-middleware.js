let validateTokenToCheckId = (req, res, next) => {
    let default_token = 'e3YpFd;$elUcuF]^X{';
    let token_auth = req.headers['x-access-token'];

    if (!token_auth) return res.status(401).send({ auth: false, message: 'No token provided.' });

    if (token_auth === default_token) {
        next();
    } else {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
}

module.exports = {
    validateTokenToCheckId: validateTokenToCheckId
}