import { Utils } from '../../utils/Utils.js'

export class Sidebar {
    #usuario
    #icones = []

    constructor(usuario) {
        this.#usuario = usuario
        this.#definirIconesPorTipoDeUsuario()
    }

    #definirIconesPorTipoDeUsuario() {
        switch (this.#usuario.tipo) {
            case 'adm':
                this.#icones = [
                    ...this.#iconesCliente,
                    ...this.#iconesFuncionario,
                    ...this.#iconesAdm,
                    ...this.#iconesBase
                ]
                break
            case 'funcionario':
                this.#icones = [
                    ...this.#iconesCliente,
                    ...this.#iconesFuncionario,
                    ...this.#iconesBase
                ]
                break
            default:
                this.#icones = [
                    ...this.#iconesCliente,
                    ...this.#iconesBase,
                ]
                break
        }
    }

    #montarAvatar(item) {
        const avatar = Utils.criarElemento('img')
        avatar.id = item.id
        avatar.src = this.#usuario.avatar
        avatar.alt = 'Avatar Usuário'
        avatar.classList.add('avatar-usuario')

        return avatar
    }

    #montarAncoraPadrao(item) {
        const icone = Utils.criarElemento('i')
        icone.id = item.id
        icone.classList.add(...item.icone)

        const ancora = Utils.criarElemento('a')
        ancora.classList.add('sidebar-ancora')
        ancora.setAttribute('data-tooltip', item.tooltip)
        ancora.href = item.link
        ancora.appendChild(icone)

        return ancora
    }

    #montarSeparador() {
        const separador = Utils.criarElemento('hr')
        separador.classList.add('separador')

        return separador
    }

    renderizar() {
        const ul = Utils.criarElemento('ul')
        ul.classList.add('sidebar-lista')

        this.#icones.forEach((item, index) => {
            const li = Utils.criarElemento('li')
            li.classList.add('sidebar-item')

            const elemento = index == 0 ? this.#montarAvatar(item): this.#montarAncoraPadrao(item)
            li.appendChild(elemento)
            ul.appendChild(li)

            if (index === 0) {
                ul.appendChild(this.#montarSeparador())
            }
        })

        const nav = Utils.criarElemento('nav')
        nav.appendChild(ul)

        const sidebar = Utils.criarElemento('aside')
        sidebar.classList.add('sidebar')
        sidebar.appendChild(nav)

        const main = Utils.consultarSeletor('main')
        main.prepend(sidebar)
    }

    get #iconesCliente() {
        return [
            {
                id: 'usuario',
                tooltip: `${this.#usuario.nome}`
            },
            {
                id: 'home',
                tooltip: 'Home',
                icone: ['fa-solid', 'fa-house']
            },
            {
                id: 'profile',
                tooltip: 'Perfil',
                icone: ['fa-regular', 'fa-user']
            }
        ]
    } 

    get #iconesFuncionario() {
        return [
            {
                id: 'projetos',
                tooltip: 'Projetos',
                icone: ['fa-regular', 'fa-folder-open']
            },
        ]
    }

    get #iconesAdm() {
        return [
            {
                id: 'usuarios',
                tooltip: 'Usuários',
                icone: ['fa-regular', 'fa-address-card']
            },
        ]
    }

    get #iconesBase() {
        return [
            {
                id: 'onboarding',
                tooltip: 'Onboarding',
                icone: ['fa-regular', 'fa-circle-question']
            },
            {
                id: 'logout',
                tooltip: 'Logout',
                icone: ['fa-solid', 'fa-arrow-right-from-bracket']
            },
        ]
    }
}