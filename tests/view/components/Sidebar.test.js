import { Utils } from '../../../js/utils/Utils.js'
import { Sidebar } from '../../../js/view/components/Sidebar.js'

describe('Sidebar', () => {
    let sidebar
    let usuario
    let main

    beforeEach(() => {
        main = Utils.criarElemento('main')
        document.body.appendChild(main)

        usuario = {
            tipo: 'adm',
            nome: 'Pedro Ferreira',
            avatar: 'avatar.jpg'
        }

        sidebar = new Sidebar(usuario)
    })

    afterEach(() => {
        document.body.removeChild(main)
    })

    test('Deve instanciar corretamente a Sidebar', () => {
        expect(sidebar).toBeInstanceOf(Sidebar)
    })

    test('Deve criar corretamente a tag aside', () => {
        sidebar.renderizar()
        const sidebarElement = main.querySelector('aside')

        expect(sidebarElement).not.toBeNull()
        expect(sidebarElement.classList.contains('sidebar')).toBeTruthy()
    })

    test('Deve adicionar o separador após o primeiro ícone', () => {
        sidebar.renderizar()
        const separador = document.querySelector('.separador')

        expect(separador).not.toBeNull()
        expect(separador.tagName).toBe('HR')
    })

    test('Deve renderizar corretamente os ícones na lista', () => {
        const spy = jest.spyOn(Utils, 'criarElemento')
        sidebar.renderizar()

        expect(spy).toHaveBeenCalledTimes(24)
    })

    test('Deve renderizar 7 ícones na lista de adm', () => {
        sidebar.renderizar()
        const sidebarElement = main.querySelector('aside')
        const sidebarItems = sidebarElement.querySelectorAll('.sidebar-item')

        expect(sidebarItems.length).toBe(7)
    })
})