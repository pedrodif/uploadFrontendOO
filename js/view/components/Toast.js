import { Utils } from '../../utils/Utils.js'

export class Toast {
    static #INSTANCIA = null
    #container
    #fila = [] 
    #exibindo = false 

    constructor() {
        if (Toast.#INSTANCIA) {
            throw new Error("Use Toast.getToast() para acessar a instância.")
        }

        this.#container = this.#montarContainer()
    }

    #montarContainer() {
        const container = Utils.criarElemento('div')
        container.id = 'toast-container'
        container.className = 'toast-container'
        document.body.appendChild(container)

        return container
    }

    #montarToast(mensagem, tipo) {
        const toast = Utils.criarElementoComTexto('p', mensagem)
        toast.setAttribute('role', 'alert')
        toast.className = `toast ${tipo}`

        return toast
    }

    show(mensagem, tipo) {
        const toast = this.#montarToast(mensagem, tipo)
        this.#fila.push(toast)

        if (!this.#exibindo) {
            this.#exibindo = true
            this.#proximo()
        }
    }

    #proximo() {
        if (this.#fila.length === 0) {
            this.#exibindo = false
            return
        }

        const toast = this.#fila.shift()
        this.#container.appendChild(toast)

        setTimeout(() => {
            toast.remove()
            this.#proximo()
        }, 2000)
    }

    static getToast() {
        if (!Toast.#INSTANCIA) {
            Toast.#INSTANCIA = new Toast()
        }

        return Toast.#INSTANCIA
    }
}
