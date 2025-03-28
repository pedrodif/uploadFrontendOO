import { Utils } from '../../../js/utils/Utils.js'
import { Dialog } from '../../../js/view/components/Dialog.js'

describe('Dialog', () => {
    let dialog
    let container 
    let mensagem = 'Esta é uma mensagem de teste.'

    beforeEach(() => {
        document.body.innerHTML = ''

        dialog = new Dialog(mensagem)
        dialog.show()

        container = Utils.consultarSeletor('.dialog-container')
    })

    describe('Estrutura do componente', () => {
        test('Deve ter adicionado o dialog ao body', () => {
            expect(Utils.consultarSeletor('.dialog-sobreposicao')).toBeTruthy()
        })

        test('Deve ter criado container', () => {
            expect(Utils.consultarSeletor('.dialog-container')).toBeTruthy()
        })

        test('Deve ter criado botão de confirmação', () => {
            expect(Utils.consultarSeletor('.confirmar')).toBeTruthy()     
        })

        test('Deve ter criado botão de cancelamento', () => {
            expect(Utils.consultarSeletor('.cancelar')).toBeTruthy()
        })

        test('Deve ter criado mensagem corretamente', () => {
            expect(Utils.consultarSeletor('h4').textContent).toBe(mensagem)
        })

        test('Deve ter atribuído o atributo role corretamente', () => {
            expect(container.getAttribute('role')).toBe('dialog')      
        })

        test('Deve ter atribuído o atributo aria-modal corretamente', () => {
            expect(container.getAttribute('aria-modal')).toBe('true')   
        })

        test('Deve ter atribuído o atributo aria-labelledby corretamente', () => {
            expect(container.getAttribute('aria-labelledby')).toBe('dialog-title')
        })
       
        test('Deve remover o dialog ao fechar', () => {
            Utils.consultarSeletor('.cancelar').click()
            expect(Utils.consultarSeletor('.dialog-overlay')).toBeNull()
        })
    })

    test('Deve remover o Dialog após o clique', () => {
        document.querySelector('.confirmar').click()
        expect(Utils.consultarSeletor('.dialog-sobreposicao')).toBeNull()
    })

    test('Deve retornar uma Promise que resolve com true ao confirmar', async () => {
        const promise = dialog.show()
        Utils.consultarSeletor('.confirmar').click()
        const resultado = await promise
        expect(resultado).toBe(true)
    })

    test('Deve retornar uma Promise que resolve com false ao cancelar', async () => {
        const promise = dialog.show()
        Utils.consultarSeletor('.cancelar').click()
        const resultado = await promise
        expect(resultado).toBe(false)
    })

    test('Deve remover o listener de keydown ao fechar', ()=>{
        const spy = jest.spyOn(document, 'removeEventListener')
        Utils.consultarSeletor('.cancelar').click()
        expect(spy).toHaveBeenCalledWith('keydown', expect.any(Function))
        spy.mockRestore()
    })

    test('Deve retornar uma Promise que resolve com false e fechar o Dialog ao pressionar Escape', async () => {
        const promise = dialog.show()
        const evento = new KeyboardEvent('keydown', { key: 'Escape' })
        document.dispatchEvent(evento)
        const resultado = await promise
        expect(resultado).toBe(false)
    })
})