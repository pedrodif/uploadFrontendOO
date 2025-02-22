export class Dialog {
    #mensagem
    #sobreposicao
    #conteiner      
    #botaoConfirmar
    #botaoCancelar

    constructor(mensagem) {
        this.#mensagem = mensagem
        this.#init()
    }

    #init() {
        this.#sobreposicao = document.createElement('div')
        this.#sobreposicao.classList.add('dialog-overlay')

        this.#conteiner = document.createElement('div')
        this.#conteiner.classList.add('dialog-container')
        this.#conteiner.setAttribute('role', 'dialog')
        this.#conteiner.setAttribute('aria-modal', 'true')
        this.#conteiner.setAttribute('aria-labelledby', 'dialog-title')

        const elementoMensagem = document.createElement('p')
        elementoMensagem.textContent = this.#mensagem

        this.#botaoConfirmar = document.createElement('button')
        this.#botaoConfirmar.textContent = 'Confirmar'
        this.#botaoConfirmar.classList.add('confirm')

        this.#botaoCancelar = document.createElement('button')
        this.#botaoCancelar.textContent = 'Cancelar'
        this.#botaoCancelar.classList.add('cancel')

        this.#conteiner.appendChild(elementoMensagem)
        this.#conteiner.appendChild(this.#botaoConfirmar)
        this.#conteiner.appendChild(this.#botaoCancelar)
        this.#sobreposicao.appendChild(this.#conteiner)
    }

    #handleKeyDown(evento) {
        if (evento.key === 'Escape') {
            this.#botaoCancelar.click()
        }
    }

    #closeDialog() {
        document.removeEventListener('keydown', this.#handleKeyDown)
        this.#sobreposicao.remove()
    }

    show() {
        return new Promise((resolve) => {
            document.body.appendChild(this.#sobreposicao)
            document.addEventListener('keydown', this.#handleKeyDown)
            
            this.#botaoConfirmar.focus()
            this.#botaoConfirmar.addEventListener('click', () => {
                this.#closeDialog()
                resolve(true)
            }, { once: true })

            this.#botaoCancelar.addEventListener('click', () => {
                this.#closeDialog()
                resolve(false)
            }, { once: true })
        })
    }
}