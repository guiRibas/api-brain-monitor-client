let analyseResult = (model, result) => {    
    switch (result['changedRows']) {
        case 0: {
            return {'code': result, 'status': 'Erro. Dados informados do ' + model + ' já constam na base de dados!'};
        }

        case 1: {
            return {'code': result, 'status': 'Info. Dados do ' + model + ' atualizados com sucesso!'};
        }
    }

    if (result['insertId'] > 0) {
        return {'insertId': result['insertId'], 'status': 'Info. Dados do ' + model + ' registrados com sucesso!'};
    }
}

let analyseError = (err) => {
    switch (err['code']) {
        case "ER_DUP_ENTRY": {
            return {'code': err['errno'], 'status': 'Erro. Entrada duplicada.'};
        }

        case "ER_NO_REFERENCED_ROW_2": {
            return {'code': err['errno'], 'status': 'Erro. Chave estrangeira não existe!'};
        }

        case "ER_ACCESS_DENIED_ERROR": {
            return {'code': err['errno'], 'status': 'Erro. Contate nosso suporte e informe o código 1045!'};
        }
    }
}

module.exports = {
    analyseResult: analyseResult,
    analyseError: analyseError
}