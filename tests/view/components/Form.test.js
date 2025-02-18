import { Utils } from '../../../js/utils/Utils.js'
import { Form } from '../../../js/view/components/Form.js'

describe('Form', () => {
    let form
    beforeAll(() => {
        const inputNome = Utils.criarElemento('input')
        inputNome.type = 'text'
        inputNome.name = 'nome'
        inputNome.id = 'nome'

        const inputEmail = Utils.criarElemento('input')
        inputEmail.type = 'text'
        inputEmail.name = 'email'
        inputEmail.id = 'email'

        const button = Utils.criarElemento('button')
        button.type = 'submit'

        const formElement = Utils.criarElemento('form')
        formElement.id = 'form'

        formElement.appendChild(inputNome)
        formElement.appendChild(inputEmail)
        formElement.appendChild(button)

        document.body.appendChild(formElement)
        form = new Form(Utils.consultarSeletor('#form'))
    })

    test('Deve criar um objeto Form', () => {
        expect(form).toBeInstanceOf(Form)
    })

    test('Deve ler corretamente os dados do form', () => {
        Utils.consultarSeletor('#nome').value = ' João '
        Utils.consultarSeletor('#email').value = ' joao@email.com '

        expect(form.lerDadosForm()).toEqual({
            nome: 'João',
            email: 'joao@email.com',
        })
    })

    test('Deve definir valores iniciais corretamente', () => {
        form.definirValoresIniciais({
            nome: 'Carlos',
            email: 'carlos@email.com',
        })

        expect(Utils.consultarSeletor('#nome').value).toBe('Carlos')
        expect(Utils.consultarSeletor('#email').value).toBe('carlos@email.com')
    })

    describe('Gerenciar campo obrigatório', () => {
        let input
        beforeAll(() => {
            input = Utils.consultarSeletor('#nome')
            form.gerenciarCampoObrigatorio(input, '')
        })

        test('Deve adicionar classe de erro quando campo obrigatório não for preenchido', () => {
            expect(input.classList.contains('input-erro-campo-obrigatorio')).toBeTruthy()
        })

        test('Deve adicionar mensagem de erro quando o campo obrigatório não for preenchido', () => {
            expect(input.nextElementSibling.tagName).toBe('P')
            expect(input.nextElementSibling.textContent).toBe('Este campo é obrigatório *')
        })
    })

    test('Deve lançar erro ao chamar o validarForm diretamente', () => {
        expect(() => form.validarForm()).toThrow('O método validarForm deve ser implementado nas classes filhas.')
    })

    describe('Submit', () => {
        let callbackMock
        beforeEach(() => {
            callbackMock = jest.fn()
            form.onSubmit(callbackMock)
        })

        test('Deve chamar a callback passada no método onSubmit', () => {
            form.validarForm = jest.fn().mockReturnValue(true)
          
            Utils.consultarSeletor('#form').dispatchEvent(new Event('submit'))
            expect(callbackMock).toHaveBeenCalled()
        })

        test('Não deve chamar a callback passada no método onSubmit', () => {
            form.validarForm = jest.fn().mockReturnValue(false)

            Utils.consultarSeletor('#form').dispatchEvent(new Event('submit'))
            expect(callbackMock).not.toHaveBeenCalled()
        })
    })
})