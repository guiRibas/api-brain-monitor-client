let analyseResult = (model, result) => {    
    switch (result['changedRows']) {
        case 0: {
            return 'Erro. Dados informados do ' + model + ' já constam na base de dados!';
        }

        case 1: {
            return 'Info. Dados do ' + model + ' atualizados com sucesso!';
        }
    }

    if (result['insertId'] > 0) {
        return 'Info. Dados do ' + model + ' registrados com sucesso com id: (' + result['insertId'] + ')!';
    }
}

let analyseError = (model, err) => {
    switch (err['code']) {
        case "ER_NO_REFERENCED_ROW_2": {
            return 'Erro. ' + model + ' informado não existe na base de dados!';
        }

        case "ER_ACCESS_DENIED_ERROR": {
            return 'Erro. Contate nosso suporte e informe o código 1045!';
        }
    }
}

module.exports = {
    analyseResult: analyseResult,
    analyseError: analyseError
}