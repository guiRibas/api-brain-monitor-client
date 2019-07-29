let validateReqRegister = (req, res, next) => {
    let notaryId = parseInt(req.body.notaryId);
    let password = req.body.password;

    if (!notaryId || !password 
        || !isLengthValid(notaryId, 1, 3) || !isLengthValid(password, 15, 25)
        || notaryId < 1) 
        return res.status(401).send({ auth: false, message: 'No attribute provided.' });

    next();
}

let isLengthValid = (attribute, qtdMin, qtdMax) => {
    if (attribute.length < qtdMin || attribute.length > qtdMax) {
        return false;
    }
    return true;
}

module.exports = {
    validateReqRegister: validateReqRegister
}