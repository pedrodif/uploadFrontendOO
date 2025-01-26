import { Utils } from '../../utils/Utils.js'
import { Form } from "../components/Form.js"

export class FeedbackForm extends Form {
    constructor(form) {
        super(form)
    }

    validarForm(dados) {
        let validado = true
        const camposObrigatorios = ['titulo', 'descricao']

        camposObrigatorios.forEach(campo => {
            this.gerenciarCampoObrigatorio(Utils.consultarSeletor(`[name=${campo}]`), dados[campo])
            
            if(!dados[campo]) {
                validado = false
            }
        })

        return validado
    }
}