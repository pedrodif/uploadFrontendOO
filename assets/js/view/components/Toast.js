import { Utils } from '../../Utils.js'

export class Toast {
    constructor() {
        this.container = this.montarContainer()
        Toast.INSTANCIA = this
    }

    montarContainer() {
        const container = Utils.criarElemento('div')
        container.id = 'toast-container'
        container.className = 'toast-container'
        document.body.appendChild(container)

        return container
    }

    montarToast(mensagem, tipo) {
        const toast = Utils.criarElemento('p')
        toast.setAttribute('role', 'alert')
        toast.className = `toast ${tipo}`
        toast.textContent = mensagem

        return toast
    }

    show(mensagem, tipo = 'info') {
        if (this.container.children.length === 3) {
            this.container.firstChild.remove()
        }

        const toast = this.montarToast(mensagem, tipo)
        this.container.appendChild(toast)

        setTimeout(() => {
            toast.remove()
        }, 4000)
    }

    static getToast() {
        if (!Toast.INSTANCIA) {
            Toast.INSTANCIA = new Toast()
        }

        return Toast.INSTANCIA
    }
}