import { Utils } from "../../utils/main.js"
import { Form } from "../components/form.js"

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