import { Utils } from '../../js/utils/Utils.js'
import { FeedbackNovo } from '../../js/model/feedback/FeedbackNovo.js'

const FEEDBACK_BASE = {
    titulo: 'Bom trabalho',
    descricao: 'Você teve um excelente desempenho no projeto.',
    gestorId: 8,
    colaboradorId: 10,
}

describe('FeedbackNovo', () => {
    describe('Criação do objeto', () => {
        let feedback
        beforeAll(() => feedback = new FeedbackNovo(FEEDBACK_BASE))

        test('Deve criar um objeto com título correto', () => {
            expect(feedback.titulo).toBe('Bom trabalho')
        })

        test('Deve criar um objeto com a descrição correta', () => {
            expect(feedback.descricao).toBe('Você teve um excelente desempenho no projeto.')
        })

        test('Deve criar um objeto com o gestor correto', () => {
            expect(feedback.gestorId).toBe(8)
        })

        test('Deve criar um objeto com o colaborador correto', () => {
            expect(feedback.colaboradorId).toBe(10)
        })

        test('Deve criar um objeto com a data de criação correta', () => {
            expect(feedback.dataCriacao).toBe(Utils.gerenciarData())
        })

        test('Deve converter o objeto para JSON corretamente', () => {
            expect(feedback.toJSON()).toEqual({
                ...FEEDBACK_BASE, 
                dataCriacao: Utils.gerenciarData()
            })
        })
    })

    describe('Erro na criação do objeto', () => {
        test('Não deve criar um objeto com título menor que 5 carecteres', () => {
            expect(() => new FeedbackNovo({ 
                ...FEEDBACK_BASE,
                titulo: 'abc',
            })).toThrow('O título deve ter no mínimo 5 caracteres.')
        })

        test('Não deve criar um objeto com descrição menor que 10 caracteres', () => {
            expect(() => new FeedbackNovo({
                ...FEEDBACK_BASE,
                descricao: 'abc',
            })).toThrow('A descrição deve ter no mínimo 10 caracteres.')
        })

        test('Não deve criar um objeto sem gestor', () => {
            expect(() => new FeedbackNovo({
                ...FEEDBACK_BASE,
                gestorId: null,
            })).toThrow('O gestor deve ser informado.')
        })

        test('Não deve criar um objeto sem colaborador', () => {
            expect(() => new FeedbackNovo({
                ...FEEDBACK_BASE,
                colaboradorId: null,
            })).toThrow('O colaborador deve ser informado.')
        })
    })
})  