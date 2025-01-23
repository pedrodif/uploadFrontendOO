import { Utils } from '../../utils/main.js'

export class Loader {
    constructor() {
        this.loader = this.montarLoader()
        Loader.INSTANCIA = this
    }

    montarLoader() {
        const loader = Utils.criarElemento('div')
        loader.className = 'loader'
        document.body.appendChild(loader)

        return loader
    }

    montarSpinner() {
        const spinner = Utils.criarElemento('div')
        spinner.className = 'spinner'

        return spinner 
    }

    show() {
        this.loader.style.display = 'flex'

        if (!this.loader.querySelector('.spinner')) {
            this.loader.appendChild(this.montarSpinner())
        }
    }

    hide() {
        this.loader.innerHTML = ''
        this.loader.style.display = 'none'
    }

    static getLoader() {
        if (!Loader.INSTANCIA) {
            Loader.INSTANCIA = new Loader()
        }

        return Loader.INSTANCIA
    }
}