import { Utils } from '../../utils/Utils.js'
export class Breadcrumb {
    static #INSTANCIA = null
    #lista
    #trilha = []

    constructor() {
        if (Breadcrumb.#INSTANCIA) {
            throw new Error('Use Breadcrumb.getBreadcrumb() para acessar a instância.')
        }

        this.#lista = this.#montarLista()
    }

    #montarLista() {
        const ul = Utils.criarElemento('ul')
        ul.className = 'breadcrumb-lista'

        const container = Utils.criarElemento('nav')
        container.className = 'breadcrumb-container'
        container.appendChild(ul)

        const main = Utils.consultarSeletor('main')
        main.prepend(container)

        return ul
    }

    #montarSeparador() {
        const separador = Utils.criarElementoComTexto('span', ' / ')
        separador.classList.add('breadcrumb-separador')

        return separador
    }

    #montarAncoraHome(item) {
        const icone = Utils.criarElemento('i')
        icone.classList.add('fa-solid', 'fa-house')

        const ancora = Utils.criarElemento('a')
        ancora.href = item.link
        ancora.dataset.toggle = 'tooltip'
        ancora.title = 'Home'
        ancora.classList.add('breadcrumb-link')
        ancora.appendChild(icone)

        return ancora
    }

    #montarAncoraPadrao(item) {
        const ancora = Utils.criarElementoComTexto('a', item.label)
        ancora.href = item.link
        ancora.classList.add('breadcrumb-link')

        return ancora
    }

    #montarBreadCrumbItem(variante) {
        const breadcrumbItem = Utils.criarElemento('li')
        breadcrumbItem.classList.add('breadcrumb-item')
        breadcrumbItem.appendChild(variante)

        this.#lista.appendChild(breadcrumbItem)
    }

    #renderizar() {
        this.#lista.innerHTML = ''

        this.#trilha.forEach((item, index) => {
            const ancora =  index === 0 ? this.#montarAncoraHome(item) : this.#montarAncoraPadrao(item)
            this.#montarBreadCrumbItem(ancora)

            if (index < this.#trilha.length - 1) {
                const separador = this.#montarSeparador()
                this.#montarBreadCrumbItem(separador)
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
