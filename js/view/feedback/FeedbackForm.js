import { Utils } from '../../utils/Utils.js'
import { Form } from "../components/Form.js"
import { Inputs } from "../components/Inputs.js"

export class FeedbackForm extends Form {
    constructor(form) {
        super(form)
        this.botaoSubmit = this.form.querySelector('button[type=submit]')
        this.#redimensionarCampos()
    }

    #atualizarTextoBotao(texto) {
        this.botaoSubmit.textContent = texto
    }

    #fluxoEdicao() {
        this.desabilitarCampos(false)
        Utils.posicionarCursorVarianteTexto(this.form.querySelector('input[name=titulo]'))
        this.#atualizarTextoBotao('Salvar Alterações')
    }

    #fluxoSalvarEdicao() {
        const eventoSubmit = new Event('submit', { bubbles: true, cancelable: true })
        this.form.dispatchEvent(eventoSubmit)
    }

    #fluxoDetalhes() {
        this.desabilitarCampos(true)
        this.#atualizarTextoBotao('Editar')

        if (!this.botaoSubmit.hasAttribute('evento-configurado')) {
            this.botaoSubmit.addEventListener('click', this.#eventoClick.bind(this))
            this.botaoSubmit.setAttribute('evento-configurado', 'true')
        }
    }

    #eventoClick(evento) {
        evento.preventDefault()

        if (this.botaoSubmit.textContent === 'Editar') {
            this.#fluxoEdicao()
        } else {
            this.#fluxoSalvarEdicao()
        }
    }

    #configurarBotao(variante) {
        if (variante === 'detalhes') {
            this.#fluxoDetalhes()
        } else {
            this.#atualizarTextoBotao('Criar')
        }
    }

    desabilitarCampos(variante) {
        const campos = this.form.querySelectorAll('input, select, textarea')
        campos.forEach(campo => {
            if (!['dataEdicao', 'dataCriacao'].includes(campo.name)) {
                campo.disabled = variante
            }
        })
    }

    #desmontarCampos() {
        this.form.querySelector('#edicao-container')?.remove()
    }

    #montarCampos() {
        if (!this.form.querySelector('#edicao-container')) {
            this.form.querySelector('#criacao-container').insertAdjacentElement('afterend', Inputs.montarInputEdicao())
        }
    }

    #redimensionarCampos() {
        this.form.querySelector('textarea').addEventListener('input', (evento) => {
            Utils.redimensionarAltura(evento.target)
        })
    }

    configurar(variante) {
        this.#configurarBotao(variante)

        switch (variante) {
            case 'detalhes':
                this.#montarCampos()
                break
            default:
                this.#desmontarCampos()
                this.definirValoresIniciais({ dataCriacao: Utils.gerenciarData() })
                break
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
            this.gerenciarCampoObrigatorio(this.form.querySelector(`[name=${campo}]`), dados[campo])

            if (!dados[campo]) {
                validado = false
            }
        })

        return validado
    }
}