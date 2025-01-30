import { Utils } from '../../utils/Utils.js'
import { Form } from "../components/Form.js"
import { Inputs } from "../components/Inputs.js"

export class FeedbackForm extends Form {
    constructor(form) {
        super(form)
        this.btnSubmit = Utils.consultarSeletor('button[type=submit]')
    }

    configurar(variante) {
        this.configurarBotao(variante)
        
        switch (variante) {
            case 'detalhes':
                this.montarCampos()
                break
            default:
                this.desmontarCampos()
                this.definirValoresIniciais({ dataCriacao: Utils.gerenciarData() })
                break
        }
    }

    fluxoEdicao() {
        this.desabilitarCampos(false)
        this.btnSubmit.textContent = 'Salvar Alterações'
    }

    fluxoSalvarEdicao() {
        const eventoSubmit = new Event('submit', { bubbles: true, cancelable: true })
        this.form.dispatchEvent(eventoSubmit)
    }

    fluxoDetalhes() {
        this.desabilitarCampos(true)
        this.btnSubmit.textContent = 'Editar'

        if (!this.btnSubmit.hasAttribute('evento-configurado')) {
            this.btnSubmit.addEventListener('click', this.eventoClick.bind(this))
            this.btnSubmit.setAttribute('evento-configurado', 'true')
        }
    }

    eventoClick(evento) {
        evento.preventDefault()

        if (this.btnSubmit.textContent === 'Editar') {
            this.fluxoEdicao()
        } else {
            this.fluxoSalvarEdicao()
        }
    }

    configurarBotao(variante) {        
        if (variante === 'detalhes') {
            this.fluxoDetalhes()
        } else {
            this.btnSubmit.textContent = 'Criar'
        }
    }

    desabilitarCampos(variante) {
        const campos = this.form.querySelectorAll('input, select, textarea')
        campos.forEach(campo => {
            if (campo.name !== 'dataEdicao' && campo.name !== 'dataCriacao') {
                campo.disabled = variante
            }
        })
    }

    desmontarCampos() {
        this.form.querySelector('#edicao-container')?.remove()
    }

    montarCampos() {
        if (!this.form.querySelector('#edicao-container')) {
            this.form.querySelector('#criacao-container').insertAdjacentElement('afterend', Inputs.montarInputEdicao())
        }
    }

    definirValoresIniciais(valoresIniciais) {
        super.definirValoresIniciais(
            valoresIniciais['dataEdicao'] ? valoresIniciais : {
                ...valoresIniciais, dataEdicao: Utils.gerenciarData()
            }
        )
    }

    validarForm(dados) {
        let validado = true
        const camposObrigatorios = ['titulo', 'descricao']

        camposObrigatorios.forEach(campo => {
            this.gerenciarCampoObrigatorio(Utils.consultarSeletor(`[name=${campo}]`), dados[campo])

            if (!dados[campo]) {
                validado = false
            }
        })

        return validado
    }
}