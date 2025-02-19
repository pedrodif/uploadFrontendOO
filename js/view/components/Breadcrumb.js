import { Utils } from '../../utils/Utils.js'
export class Breadcrumb {
    static #INSTANCIA = null
    #container
    #trilha = []

    constructor() {
        if (Breadcrumb.#INSTANCIA) {
            throw new Error('Use Breadcrumb.getBreadcrumb() para acessar a instância.')
        }

        this.#container = this.#montarContainer()
    }
   
    #montarContainer() {
        const container = Utils.criarElemento('nav')
        container.className = 'breadcrumb-container'

        const ul = Utils.criarElemento('ul')
        ul.className = 'breadcrumb-lista'
        container.appendChild(ul)

        const main = Utils.consultarSeletor('main')
        document.body.insertBefore(container, main)

        return ul
    }

    #montarSeparador() {
        const separador = Utils.criarElementoComTexto('span', ' / ')
        separador.classList.add('breadcrumb-separador')
        this.#container.appendChild(separador)
    }

    #montarHomeIcone() {
        const icone = Utils.criarElemento('i')
        icone.classList.add('fas', 'fa-home')

        return icone
    }

    #montarBreadCrumbItem(ancora) {
        const breadcrumbItem = Utils.criarElemento('li')
        breadcrumbItem.classList.add('breadcrumb-item')
        breadcrumbItem.appendChild(ancora)
        this.#container.appendChild(breadcrumbItem)
    }

    #renderizar() {
        this.#container.innerHTML = ''
        this.#trilha.forEach((item, index) => {
            const ancora = Utils.criarElementoComTexto('a', item.label === 'home' ? '' : item.label)
            ancora.href = item.link
            ancora.classList.add('breadcrumb-link')

            if (index === 0) {
                ancora.appendChild(this.#montarHomeIcone())
                ancora.dataset.toggle = 'tooltip'
                ancora.title = 'Home'
            }

            this.#montarBreadCrumbItem(ancora)
            
            if (index < this.#trilha.length - 1) {
                this.#montarSeparador()
            }
        })
    }

    add(items) {
        this.#trilha = [...items]
        this.#renderizar()
    }

    static getBreadcrumb() {
        if (!Breadcrumb.#INSTANCIA) {
            Breadcrumb.#INSTANCIA = new Breadcrumb()
        }
        return Breadcrumb.#INSTANCIA
    }
}
