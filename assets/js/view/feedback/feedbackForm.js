import { Utils } from "../../utils/main.js"
import { Form } from "../components/form.js"

export class FeedbackForm extends Form {
    constructor(form) {
        super(form)
    }

    montarMensagemErro() {
        const p = Utils.criarElemento('p')
        p.textContent = 'Este campo é obrigatório *'
        p.classList.add('mensagem-erro-campo-obrigatorio')
        return p
    }

    gerenciarCampoObrigatorio(variante) {
        if(variante.classList.contains('input-erro-campo-obrigatorio')) {
           return 
        }
        
        variante.classList.add('input-erro-campo-obrigatorio')
        variante.insertAdjacentElement('afterend', this.montarMensagemErro())
    }

    validarForm(dados) {
        let validado = true
        const camposObrigatorios = ['titulo', 'descricao']

        camposObrigatorios.forEach(campo => {
            if(!dados[campo]) {
                this.gerenciarCampoObrigatorio(Utils.consultarSeletor(`[name=${campo}]`))
                validado = false
            } 
        })

        return validado
    }
}