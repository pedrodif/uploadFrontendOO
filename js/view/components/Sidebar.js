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
        const img = document.createElement('img')
        img.id = item.id
        img.src = this.#usuario.avatar
        img.alt = 'Avatar Usuário'
        img.title = item.tooltip
        img.classList.add('user-icon')

        return img
    }

    #montarAncoraPadrao(item) {
        const icone = document.createElement('i')
        icone.id = item.id
        icone.classList.add(...item.icone)

        const ancora = document.createElement('a')
        ancora.classList.add('sidebar-link')
        ancora.title = item.tooltip
        ancora.href = item.link
        ancora.appendChild(icone)

        return ancora
    }

    renderizar() {
        const ul = document.createElement('ul')
        ul.classList.add('sidebar-list')

        this.#icones.forEach((item, index) => {
            const li = document.createElement('li')
            li.classList.add('sidebar-item')

            index == 0 ? li.appendChild(this.#montarAvatar(item)) 
            : li.appendChild(this.#montarAncoraPadrao(item))
            
            ul.appendChild(li)
        })

        const nav = document.createElement('nav')
        nav.appendChild(ul)

        const sidebar = document.createElement('aside')
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