import { Utils } from '../../../js/utils/Utils.js'
import { FeedbackForm } from '../../../js/view/feedback/FeedbackForm.js'

describe('FeedbackForm', () => {
    let feedbackForm
    beforeAll(() => {
        const i = Utils.criarElemento('i')
        i.classList.add('fa-solid', 'fa-pen-to-square')

        const label = Utils.criarElementoComTexto('label', 'Criado em: ')
        label.setAttribute('for', 'dataCriacao')

        const input = Utils.criarElemento('input')
        input.type = 'date'
        input.id = 'dataCriacao'
        input.name = 'dataCriacao'
        input.disabled = true

        const fieldset = Utils.criarElemento('fieldset')
        fieldset.id = 'criacao-container'

        fieldset.appendChild(i)
        fieldset.appendChild(label)
        fieldset.appendChild(input)

        const inputTitulo = Utils.criarElemento('input')
        inputTitulo.type = 'text'
        inputTitulo.name = 'titulo'
        inputTitulo.id = 'titulo'

        const textarea = Utils.criarElemento('textarea')
        textarea.name = 'descricao'
        textarea.id = 'descricao'

        const button = Utils.criarElemento('button')
        button.type = 'submit'

        const formElement = Utils.criarElemento('form')
        formElement.id = 'form'

        formElement.appendChild(fieldset)
        formElement.appendChild(inputTitulo)
        formElement.appendChild(textarea)
        formElement.appendChild(button)

        document.body.appendChild(formElement)
        feedbackForm = new FeedbackForm(Utils.consultarSeletor('#form'))
    })

    test("Deve inicializar corretamente com o botão de submit", () => {
        expect(feedbackForm.botaoSubmit).toBe(Utils.consultarSeletor('#form').querySelector('button[type=submit]'))
    })

    test("Deve validar o formulário corretamente", () => {
        const dadosValidos = { titulo: "Feedback", descricao: "Descrição do feedback" }
        expect(feedbackForm.validarForm(dadosValidos)).toBe(true)
    })

    test("Não deve validar o formulário corretamente", () => {
        const dadosValidos = { titulo: "", descricao: "Descrição do feedback" }
        expect(feedbackForm.validarForm(dadosValidos)).toBe(false)
    })

    test("Deve desabilitar os campos corretamente", () => {
        feedbackForm.desabilitarCampos(true)
        expect(feedbackForm.form.querySelector("input[name=titulo]").disabled).toBe(true)
        expect(feedbackForm.form.querySelector("textarea[name=descricao]").disabled).toBe(true)
    })

    test("Deve habilitar os campos corretamente", () => {
        feedbackForm.desabilitarCampos(false)
        expect(feedbackForm.form.querySelector("input[name=titulo]").disabled).toBe(false)
        expect(feedbackForm.form.querySelector("textarea[name=descricao]").disabled).toBe(false)
    })

    test("Deve disparar evento de submit ao salvar edição", () => {
        const callbackMock = jest.fn()
        
        feedbackForm.onSubmit(callbackMock)
        feedbackForm.configurar("detalhes")
        feedbackForm.validarForm = jest.fn().mockReturnValue(true)

        feedbackForm.botaoSubmit.click()
        feedbackForm.botaoSubmit.click()

        expect(callbackMock).toHaveBeenCalled()
    })

    describe("Texto do Botão", () => {
        beforeAll(() => feedbackForm.configurar("detalhes"))

        test("Fluxo Detalhes", () => {
            expect(feedbackForm.botaoSubmit.textContent).toBe("Editar")
        })

        test("Fluxo Salvar Edição", () => {
            feedbackForm.botaoSubmit.click()
            expect(feedbackForm.botaoSubmit.textContent).toBe("Salvar Alterações")
        })
    })
})