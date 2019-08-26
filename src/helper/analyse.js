let analyseResult = (result) => {
    switch (result[0]['changedRows']) {
        case 0: {
            return "Info. Dados informados já constam na base de dados!";
        }

        case 1: {
            return "Info. Dados atualizados com sucesso!";
        }
    }

    switch (result[0]['affectedRows']) {
        case 1: {
            return "Info. Log registrado com sucesso!";
        }
    }
}

let analyseError = (err) => {
    switch (err['code']) {
        case "ER_NO_REFERENCED_ROW_2": {
            return "Erro. Cartório informado não existe na base de dados!";
        }

        case "ER_ACCESS_DENIED_ERROR": {
            return "Erro. Contate nosso suporte e informe o código 1045!";
        }
    }
}

module.exports = {
    analyseResult: analyseResult,
    analyseError: analyseError
}