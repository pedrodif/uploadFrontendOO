import { Form } from '../../../js/view/components/Form.js'

describe('Form', () => {
    let formElement, formInstance

    beforeEach(() => {
        document.body.innerHTML = `
            <form id="form">
                <input type="text" name="nome" id="nome">
                <input type="email" name="email" id="email">
                <button type="submit">Enviar</button>
            </form>
        `
        formElement = document.getElementById('form')
        formInstance = new Form(formElement)
    })

    test('Deve criar um objeto Form', () => {
        expect(formInstance).toBeInstanceOf(Form)
    })

    test('Deve adicionar classe de erro e mensagem quando o campo obrigatório não for preenchido', () => {
        const input = document.getElementById('nome')
        formInstance.gerenciarCampoObrigatorio(input, '')
        
        expect(input.classList.contains('input-erro-campo-obrigatorio')).toBeTruthy()
    })
})