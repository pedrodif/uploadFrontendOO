import { Utils } from '../../js/utils/Utils.js'
import { FeedbackAtualizado } from "../../js/model/feedback/FeedbackAtualizado"

const FEEDBACK_RECUPERADO = {
    titulo: 'Bom trabalho',
    descricao: 'Você teve um excelente desempenho no projeto.',
    gestorId: 8,
    colaboradorId: 10,
    dataCriação: Utils.gerenciarData() 
}

const FEEDBACK_ATUALIZADO = {
    titulo: 'Bom trabalho!!',
    descricao: 'Você teve um excelente desempenho no projeto. Continue assim!',
    gestorId: 8,
    colaboradorId: 10,
}

describe('FeedbackAtualizado', () => {
    describe('Criação do objeto', () => {
        let feedback 
        beforeAll(() => feedback = new FeedbackAtualizado(FEEDBACK_RECUPERADO, FEEDBACK_ATUALIZADO))

        test('Deve criar um objeto com o titulo alterado', () => {
            expect(feedback.titulo).toBe('Bom trabalho!!')
        })

        test('Deve criar um objeto com a descrição alterada', () => {
            expect(feedback.descricao).toBe('Você teve um excelente desempenho no projeto. Continue assim!')
        })

        test('Deve converter o objeto para JSON corretamente', () => {
            expect(feedback.toJSON()).toEqual({
                ...FEEDBACK_ATUALIZADO,
                dataEdicao: Utils.gerenciarData()
            })
        })
    })

    describe('Erro na crição do objeto', () => {
        test('Não deve criar um objeto sem alterações', () => {
            expect(() => new FeedbackAtualizado(FEEDBACK_RECUPERADO, FEEDBACK_RECUPERADO)
            ).toThrow('Nenhum dos campos foi alterado.')
        })
    })
})