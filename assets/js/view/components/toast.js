import { Utils } from '../../utils/main.js'

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

    montarToast(message, type) {
        const toast = Utils.criarElemento('p')
        toast.className = `toast ${type}`
        toast.textContent = message
        toast.setAttribute('role', 'alert')

        return toast
    }

    show(message, type = 'info') {
        if (this.container.children.length === 3) {
            this.container.firstChild.remove()
        }

        const toast = this.montarToast(message, type)
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