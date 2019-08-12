let validateTokenToCheckId = (req, res, next) => {
    let default_token = 'e3YpFd;$elUcuF]^X{';
    let token_auth = req.headers['x-access-token'];

    if (!token_auth) return res.status(400).json({ status: 'failed', message: 'Token not provided.' });

    if (token_auth === default_token){
        next();
    } else {
        return res.status(401).json({ status: 'failed', message: 'Failed to authenticate token.' });
    }
}

export default validateTokenToCheckId