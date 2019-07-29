import { sign } from 'jsonwebtoken';

import { HashPassword } from '../middleware/hash-password-middleware';

let validateLogin = (req, res) => {
    let currentUser = req.body.username;
    let currentPass = req.body.password;

    if (!currentUser || !currentPass) return res.status(401).send({ auth: false, message: 'No credentials provided.' });

    HashPassword.encrypt(currentPass).then((result) => {
        console.log(result);
    });

    // if (currentUser != "tadriano" || currentPass != "102030") {
    //     res.status(500).json({ success: false, message: 'Wrong user/password!' });
    // } else {
    //     var token = sign({ id: 10 }, process.env.SECRET, {
    //         expiresIn: 1440
    //     })

    //     res.status(200).json({
    //         success: true,
    //         message: 'Sucesso! Token criado.',
    //         token: token
    //     })
    // }
}

module.exports = {
    validateLogin: validateLogin
}