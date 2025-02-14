import { Utils } from '../../utils/Utils.js'

export class Loader {
    static #INSTANCIA = null
    #loader 

    constructor() {
        if (Loader.#INSTANCIA) {
            throw new Error("Use Loader.getLoader() para acessar a instância.")
        }

        this.#loader = this.#montarLoader()
    }

    #montarLoader() {
        const loader = Utils.criarElemento('div')
        loader.className = 'loader'
        document.body.appendChild(loader)

        return loader
    }

    #montarSpinner() {
        const spinner = Utils.criarElemento('div')
        spinner.className = 'spinner'

        return spinner 
    }

    show() {
        this.#loader.style.display = 'flex'

        if (!this.#loader.querySelector('.spinner')) {
            this.#loader.appendChild(this.#montarSpinner())
        }
    }

    hide() {
        this.#loader.firstChild?.remove()
        this.#loader.style.display = 'none'
    }

    static getLoader() {
        if (!Loader.#INSTANCIA) {
            Loader.#INSTANCIA = new Loader()
        }

        return Loader.#INSTANCIA
    }
}