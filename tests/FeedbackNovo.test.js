import { FeedbackNovo } from '../js/model/feedback/FeedbackNovo.js'

describe('FeedbackNovo', () => {
    describe('Criação do objeto', () => {
        let feedback

        beforeEach(() => feedback = new FeedbackNovo({
            titulo: 'Bom trabalho',
            descricao: 'Você teve um excelente desempenho no projeto.',
            gestorId: 8,
            colaboradorId: 10,
        }))

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
            expect(feedback.dataCriacao).toBe('2025-02-15')
        })
    })
})  