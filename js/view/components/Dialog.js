import { Utils } from '../../utils/Utils.js'   
export class Dialog {
    #mensagem
    #sobreposicao
    #conteiner      
    #botaoConfirmar
    #botaoCancelar

    constructor(mensagem) {
        this.#mensagem = mensagem
        this.#montarDialog()
    }

    #montarDialog() {
        this.#sobreposicao = Utils.criarElemento('div')
        this.#sobreposicao.classList.add('dialog-sobreposicao')

        this.#conteiner = Utils.criarElemento('section')
        this.#conteiner.classList.add('dialog-container')
        this.#conteiner.setAttribute('role', 'dialog')
        this.#conteiner.setAttribute('aria-modal', 'true')
        this.#conteiner.setAttribute('aria-labelledby', 'dialog-title')

        this.#botaoConfirmar = Utils.criarElementoComTexto('button', 'Confirmar')
        this.#botaoConfirmar.classList.add('confirmar')
        
        this.#botaoCancelar = Utils.criarElementoComTexto('button', 'Cancelar')
        this.#botaoCancelar.classList.add('cancelar')

        const elementoMensagem = Utils.criarElementoComTexto('h4', this.#mensagem)
        
        this.#conteiner.appendChild(elementoMensagem)
        this.#conteiner.appendChild(this.#botaoConfirmar)
        this.#conteiner.appendChild(this.#botaoCancelar)
        this.#sobreposicao.appendChild(this.#conteiner)
    }

    #lidarComKeyDown(evento) {
        if (evento.key === 'Escape') {
            this.#botaoCancelar.click()
        }
    }

    #fecharDialog() {
        document.removeEventListener('keydown', this.#lidarComKeyDown.bind(this))
        this.#sobreposicao.remove()
    }

    show() {
        return new Promise((resolve) => {
            document.body.appendChild(this.#sobreposicao)
            document.addEventListener('keydown', this.#lidarComKeyDown.bind(this))

            this.#botaoConfirmar.addEventListener('click', () => {
                this.#fecharDialog()
                resolve(true)
            }, { once: true })

            this.#botaoCancelar.addEventListener('click', () => {
                this.#fecharDialog()
                resolve(false)
            }, { once: true })
        })
    }
}