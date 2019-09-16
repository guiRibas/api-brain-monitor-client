import { check } from 'express-validator';

let isInt = (attribute, length = { min: 1, max: 3 }) => {
    return [
        check(attribute).exists().withMessage(attribute + ' não informado.'),
        check(attribute).isInt().withMessage(attribute + ' com tipo inválido.'),
        check(attribute).isLength(length).withMessage(attribute + ' com tamanho inválido.'),
        check(attribute).custom((value) => value > 0).withMessage(attribute + ' com valor inválido.')
    ]
}

let isString = (attribute, length = { min: 15, max: 25 }) => {
    return [
        check(attribute).exists().withMessage(attribute + ' não informado.'),
        check(attribute).isString().withMessage(attribute + ' com tipo inválido.'),
        check(attribute).isLength(length).withMessage(attribute + ' com tamanho inválido.')
    ]
}

let isBoolean = (attribute, length = { min: 4, max: 5 }) => {
    return [
        check(attribute).exists().withMessage(attribute + ' não informado.'),
        check(attribute).isBoolean().withMessage(attribute + ' com tipo inválido.'),
        check(attribute).isLength(length).withMessage(attribute + ' com tamanho inválido.')
    ]
}

module.exports = {
    isString: isString,
    isInt: isInt,
    isBoolean: isBoolean
}