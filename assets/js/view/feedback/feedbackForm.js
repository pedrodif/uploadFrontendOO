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

    gerenciarCampoObrigatorio(variante, valor) {
        if (!valor) {
            if(variante.classList.contains('input-erro-campo-obrigatorio')) {
                return 
            }
             
            variante.classList.add('input-erro-campo-obrigatorio')
            variante.insertAdjacentElement('afterend', this.montarMensagemErro())
        } else if(variante.nextElementSibling.tagName === 'P') {
            variante.classList.remove('input-erro-campo-obrigatorio')
            variante.nextElementSibling.remove()
        } 
        
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